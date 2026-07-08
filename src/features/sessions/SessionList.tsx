import { Session } from "../../types/session";

interface SessionListProps {
  sessions: Session[];
  selectedSessionId: number;
  onSelectSession: (id: number) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function SessionList({
  sessions,
  selectedSessionId,
  onSelectSession,
  activeTab,
  setActiveTab
}: SessionListProps) {
  const filteredSessions = sessions.filter(s => {
    if (activeTab === "active") return s.status === "running";
    if (activeTab === "idle") return s.status === "idle";
    return s.status === "completed" || s.status === "failed";
  });

  return (
    <div className="w-[300px] border-r border-border bg-surface flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border space-y-3">
        <div>
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Sessions</h2>
          <p className="text-[11px] text-text-secondary mt-0.5 font-medium leading-normal">Live developer sessions across environments.</p>
        </div>
        {/* Tab Filter */}
        <div className="flex bg-background p-0.5 rounded-lg text-[12px] font-semibold border border-border select-none">
          <button 
            onClick={() => setActiveTab("active")}
            className={`flex-1 py-1 text-center rounded-md cursor-pointer ${
              activeTab === "active" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Active (3)
          </button>
          <button 
            onClick={() => setActiveTab("idle")}
            className={`flex-1 py-1 text-center rounded-md cursor-pointer ${
              activeTab === "idle" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Idle (1)
          </button>
          <button 
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-1 text-center rounded-md cursor-pointer ${
              activeTab === "completed" ? "bg-surface text-primary-blue shadow-sm" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Sessions Scroll List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
        {filteredSessions.map((session) => (
          <div
            key={session.id}
            onClick={() => onSelectSession(session.id)}
            className={`p-3 rounded-xl border cursor-pointer transition-all ${
              selectedSessionId === session.id
                ? "bg-active-bg/35 border-primary-blue shadow-sm text-text-primary font-semibold"
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
              <span className="text-[10px] bg-background border border-border rounded px-1.5 py-0.2 font-semibold select-none">
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
  );
}
