import { useEffect, useRef } from "react";
import { Terminal as XtermTerminal } from "@xterm/xterm";
import { FitAddon } from "@xterm/addon-fit";
import { Pause, X, TerminalWindow } from "@phosphor-icons/react";
import "@xterm/xterm/css/xterm.css";

interface TerminalPaneProps {
  id: string;
  title: string;
  server: string;
  shell: string;
  agent: string;
  logs: string[];
  onClose?: () => void;
}

export default function TerminalPane({
  title,
  server,
  shell,
  agent,
  logs,
  onClose
}: Omit<TerminalPaneProps, 'id'> & { id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<XtermTerminal | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize xterm
    const term = new XtermTerminal({
      theme: {
        background: '#071126',
        foreground: '#E2E8F0',
        cursor: '#E2E8F0',
        selectionBackground: 'rgba(255, 255, 255, 0.15)',
        black: '#071126',
        red: '#F87171',
        green: '#34D399',
        yellow: '#FBBF24',
        blue: '#38BDF8',
        magenta: '#F472B6',
        cyan: '#22D3EE',
        white: '#E2E8F0'
      },
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: 12,
      lineHeight: 1.4,
      convertEol: true,
      cursorBlink: true,
      cursorStyle: 'block'
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    
    // Fit terminal layout size
    fitAddon.fit();
    termRef.current = term;

    // Write initial log contents
    logs.forEach(line => {
      term.writeln(line);
    });
    term.write('\r\n$ ');

    // Handle user input echo
    const dataListener = term.onData(data => {
      if (data === '\r') { // Enter
        term.write('\r\n$ ');
      } else if (data === '\u007F') { // Backspace (DEL)
        term.write('\b \b');
      } else {
        term.write(data);
      }
    });

    // Resize listener
    const handleResize = () => {
      fitAddon.fit();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      dataListener.dispose();
      term.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [logs]);

  return (
    <div className="bg-[#071126] flex flex-col h-full overflow-hidden text-[#E2E8F0] font-mono text-[12px] rounded-xl border border-border/20">
      {/* Pane Header */}
      <div className="h-8 bg-[#0F1D36] border-b border-[#1E293B] px-3 flex items-center justify-between select-none shrink-0 font-sans">
        <div className="flex items-center gap-2">
          <TerminalWindow size={14} className="text-[#38BDF8]" />
          <span className="font-semibold text-[11px] text-white">{title}</span>
          <span className="text-[9px] text-[#94A3B8] bg-[#1E293B] px-1.5 py-0.2 rounded font-sans uppercase">
            {server} • {shell}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] text-[#38BDF8] font-sans font-light">
            Agent: <strong className="font-semibold">{agent}</strong>
          </span>
          <button className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
            <Pause size={12} />
          </button>
          <button onClick={onClose} className="text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Actual Xterm Div container */}
      <div className="flex-1 p-2 bg-[#071126] min-h-0 overflow-hidden relative">
        <div ref={containerRef} className="w-full h-full min-h-0" />
      </div>
    </div>
  );
}
