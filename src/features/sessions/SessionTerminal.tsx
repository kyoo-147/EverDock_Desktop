import { Terminal } from "@phosphor-icons/react";
import { Session } from "../../types/session";

interface SessionTerminalProps {
  session: Session;
}

export default function SessionTerminal({ session }: SessionTerminalProps) {
  return (
    <div className="w-[380px] bg-[#071126] flex flex-col h-full shrink-0 text-[#E2E8F0] font-mono text-[12px]">
      {/* Terminal Header */}
      <div className="h-[48px] bg-[#0F1D36] border-b border-[#1E293B] px-4 flex items-center justify-between select-none font-sans shrink-0">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-[#38BDF8]" />
          <span className="font-bold text-[11px] text-white uppercase tracking-wider">Active Terminal</span>
        </div>
        <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] border border-[#334155] rounded px-2 py-0.5">
          {session.environment}
        </span>
      </div>

      {/* Terminal Console Output */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin select-text">
        <div className="text-[#94A3B8]">~/Projects/herdr on master</div>
        <div className="text-white flex items-center gap-1.5">
          <span className="text-[#38BDF8] font-bold">$</span>
          <span>bun test</span>
        </div>
        
        <div className="text-[#94A3B8] leading-relaxed">
          bun test v1.1.12 (b7f3c2a0)<br />
          test/auth/session.test.ts:<br />
          &nbsp;&nbsp;<span className="text-[#34D399]">✓ creates session</span><br />
          &nbsp;&nbsp;<span className="text-[#34D399]">✓ expires session</span><br />
          &nbsp;&nbsp;<span className="text-[#34D399]">✓ invalidates session</span><br />
          <br />
          <span className="text-[#34D399]">3 pass</span><br />
          0 fail<br />
          12 expect() calls<br />
          Ran 1 test file. [45.00ms]
        </div>

        <div className="text-white flex items-center gap-1.5 pt-2">
          <span className="text-[#38BDF8] font-bold">$</span>
          <span>git status</span>
        </div>

        <div className="text-[#94A3B8] leading-relaxed">
          On branch master<br />
          Your branch is up to date with 'origin/master'.<br />
          <br />
          Changes not staged for commit:<br />
          &nbsp;&nbsp;(use "git add &lt;file&gt;..." to update what will be committed)<br />
          &nbsp;&nbsp;(use "git restore &lt;file&gt;..." to discard changes in working directory)<br />
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#F87171]">modified:&nbsp;&nbsp;&nbsp;src/auth/session.ts</span><br />
          <br />
          no changes added to commit (use "git add" and/or "git commit -a")
        </div>

        <div className="flex items-center gap-1 text-[#38BDF8] pt-2 select-none">
          <span>$</span>
          <span className="w-1.5 h-3.5 bg-white animate-pulse"></span>
        </div>
      </div>

      {/* Terminal Tab switcher */}
      <div className="h-8 border-t border-[#1E293B] bg-[#0A1428] px-3 flex items-center justify-between font-sans select-none text-[11px] text-[#94A3B8] shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span>dev.local</span>
        </div>
        <div className="flex items-center gap-3">
          <span>zsh</span>
          <span>Cwd: ~/Projects/herdr</span>
        </div>
      </div>
    </div>
  );
}
