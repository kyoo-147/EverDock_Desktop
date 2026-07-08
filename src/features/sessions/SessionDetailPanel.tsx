import { 
  Checks, 
  GitBranch, 
  ArrowSquareOut
} from "@phosphor-icons/react";
import { Session } from "../../types/session";

interface SessionDetailPanelProps {
  session: Session;
}

export default function SessionDetailPanel({ session }: SessionDetailPanelProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 border-r border-border bg-surface h-full">
      {/* Detail Header */}
      <div className="p-4 border-b border-border flex items-center justify-between bg-background/20 select-none">
        <div>
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Session Details</span>
          <div className="flex items-center gap-2.5 mt-0.5">
            <h2 className="text-[16px] font-bold text-text-primary">{session.name}</h2>
            <span className="text-[10px] text-success font-bold bg-success/15 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
              Running
            </span>
            <span className="text-[11px] text-text-secondary font-medium font-mono bg-background border border-border px-1.5 rounded">
              {session.duration}
            </span>
          </div>
        </div>
        <button className="px-3 py-1.5 bg-error hover:bg-error/90 text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm cursor-pointer">
          Terminate
        </button>
      </div>

      {/* Info Grid */}
      <div className="p-4 border-b border-border grid grid-cols-4 gap-4 bg-background/5 select-none">
        <div className="space-y-0.5">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Agent</span>
          <div className="text-[13px] font-bold text-text-primary capitalize">{session.agent}</div>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Branch</span>
          <div className="text-[13px] font-bold text-text-primary font-mono flex items-center gap-1">
            <GitBranch size={13} className="text-primary-blue" />
            <span>{session.branch}</span>
          </div>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Space</span>
          <div className="text-[13px] font-bold text-text-primary">{session.workspace}</div>
        </div>
        <div className="space-y-0.5">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold">Environment</span>
          <div className="text-[13px] font-bold text-text-primary font-mono">{session.environment}</div>
        </div>
      </div>

      {/* Sub-cards Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {/* Linked Task Card */}
        <div className="border border-border rounded-2xl p-4 bg-surface hover:shadow-sm transition-all space-y-3">
          <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">Linked Task</div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-active-bg flex items-center justify-center text-primary-blue font-bold text-[13px] select-none">
                #42
              </div>
              <div>
                <div className="text-[13px] font-bold text-text-primary hover:underline cursor-pointer">
                  auth/session.ts bug fix
                </div>
                <div className="text-[11px] text-text-secondary select-none">Assigned to {session.agent}</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-primary-blue hover:underline cursor-pointer flex items-center gap-0.5 select-none">
              <span>Open task</span>
              <ArrowSquareOut size={12} />
            </span>
          </div>
        </div>

        {/* Session Health */}
        <div className="border border-border rounded-2xl p-4 bg-surface hover:shadow-sm transition-all flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">Session Health</div>
            <div className="text-[13px] font-bold text-success flex items-center gap-1.5">
              <Checks size={16} weight="bold" />
              <span>Healthy</span>
            </div>
          </div>
          <span className="text-[11px] text-text-secondary select-none">All systems operational &gt;</span>
        </div>

        {/* Recent Activity Timeline */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">Recent Activity</div>
          <div className="border border-border rounded-2xl bg-surface p-4 space-y-4">
            <div className="relative border-l border-border pl-4 space-y-4">
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary-blue border border-surface" />
                <div className="text-[12.5px] font-bold text-text-primary">Changed auth/session.ts</div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-medium">2m ago • Diff: +24 -6 lines</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-success border border-surface" />
                <div className="text-[12.5px] font-bold text-text-primary">Ran tests: 12 passed</div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-medium">5m ago • bun test auth.test.ts</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-text-secondary border border-surface" />
                <div className="text-[12.5px] font-bold text-text-primary">Installed @types/express</div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-medium">8m ago • bun install dev</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-text-secondary border border-surface" />
                <div className="text-[12.5px] font-bold text-text-primary">Pulled latest from origin/master</div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-medium">10m ago • git pull</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary-blue border border-surface" />
                <div className="text-[12.5px] font-bold text-text-primary">Session started</div>
                <div className="text-[11px] text-text-secondary mt-0.5 font-medium">12m ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
