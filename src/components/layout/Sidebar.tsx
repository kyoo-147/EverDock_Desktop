import { Link, useLocation } from "react-router-dom";
import { 
  SquaresFour, 
  Clock, 
  CheckSquare, 
  Users, 
  Folder, 
  Monitor, 
  Plug, 
  Gear, 
  Plus,
  Circle,
  CaretRight
} from "@phosphor-icons/react";
import { mockSpaces, mockSidebarAgents, mockRecentSessions } from "../../data/mockData";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "Mission Control", path: "/mission-control", icon: SquaresFour },
    { name: "Sessions", path: "/sessions", icon: Clock },
    { name: "Tasks", path: "/tasks", icon: CheckSquare },
    { name: "Agents", path: "/agents", icon: Users },
    { name: "Workspaces", path: "/workspaces", icon: Folder },
    { name: "Screen Fleet", path: "/screen-fleet", icon: Monitor },
    { name: "Integrations", path: "/integrations", icon: Plug },
    { name: "Settings", path: "/settings", icon: Gear },
  ];

  return (
    <aside className="w-[240px] bg-surface border-r border-border flex flex-col h-screen select-none shrink-0 font-sans">
      {/* Header Logo */}
      <div className="p-4 border-b border-border flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary-blue rounded flex items-center justify-center text-white font-bold text-sm tracking-wider">
            E
          </div>
          <span className="font-semibold text-text-primary text-[15px] tracking-tight">Everdock</span>
        </div>
        <span className="text-[10px] text-text-secondary mt-0.5 font-medium leading-none">
          Developer operations platform
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Main Menu */}
        <div className="space-y-[2px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path === "/sessions" && currentPath === "/");
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive 
                    ? "bg-active-bg text-primary-blue" 
                    : "text-text-secondary hover:bg-background hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={16} weight={isActive ? "bold" : "regular"} className={isActive ? "text-primary-blue" : "text-text-secondary"} />
                  <span>{item.name}</span>
                </div>
                {item.name === "Sessions" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-active-bg text-primary-blue font-bold">
                    3
                  </span>
                )}
                {item.name === "Tasks" && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-active-bg text-primary-blue font-bold">
                    12
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Spaces Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            <span>Spaces</span>
            <button className="text-text-secondary hover:text-text-primary">
              <Plus size={12} weight="bold" />
            </button>
          </div>
          <div className="space-y-[1px]">
            {mockSpaces.map((space) => (
              <div
                key={space.name}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    space.color === 'blue' ? 'bg-primary-blue' :
                    space.color === 'pink' ? 'bg-error' : 'bg-success'
                  }`} />
                  <span className="truncate">{space.name}</span>
                </div>
                {space.activeCount && space.activeCount > 0 ? (
                  <span className="text-[10px] text-text-secondary">{space.activeCount} active</span>
                ) : null}
              </div>
            ))}
            <div className="px-3 py-1">
              <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
                View all spaces <CaretRight size={10} />
              </span>
            </div>
          </div>
        </div>

        {/* Agents Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            <span>Agents</span>
            <span className="text-[10px] text-text-secondary lowercase font-normal">all</span>
          </div>
          <div className="space-y-[1px]">
            {mockSidebarAgents.map((sa) => (
              <div
                key={sa.name}
                className="flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${
                    sa.statusColor === 'green' ? 'bg-success' :
                    sa.statusColor === 'amber' ? 'bg-warning' :
                    sa.statusColor === 'red' ? 'bg-error' : 'bg-text-secondary'
                  }`} />
                  <span className="truncate font-semibold">{sa.name}</span>
                </div>
                <span className="text-[11px] text-text-secondary font-light">
                  {sa.state} • {sa.agent}
                </span>
              </div>
            ))}
            <div className="px-3 py-1">
              <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
                View all agents <CaretRight size={10} />
              </span>
            </div>
          </div>
        </div>

        {/* Sessions Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider">
            <span>Sessions</span>
            <button className="text-text-secondary hover:text-text-primary">
              <Plus size={12} weight="bold" />
            </button>
          </div>
          <div className="space-y-[1px]">
            {mockRecentSessions.map((s) => (
              <div
                key={s.name}
                className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium cursor-pointer ${
                  s.active 
                    ? "bg-active-bg/50 text-text-primary border border-border" 
                    : "text-text-secondary hover:bg-background hover:text-text-primary"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Circle size={8} weight={s.active ? "fill" : "regular"} className={s.active ? "text-primary-blue" : "text-text-secondary"} />
                  <span className="truncate">{s.name}</span>
                </div>
                <span className="text-[11px] text-text-secondary font-light shrink-0 ml-1">
                  {s.time}
                </span>
              </div>
            ))}
            <div className="px-3 py-1">
              <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
                View all sessions <CaretRight size={10} />
              </span>
            </div>
          </div>
        </div>

        {/* Add Session CTA inside Menu */}
        <div className="px-2 pt-2">
          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-background border border-border hover:border-text-secondary/30 rounded-lg text-[12px] font-medium text-text-primary transition-all shadow-sm">
            <Plus size={14} weight="bold" />
            <span>New Session</span>
            <span className="text-[10px] text-text-secondary font-light ml-1 bg-background px-1.5 py-0.5 rounded border border-border font-mono">⌘ N</span>
          </button>
        </div>
      </nav>

      {/* Footer Health Status */}
      <div className="p-3 border-t border-border bg-background/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
          </span>
          <span className="text-[11px] font-medium text-text-primary">All Systems Operational</span>
        </div>
        <CaretRight size={12} className="text-text-secondary" />
      </div>
    </aside>
  );
}
