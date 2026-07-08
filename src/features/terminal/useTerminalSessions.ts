import { useState, useEffect } from "react";
import { TerminalSession } from "./terminal.types";
import { mockMCConsoles } from "../../mocks/terminal.mock";

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

    // Prepare for Tauri Rust IPC:
    // try {
    //   await invoke("spawn_pty_session", { id: newId, shell, cwd: '~/Projects/herdr' });
    // } catch (e) {
    //   console.error("Failed to spawn PTY on Rust backend", e);
    // }

    setSessions(prev => [...prev, newSession]);
    setActiveSessionId(newId);
    return newId;
  };

  const closeSession = async (id: string) => {
    // Prepare for Tauri Rust IPC:
    // try {
    //   await invoke("kill_pty_session", { id });
    // } catch (e) {
    //   console.error("Failed to kill PTY on Rust backend", e);
    // }

    setSessions(prev => prev.filter(s => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter(s => s.id !== id);
      setActiveSessionId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const sendInput = async (id: string, text: string) => {
    console.log(`Sending PTY input to ${id}: ${text}`);
    // Prepare for Tauri Rust IPC:
    // await invoke("write_pty_input", { id, text });
  };

  const resizeTerminal = async (id: string, cols: number, rows: number) => {
    console.log(`Resizing PTY ${id} to ${cols}x${rows}`);
    // Prepare for Tauri Rust IPC:
    // await invoke("resize_pty_session", { id, cols, rows });
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
