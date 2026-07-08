import { useState } from "react";
import { 
  Checks, 
  GitBranch, 
  Terminal,
  ArrowSquareOut
} from "@phosphor-icons/react";
import { mockSessions } from "../data/mockData";

export default function Sessions() {
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("active");

  const selectedSession = mockSessions.find(s => s.id === selectedSessionId) || mockSessions[0];

  const filteredSessions = mockSessions.filter(s => {
    if (activeTab === "active") return s.status === "running";
    if (activeTab === "idle") return s.status === "idle";
    return s.status === "completed" || s.status === "failed";
  });

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Column 1: Sessions List */}
      <div className="w-[300px] border-r border-border bg-surface flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-border space-y-3">
          <div>
            <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Sessions</h2>
            <p className="text-[11px] text-text-secondary mt-0.5">Live developer sessions across environments.</p>
          </div>
          {/* Tab Filter */}
          <div className="flex bg-background p-0.5 rounded-lg text-[12px] font-semibold border border-border select-none">
            <button 
              onClick={() => setActiveTab("active")}
              className={`flex-1 py-1 text-center rounded-md ${
                activeTab === "active" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Active (3)
            </button>
            <button 
              onClick={() => setActiveTab("idle")}
              className={`flex-1 py-1 text-center rounded-md ${
                activeTab === "idle" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Idle (1)
            </button>
            <button 
              onClick={() => setActiveTab("completed")}
              className={`flex-1 py-1 text-center rounded-md ${
                activeTab === "completed" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        {/* Sessions Scroll List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedSessionId(session.id)}
              className={`p-3 rounded-xl border cursor-pointer transition-all ${
                selectedSessionId === session.id
                  ? "bg-active-bg/35 border-primary-blue shadow-sm text-text-primary"
                  : "bg-surface border-border hover:bg-background text-text-secondary hover:text-text-primary"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    session.status === 'running' ? 'bg-success animate-pulse' : 'bg-warning'
                  }`} />
                  <span className="text-[13px] font-bold text-text-primary truncate max-w-[160px]">{session.name}</span>
                </div>
                <span className="text-[10px] bg-background border border-border rounded px-1.5 py-0.2 font-semibold">
                  {session.duration}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-text-secondary">
                <div className="flex items-center gap-1.5">
                  <span className="capitalize">{session.agent}</span>
                  <span>•</span>
                  <span className="font-mono">{session.branch}</span>
                </div>
                <span className="font-mono text-[10px] text-text-secondary">{session.environment}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 2: Session Details */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border bg-surface h-full">
        {/* Detail Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-background/20">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Session Details</span>
            <div className="flex items-center gap-2.5 mt-0.5">
              <h2 className="text-[16px] font-bold text-text-primary">{selectedSession.name}</h2>
              <span className="text-[10px] text-success font-bold bg-success/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                Running
              </span>
              <span className="text-[11px] text-text-secondary font-medium font-mono bg-background border border-border px-1.5 rounded">
                {selectedSession.duration}
              </span>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-error hover:bg-error/90 text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm">
            Terminate
          </button>
        </div>

        {/* Info Grid */}
        <div className="p-4 border-b border-border grid grid-cols-4 gap-4 bg-background/5">
          <div className="space-y-0.5">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Agent</span>
            <div className="text-[13px] font-bold text-text-primary capitalize">{selectedSession.agent}</div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Branch</span>
            <div className="text-[13px] font-bold text-text-primary font-mono flex items-center gap-1">
              <GitBranch size={13} className="text-primary-blue" />
              <span>{selectedSession.branch}</span>
            </div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Space</span>
            <div className="text-[13px] font-bold text-text-primary">{selectedSession.workspace}</div>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Environment</span>
            <div className="text-[13px] font-bold text-text-primary font-mono">{selectedSession.environment}</div>
          </div>
        </div>

        {/* Sub-cards Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Linked Task Card */}
          <div className="border border-border rounded-2xl p-4 bg-surface hover:shadow-sm transition-all space-y-3">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Linked Task</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-active-bg flex items-center justify-center text-primary-blue font-bold text-[13px]">
                  #42
                </div>
                <div>
                  <div className="text-[13px] font-bold text-text-primary hover:underline cursor-pointer">
                    auth/session.ts bug fix
                  </div>
                  <div className="text-[11px] text-text-secondary">Assigned to {selectedSession.agent}</div>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-primary-blue hover:underline cursor-pointer flex items-center gap-0.5">
                <span>Open task</span>
                <ArrowSquareOut size={12} />
              </span>
            </div>
          </div>

          {/* Session Health */}
          <div className="border border-border rounded-2xl p-4 bg-surface hover:shadow-sm transition-all flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Session Health</div>
              <div className="text-[13px] font-bold text-success flex items-center gap-1.5">
                <Checks size={16} weight="bold" />
                <span>Healthy</span>
              </div>
            </div>
            <span className="text-[11px] text-text-secondary">All systems operational &gt;</span>
          </div>

          {/* Recent Activity Timeline */}
          <div className="space-y-3">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Recent Activity</div>
            <div className="border border-border rounded-2xl bg-surface p-4 space-y-4">
              <div className="relative border-l border-border pl-4 space-y-4">
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary-blue border border-surface" />
                  <div className="text-[12.5px] font-bold text-text-primary">Changed auth/session.ts</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">2m ago • Diff: +24 -6 lines</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-success border border-surface" />
                  <div className="text-[12.5px] font-bold text-text-primary">Ran tests: 12 passed</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">5m ago • bun test auth.test.ts</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-text-secondary border border-surface" />
                  <div className="text-[12.5px] font-bold text-text-primary">Installed @types/express</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">8m ago • bun install dev</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-text-secondary border border-surface" />
                  <div className="text-[12.5px] font-bold text-text-primary">Pulled latest from origin/master</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">10m ago • git pull</div>
                </div>
                <div className="relative">
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary-blue border border-surface" />
                  <div className="text-[12.5px] font-bold text-text-primary">Session started</div>
                  <div className="text-[11px] text-text-secondary mt-0.5">12m ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Active Terminal Panel */}
      <div className="w-[380px] bg-[#071126] flex flex-col h-full shrink-0 text-[#E2E8F0] font-mono text-[12px]">
        {/* Terminal Header */}
        <div className="h-[48px] bg-[#0F1D36] border-b border-[#1E293B] px-4 flex items-center justify-between select-none font-sans shrink-0">
          <div className="flex items-center gap-2">
            <Terminal size={14} className="text-[#38BDF8]" />
            <span className="font-bold text-[11px] text-white uppercase tracking-wider">Active Terminal</span>
          </div>
          <span className="text-[10px] bg-[#1E293B] text-[#94A3B8] border border-[#334155] rounded px-2 py-0.5">
            {selectedSession.environment}
          </span>
        </div>

        {/* Terminal Console Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
          <div className="text-text-secondary">~/Projects/herdr on master</div>
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

          <div className="flex items-center gap-1 text-[#38BDF8] pt-2">
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
    </div>
  );
}
