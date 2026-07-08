import { 
  Clock, 
  ShieldCheck, 
  Folder, 
  Desktop, 
  Plus,
  Warning,
  Check,
  X,
  ArrowRight,
  Cpu,
  Heartbeat
} from "@phosphor-icons/react";
import { mockSpaces, mockTasks } from "../data/mockData";

export default function MissionControl() {
  const pendingTasks = mockTasks.filter(t => t.status === "In Progress" || t.status === "Review");

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6 font-sans bg-background">
      {/* Page Header Title */}
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-[20px] font-bold text-text-primary">Mission Control</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">Control plane overview and operational dashboard.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
            <Plus size={14} weight="bold" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-4 gap-4 select-none">
        <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition-all">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Active Sessions</span>
            <div className="text-[24px] font-bold text-text-primary">3</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-active-bg flex items-center justify-center text-primary-blue">
            <Clock size={20} weight="bold" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition-all">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Pending Approvals</span>
            <div className="text-[24px] font-bold text-error">1</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
            <ShieldCheck size={20} weight="bold" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition-all">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Connected Servers</span>
            <div className="text-[24px] font-bold text-text-primary">3</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success">
            <Desktop size={20} weight="bold" />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-4 flex items-center justify-between hover:shadow-sm transition-all">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Workspaces</span>
            <div className="text-[24px] font-bold text-text-primary">3</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-active-bg flex items-center justify-center text-text-primary">
            <Folder size={20} weight="bold" />
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Col 1 & 2: Active Workflows & Approvals */}
        <div className="col-span-2 space-y-6">
          {/* Active Workflows */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider select-none">Active Workflows</h3>
            <div className="grid grid-cols-2 gap-4">
              {mockSpaces.filter(s => s.activeCount && s.activeCount > 0).map((space) => (
                <div key={space.name} className="bg-surface border border-border rounded-2xl p-4 hover:shadow-sm transition-all space-y-3">
                  <div className="flex items-center justify-between select-none">
                    <div className="flex items-center gap-2">
                      <Folder size={16} className="text-primary-blue" />
                      <span className="text-[14px] font-bold text-text-primary">{space.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-text-secondary">branch: {space.branch}</span>
                  </div>
                  <div className="border-t border-border/60 pt-3 flex items-center justify-between text-[12.5px] font-semibold text-text-primary">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span>{space.activeCount} active sessions</span>
                    </div>
                    <span className="text-primary-blue hover:underline cursor-pointer flex items-center gap-0.5 text-[11px] font-bold">
                      Open Workspace <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approval Request Card */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider select-none">Pending Approval Requests</h3>
            <div className="bg-surface border border-warning rounded-2xl p-4 hover:shadow-sm transition-all space-y-3">
              <div className="flex items-center justify-between select-none">
                <div className="flex items-center gap-1.5 text-warning text-[11px] font-bold uppercase tracking-wider">
                  <Warning size={14} weight="fill" />
                  <span>High Risk Action</span>
                </div>
                <span className="text-[11px] text-text-secondary">Requested 2m ago</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-[13.5px] font-bold text-text-primary">Claude requested to edit middleware/auth.ts</h4>
                <p className="text-[12px] text-text-secondary leading-relaxed">
                  The agent requires permission to write redirect parameters in auth validation.
                </p>
              </div>
              {/* Approval controls */}
              <div className="flex items-center gap-3 pt-1 select-none">
                <button className="flex items-center gap-1 px-4 py-1.5 bg-success hover:bg-success/90 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
                  <Check size={14} weight="bold" />
                  <span>Approve Action</span>
                </button>
                <button className="flex items-center gap-1 px-4 py-1.5 bg-error hover:bg-error/90 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
                  <X size={14} weight="bold" />
                  <span>Reject Action</span>
                </button>
                <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-bold ml-auto">
                  Inspect diff &gt;
                </span>
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="space-y-2">
            <div className="flex items-center justify-between select-none">
              <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">Recent Tasks</h3>
              <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-semibold">View all tasks</span>
            </div>
            <div className="border border-border rounded-2xl bg-surface overflow-hidden">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0 hover:bg-background/40 transition-colors text-[13px] text-text-primary font-semibold">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      task.status === "In Progress" ? "bg-primary-blue animate-pulse" : "bg-warning"
                    }`} />
                    <span>{task.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-text-secondary font-mono">
                    <span className="capitalize">{task.agent}</span>
                    <span>{task.time || "Pending"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Side Panel (Agent Activity & Health Stats) */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="space-y-2 select-none">
            <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider">Quick Actions</h3>
            <div className="bg-surface border border-border rounded-2xl p-4 grid grid-cols-2 gap-2 text-[12px] font-semibold text-text-primary">
              <button className="flex flex-col items-center justify-center p-3 border border-border hover:bg-background rounded-xl text-center transition-all">
                <Plus size={18} className="text-text-secondary mb-1" />
                <span>New Task</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-border hover:bg-background rounded-xl text-center transition-all">
                <Clock size={18} className="text-text-secondary mb-1" />
                <span>Create Session</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-border hover:bg-background rounded-xl text-center transition-all">
                <Folder size={18} className="text-text-secondary mb-1" />
                <span>Import Repo</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 border border-border hover:bg-background rounded-xl text-center transition-all">
                <Desktop size={18} className="text-text-secondary mb-1" />
                <span>Add Server</span>
              </button>
            </div>
          </div>

          {/* Agent Activity logs */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider select-none">Agent Activity</h3>
            <div className="bg-surface border border-border rounded-2xl p-4 space-y-3.5 text-[12.5px] text-text-primary font-medium">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded bg-active-bg flex items-center justify-center font-bold text-[9px] text-primary-blue mt-0.5">CL</div>
                <div>
                  <div>Claude: Analyzed authentication paths</div>
                  <span className="text-[10px] text-text-secondary">2m ago • Space: herdr</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-border/60 pt-3">
                <div className="w-5 h-5 rounded bg-active-bg flex items-center justify-center font-bold text-[9px] text-primary-blue mt-0.5">CD</div>
                <div>
                  <div>Codex: Refactored database indices</div>
                  <span className="text-[10px] text-text-secondary">8m ago • Space: herdr</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 border-t border-border/60 pt-3">
                <div className="w-5 h-5 rounded bg-active-bg flex items-center justify-center font-bold text-[9px] text-primary-blue mt-0.5">OC</div>
                <div>
                  <div>OpenCode: Ran middleware test suite</div>
                  <span className="text-[10px] text-text-secondary">22m ago • Space: herdr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Health Status */}
          <div className="space-y-2">
            <h3 className="text-[12px] font-bold text-text-secondary uppercase tracking-wider select-none">Infrastructure Health</h3>
            <div className="bg-surface border border-border rounded-2xl p-4 space-y-4">
              {/* CPU */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5"><Cpu size={14} className="text-text-secondary" /><span>CPU Usage</span></div>
                  <span className="font-mono">42%</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-blue h-full rounded-full" style={{ width: "42%" }} />
                </div>
              </div>

              {/* Memory */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5"><Heartbeat size={14} className="text-text-secondary" /><span>Memory Usage</span></div>
                  <span className="font-mono">68%</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-warning h-full rounded-full" style={{ width: "68%" }} />
                </div>
              </div>

              {/* Network */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[12px] font-semibold text-text-primary">
                  <div className="flex items-center gap-1.5"><Heartbeat size={14} className="text-text-secondary" /><span>Network Bandwidth</span></div>
                  <span className="font-mono">1.2 MB/s</span>
                </div>
                <div className="w-full bg-background h-1.5 rounded-full overflow-hidden">
                  <div className="bg-success h-full rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
