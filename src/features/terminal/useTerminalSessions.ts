import { useState, useEffect } from "react";
import { TerminalSession } from "./terminal.types";
import { mockMCConsoles } from "../../mocks/terminal.mock";
import { 
  spawnPty, 
  killPtySession, 
  writePtyInput, 
  resizePtySession 
} from "../../lib/ipc";

export function useTerminalSessions() {
  const [sessions, setSessions] = useState<TerminalSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);

  // Initialize with mock consoles from the design
  useEffect(() => {
    const initialSessions: TerminalSession[] = mockMCConsoles.map(c => ({
      id: c.id,
      title: c.title,
      status: 'connected',
      cwd: '~/Projects/herdr',
      shell: c.shell
    }));
    setSessions(initialSessions);
    if (initialSessions.length > 0) {
      setActiveSessionId(initialSessions[0].id);
    }
  }, []);

  const createSession = async (title: string, shell = 'bash') => {
    const newId = `term-${Date.now()}`;
    const newSession: TerminalSession = {
      id: newId,
      title,
      status: 'connected',
      cwd: '~/Projects/herdr',
      shell
    };

    // Invoke Tauri IPC call
    await spawnPty(shell, '~/Projects/herdr');

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newId);
    return newId;
  };

  const closeSession = async (id: string) => {
    // Invoke Tauri IPC call
    await killPtySession(id);

    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const sendInput = async (id: string, text: string) => {
    console.log(`Sending PTY input to ${id}: ${text}`);
    // Invoke Tauri IPC call
    await writePtyInput(id, text);
  };

  const resizeTerminal = async (id: string, cols: number, rows: number) => {
    console.log(`Resizing PTY ${id} to ${cols}x${rows}`);
    // Invoke Tauri IPC call
    await resizePtySession(id, cols, rows);
  };

  return {
    sessions,
    activeSessionId,
    setActiveSessionId,
    createSession,
    closeSession,
    sendInput,
    resizeTerminal
  };
}
