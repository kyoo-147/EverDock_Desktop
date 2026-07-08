import {   Folder, 
  GitBranch, 
  ArrowClockwise, 
  Plus, 
  CaretRight
} from "@phosphor-icons/react";
import WorkspaceCard from "../features/workspaces/WorkspaceCard";
import ServerStatusItem from "../features/servers/ServerStatusItem";
import { mockWorkspaceDetail, mockSpaces } from "../mocks/workspace.mock";

export default function Workspaces() {
  const ws = mockWorkspaceDetail;

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Column 1: Workspace Selector Left Sidebar */}
      <div className="w-[180px] border-r border-border bg-surface flex flex-col h-full shrink-0 p-3 space-y-4">
        <div>
          <h2 className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Workspaces</h2>
        </div>
        <div className="space-y-[2px]">
          {mockSpaces.map((space) => (
            <button
              key={space.name}
              className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-[12.5px] font-semibold cursor-pointer ${
                space.name === "herdr" ? "bg-active-bg text-primary-blue" : "text-text-secondary hover:bg-background hover:text-text-primary"
              }`}
            >
              <div className="flex items-center gap-2">
                <Folder size={14} weight={space.name === "herdr" ? "fill" : "regular"} />
                <span>{space.name}</span>
              </div>
            </button>
          ))}
        </div>
        <button className="w-full flex items-center justify-center gap-1 py-1.5 border border-dashed border-border hover:border-text-secondary/50 rounded-lg text-[11px] font-bold text-text-secondary hover:text-text-primary transition-all cursor-pointer select-none">
          <Plus size={12} weight="bold" />
          <span>New Workspace</span>
        </button>
      </div>

      {/* Column 2: Main Workspace Workspace Overview */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border bg-surface h-full">
        {/* Workspace header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-background/15">
          <div className="flex items-center gap-3">
            <h2 className="text-[15px] font-bold text-text-primary">{ws.name}</h2>
            <div className="flex items-center gap-1 bg-surface border border-border px-1.5 py-0.5 rounded text-[11px] font-semibold text-text-secondary cursor-pointer">
              <GitBranch size={12} className="text-primary-blue" />
              <span>{ws.branch}</span>
            </div>
            <span className="text-[10px] text-success bg-success/15 px-2 py-0.5 rounded-full font-bold flex items-center gap-1 select-none">
              <span className="w-1 h-1 bg-success rounded-full animate-pulse" />
              {ws.status}
            </span>
          </div>
          <button className="text-text-secondary hover:text-text-primary p-1 bg-surface border border-border rounded transition-all cursor-pointer">
            <ArrowClockwise size={14} />
          </button>
        </div>

        {/* Dashboard Sections Grid */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin">
          {/* Connected Servers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between select-none">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Connected Servers</span>
              <button className="text-[11px] text-primary-blue hover:underline font-semibold flex items-center gap-0.5 cursor-pointer">
                <Plus size={11} weight="bold" /> Add server
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {ws.servers.map((srv) => (
                <ServerStatusItem key={srv.name} server={srv} />
              ))}
            </div>
          </div>

          {/* Connected Repositories & Environments */}
          <div className="grid grid-cols-2 gap-4">
            {/* Repository */}
            <div className="space-y-2">
              <div className="flex items-center justify-between select-none">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Repository</span>
                <button className="text-[11px] text-primary-blue hover:underline font-semibold flex items-center gap-0.5 cursor-pointer">
                  <Plus size={11} weight="bold" /> Connect repo
                </button>
              </div>
              <WorkspaceCard repository={ws.repository} />
            </div>

            {/* Environments */}
            <div className="space-y-2">
              <div className="flex items-center justify-between select-none">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Environments</span>
                <button className="text-[11px] text-primary-blue hover:underline font-semibold flex items-center gap-0.5 cursor-pointer">
                  <Plus size={11} weight="bold" /> Add environment
                </button>
              </div>
              <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-1.5">
                {ws.environments.map((env) => (
                  <div key={env.name} className="flex items-center justify-between border-b border-border last:border-b-0 pb-1.5 last:pb-0 pt-0.5">
                    <span className="text-[12.5px] font-semibold text-text-primary font-mono">{env.name}</span>
                    <span className={`text-[10px] font-bold uppercase select-none ${
                      env.status === 'Active' ? 'text-success bg-success/10 px-1.5 py-0.2 rounded' : 'text-text-secondary bg-background px-1.5 py-0.2 rounded'
                    }`}>{env.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Installed Agents & Active Sessions */}
          <div className="grid grid-cols-2 gap-4">
            {/* Installed Agents */}
            <div className="space-y-2">
              <div className="flex items-center justify-between select-none">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Installed Agents</span>
                <button className="text-[11px] text-primary-blue hover:underline font-semibold flex items-center gap-0.5 cursor-pointer">
                  <Plus size={11} weight="bold" /> Add agent
                </button>
              </div>
              <div className="border border-border rounded-xl p-2 bg-surface hover:shadow-sm transition-all space-y-1">
                {ws.installedAgents.map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between p-1.5 rounded hover:bg-background transition-colors text-[12px] font-semibold text-text-primary">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${agent.status === 'Active' ? 'bg-success animate-pulse' : 'bg-warning'}`} />
                      <span className="capitalize">{agent.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-text-secondary select-none">{agent.version}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="space-y-2">
              <div className="flex items-center justify-between select-none">
                <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Active Sessions</span>
                <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-semibold">View all</span>
              </div>
              <div className="border border-border rounded-xl p-2 bg-surface hover:shadow-sm transition-all space-y-1">
                {ws.activeSessions.map((session) => (
                  <div key={session.name} className="flex items-center justify-between p-1.5 rounded hover:bg-background transition-colors text-[12px] font-semibold text-text-primary">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span className="truncate">{session.name}</span>
                    </div>
                    <span className="font-mono text-[10px] text-text-secondary shrink-0 select-none">{session.duration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Files */}
          <div className="space-y-2">
            <div className="flex items-center justify-between select-none">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider">Recent Files</span>
              <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-semibold">View all files</span>
            </div>
            <div className="border border-border rounded-xl bg-surface overflow-hidden">
              {ws.recentFiles.map((file) => (
                <div key={file.name} className="flex items-center justify-between px-3.5 py-2.5 border-b border-border last:border-b-0 hover:bg-background/40 transition-colors text-[12.5px] text-text-primary font-medium">
                  <div>{file.name}</div>
                  <div className="flex items-center gap-3 text-[11px] text-text-secondary font-mono select-none">
                    <span>{file.commit}</span>
                    <span>{file.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Workspace Details & Env Preview */}
      <div className="w-[320px] bg-surface flex flex-col h-full shrink-0 border-l border-border overflow-y-auto scrollbar-thin">
        {/* Workspace details header */}
        <div className="p-4 border-b border-border bg-background/15 select-none">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Workspace details</span>
          <div className="space-y-1.5 mt-2 text-[12.5px] font-medium text-text-primary">
            <div className="flex justify-between"><span className="text-text-secondary">Name</span><span className="font-bold">{ws.name}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Path</span><span className="font-mono text-text-secondary">~/Projects/{ws.name}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Branch</span><span className="font-semibold font-mono flex items-center gap-0.5"><GitBranch size={12} className="text-primary-blue" />master</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Status</span><span className="text-success font-bold">Synced</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Last synced</span><span>{ws.repository.updated}</span></div>
          </div>
        </div>

        {/* Environment Preview (Astro Terminal Console) */}
        <div className="p-4 space-y-2 border-b border-border">
          <div className="flex items-center justify-between select-none">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Environment Preview</span>
            <span className="text-[9.5px] bg-background border border-border px-1.5 py-0.2 rounded font-mono font-medium">dev.local</span>
          </div>
          <div className="bg-[#071126] border border-[#1E293B] rounded-xl p-3 h-[200px] overflow-y-auto font-mono text-[10.5px] text-[#94A3B8] leading-relaxed scrollbar-thin select-text">
            <div className="text-success font-semibold flex items-center gap-1.5 mb-1.5 select-none">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
              </span>
              <span>dev.local is active</span>
            </div>
            <div>
              $ bun run dev<br />
              $ node scripts/prepare-docs.mjs && astro dev<br />
              <br />
              02:10:44 <span className="text-[#38BDF8]">[types]</span> Generated @ms<br />
              02:10:44 <span className="text-[#38BDF8]">[content]</span> Synced content<br />
              <br />
              <span className="bg-success text-white font-bold font-sans text-[9px] px-1 rounded">astro</span> v5.18.1 ready in 668 ms<br />
              <br />
              | Local: <span className="text-[#38BDF8] underline">http://localhost:4321/</span><br />
              | Network: use --host to expose<br />
              <br />
              02:10:44 <span className="text-[#94A3B8] animate-pulse">watching for file changes...</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-4 space-y-2 select-none">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Quick Actions</span>
          <div className="grid grid-cols-1 gap-1.5 text-[12px] font-semibold text-text-primary">
            <button className="flex items-center justify-between border border-border hover:bg-background rounded-lg p-2.5 text-left transition-all cursor-pointer">
              <span>Connect repository</span>
              <CaretRight size={12} className="text-text-secondary" />
            </button>
            <button className="flex items-center justify-between border border-border hover:bg-background rounded-lg p-2.5 text-left transition-all cursor-pointer">
              <span>Add server</span>
              <CaretRight size={12} className="text-text-secondary" />
            </button>
            <button className="flex items-center justify-between border border-border hover:bg-background rounded-lg p-2.5 text-left transition-all cursor-pointer">
              <span>New session</span>
              <CaretRight size={12} className="text-text-secondary" />
            </button>
            <button className="flex items-center justify-between border border-border hover:bg-background rounded-lg p-2.5 text-left transition-all cursor-pointer">
              <span className="font-mono">Open in terminal</span>
              <CaretRight size={12} className="text-text-secondary" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
