import { useLocation } from "react-router-dom";
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
import SidebarSection from "./SidebarSection";
import SidebarNavItem from "./SidebarNavItem";
import { mockSpaces } from "../../mocks/workspace.mock";
import { mockSidebarAgents } from "../../mocks/agent.mock";
import { mockRecentSessions } from "../../mocks/session.mock";

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
          <div className="w-6 h-6 bg-primary-blue rounded flex items-center justify-center text-white font-bold text-sm tracking-wider select-none">
            E
          </div>
          <span className="font-semibold text-text-primary text-[15px] tracking-tight">Everdock</span>
        </div>
        <span className="text-[10px] text-text-secondary mt-0.5 font-medium leading-none select-none">
          Developer operations platform
        </span>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4 scrollbar-thin">
        {/* Main Menu */}
        <div className="space-y-[2px]">
          {menuItems.map((item) => {
            const isActive = currentPath === item.path || (item.path === "/sessions" && currentPath === "/");
            const getBadge = () => {
              if (item.name === "Sessions") return 3;
              if (item.name === "Tasks") return 12;
              return undefined;
            };
            return (
              <SidebarNavItem
                key={item.name}
                name={item.name}
                path={item.path}
                icon={item.icon}
                isActive={isActive}
                badge={getBadge()}
              />
            );
          })}
        </div>

        {/* Spaces Section */}
        <SidebarSection 
          title="Spaces" 
          action={
            <button className="text-text-secondary hover:text-text-primary cursor-pointer">
              <Plus size={12} weight="bold" />
            </button>
          }
        >
          {mockSpaces.map((space) => {
            const getStatusColor = () => {
              if (space.color === 'blue') return 'bg-primary-blue';
              if (space.color === 'pink') return 'bg-error';
              return 'bg-success';
            };
            return (
              <SidebarNavItem
                key={space.name}
                name={space.name}
                icon={Folder}
                statusColor={getStatusColor()}
                metaText={space.activeCount && space.activeCount > 0 ? `${space.activeCount} active` : undefined}
              />
            );
          })}
          <div className="px-3 py-1">
            <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
              View all spaces <CaretRight size={10} />
            </span>
          </div>
        </SidebarSection>

        {/* Agents Section */}
        <SidebarSection title="Agents">
          {mockSidebarAgents.map((sa) => {
            const getStatusColor = () => {
              if (sa.statusColor === 'green') return 'bg-success';
              if (sa.statusColor === 'amber') return 'bg-warning';
              if (sa.statusColor === 'red') return 'bg-error';
              return 'bg-text-secondary';
            };
            return (
              <SidebarNavItem
                key={sa.name}
                name={sa.name}
                icon={Users}
                statusColor={getStatusColor()}
                metaText={`${sa.state} • ${sa.agent}`}
              />
            );
          })}
          <div className="px-3 py-1">
            <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
              View all agents <CaretRight size={10} />
            </span>
          </div>
        </SidebarSection>

        {/* Sessions Section */}
        <SidebarSection 
          title="Sessions"
          action={
            <button className="text-text-secondary hover:text-text-primary cursor-pointer">
              <Plus size={12} weight="bold" />
            </button>
          }
        >
          {mockRecentSessions.map((s) => (
            <SidebarNavItem
              key={s.name}
              name={s.name}
              icon={Circle}
              isActive={s.active}
              metaText={s.time}
            />
          ))}
          <div className="px-3 py-1">
            <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-medium flex items-center gap-1">
              View all sessions <CaretRight size={10} />
            </span>
          </div>
        </SidebarSection>

        {/* Add Session CTA inside Menu */}
        <div className="px-2 pt-2">
          <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-surface hover:bg-background border border-border hover:border-text-secondary/30 rounded-lg text-[12px] font-medium text-text-primary transition-all shadow-sm cursor-pointer select-none">
            <Plus size={14} weight="bold" />
            <span>New Session</span>
            <span className="text-[10px] text-text-secondary font-light ml-1 bg-background px-1.5 py-0.5 rounded border border-border font-mono">⌘ N</span>
          </button>
        </div>
      </nav>

      {/* Footer Health Status */}
      <div className="p-3 border-t border-border bg-background/50 flex items-center justify-between select-none">
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
