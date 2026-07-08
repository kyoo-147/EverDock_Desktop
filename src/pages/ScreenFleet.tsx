import { useState } from "react";
import { 
  ArrowSquareOut, 
  Eye, 
  CornersOut, 
  SlidersHorizontal,
  Check,
  Terminal,
  Heartbeat
} from "@phosphor-icons/react";
import { mockScreens } from "../data/mockData";

export default function ScreenFleet() {
  const [selectedScreenId, setSelectedScreenId] = useState<string>("1");
  const [envFilter, setEnvFilter] = useState<string>("All");

  const selectedScreen = mockScreens.find(s => s.id === selectedScreenId) || mockScreens[0];

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Column 1: Filter Sidebar */}
      <div className="w-[200px] border-r border-border bg-surface flex flex-col h-full shrink-0 p-4 space-y-4">
        <div>
          <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Screen Fleet</h2>
          <p className="text-[11px] text-text-secondary mt-0.5">Monitor and open remote developer screens.</p>
        </div>

        {/* Environments Filter */}
        <div className="space-y-1.5 select-none">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Environments</span>
          <div className="space-y-[1px] text-[12.5px] font-medium text-text-secondary">
            <button 
              onClick={() => setEnvFilter("All")}
              className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md ${
                envFilter === "All" ? "bg-active-bg text-primary-blue font-bold" : "hover:bg-background hover:text-text-primary"
              }`}
            >
              <span>All Environments</span>
              <span className="text-[10px] text-text-secondary">12</span>
            </button>
            <button 
              onClick={() => setEnvFilter("Production")}
              className={`w-full flex items-center justify-between px-2.5 py-1 rounded-md ${
                envFilter === "Production" ? "bg-active-bg text-primary-blue font-bold" : "hover:bg-background hover:text-text-primary"
              }`}
            >
              <span>Production</span>
              <span className="text-[10px] text-text-secondary">4</span>
            </button>
            <button className="w-full flex items-center justify-between px-2.5 py-1 rounded-md hover:bg-background hover:text-text-primary">
              <span>Staging</span>
              <span className="text-[10px]">3</span>
            </button>
            <button className="w-full flex items-center justify-between px-2.5 py-1 rounded-md hover:bg-background hover:text-text-primary">
              <span>Development</span>
              <span className="text-[10px]">5</span>
            </button>
          </div>
        </div>

        {/* Status Filters */}
        <div className="space-y-2 border-t border-border pt-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Filters</span>
          
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-text-primary">Status</span>
            <div className="space-y-1 text-[12px] text-text-secondary">
              <label className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                <input type="checkbox" defaultChecked className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                <span>Online (12)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                <input type="checkbox" defaultChecked className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                <span>Busy (3)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                <input type="checkbox" className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                <span>Offline (2)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Grid of Screens */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border h-full bg-background">
        <div className="p-4 border-b border-border bg-surface flex items-center justify-between select-none">
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] font-bold text-text-primary uppercase tracking-wider">12 Screens</span>
            <span className="text-[10px] text-success font-medium bg-success/10 px-1.5 py-0.2 rounded-full">12 Online</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-semibold text-text-secondary">
            <span>Sort:</span>
            <span className="text-text-primary cursor-pointer hover:underline">Recently Active</span>
          </div>
        </div>

        {/* Screens grid container */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-2 gap-4 auto-rows-max select-none">
          {mockScreens.map((screen) => (
            <div
              key={screen.id}
              onClick={() => setSelectedScreenId(screen.id)}
              className={`bg-surface border rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-all space-y-3 ${
                selectedScreenId === screen.id ? "border-primary-blue shadow-sm ring-1 ring-primary-blue/30" : "border-border"
              }`}
            >
              {/* Card top details */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    screen.status === 'online' ? 'bg-success animate-pulse' : 'bg-warning'
                  }`} />
                  <span className="text-[13.5px] font-bold text-text-primary">{screen.name}</span>
                </div>
                <span className="text-[9.5px] text-text-secondary font-mono bg-background border border-border px-1.5 py-0.2 rounded font-semibold">
                  {screen.latency}
                </span>
              </div>

              {/* Console preview mockup block */}
              <div className="bg-[#071126] border border-[#1E293B] rounded-xl p-3 h-[90px] overflow-hidden text-[#94A3B8] font-mono text-[9px] leading-relaxed relative">
                <div>
                  $ git status<br />
                  On branch master<br />
                  Changes not staged for commit:<br />
                  &nbsp;&nbsp;modified: src/server.ts
                </div>
                {/* Fade overlays */}
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#071126] to-transparent pointer-events-none" />
              </div>

              {/* Card Footer details */}
              <div className="flex items-center justify-between text-[11px] text-text-secondary border-t border-border pt-2.5">
                <div className="flex flex-col">
                  <span className="font-semibold text-text-primary capitalize">{screen.server}</span>
                  <span className="text-[10px] mt-0.5 truncate max-w-[130px] font-medium italic">
                    {screen.type}
                  </span>
                </div>
                {/* User avatar initials icon */}
                <div className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center font-bold text-[9.5px] text-text-primary shrink-0">
                  {screen.agentInitials}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: Screen details & Remote mirror view */}
      <div className="w-[320px] bg-surface flex flex-col h-full shrink-0 overflow-y-auto">
        {/* Detail Header */}
        <div className="p-4 border-b border-border bg-background/15 flex items-center justify-between select-none">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10.5px] font-mono text-text-secondary uppercase">{selectedScreen.server}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[9.5px] text-success font-bold uppercase">Online</span>
            </div>
            <h3 className="text-[15px] font-bold text-text-primary mt-1">{selectedScreen.name}</h3>
          </div>
          <span className="text-[10.5px] font-semibold text-text-secondary font-mono bg-background border border-border px-1.5 rounded">
            {selectedScreen.latency}
          </span>
        </div>

        {/* Screen Viewer Simulator Pane */}
        <div className="p-4 border-b border-border space-y-3">
          <div className="flex items-center justify-between select-none">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Remote Screen Mirror</span>
            <span className="text-[9.5px] text-text-secondary font-semibold">1280x800</span>
          </div>
          <div className="bg-[#071126] border border-[#1E293B] rounded-xl p-3 h-[200px] font-mono text-[9px] text-[#94A3B8] leading-relaxed overflow-hidden relative select-text select-none">
            <div>
              ubuntu@prod-web-01:~/app$ git status<br />
              On branch master<br />
              modified: src/server.ts<br />
              modified: package.json<br />
              <br />
              ubuntu@prod-web-01:~/app$ npm run build<br />
              &gt; herdr@0.18.1 build<br />
              &gt; tsc && vite build<br />
              <br />
              <span className="text-[#38BDF8]">vite v5.2.9 building for production...</span><br />
              ✓ 145 modules transformed.<br />
              dist/index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.2 kB<br />
              dist/assets/app.8f3a1c.js &nbsp;&nbsp;&nbsp;142.7 kB / gzip: 45.1 kB<br />
              ✓ built in 1.42s<br />
              ubuntu@prod-web-01:~/app$ <span className="w-1.5 h-3 bg-white inline-block animate-pulse" />
            </div>
          </div>
          {/* Action buttons */}
          <div className="grid grid-cols-4 gap-1.5 pt-1 select-none">
            <button className="flex flex-col items-center justify-center py-2.5 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-xl text-[10.5px] font-bold shadow-sm transition-all">
              <ArrowSquareOut size={16} weight="bold" className="mb-0.5" />
              <span>Open</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2.5 border border-border hover:bg-background rounded-xl text-[10.5px] font-semibold text-text-primary transition-all">
              <Eye size={16} className="mb-0.5" />
              <span>Follow</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2.5 border border-border hover:bg-background rounded-xl text-[10.5px] font-semibold text-text-primary transition-all">
              <CornersOut size={16} className="mb-0.5" />
              <span>Full</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2.5 border border-border hover:bg-background rounded-xl text-[10.5px] font-semibold text-text-primary transition-all">
              <SlidersHorizontal size={16} className="mb-0.5" />
              <span>Inspect</span>
            </button>
          </div>
        </div>

        {/* Details list */}
        <div className="p-4 space-y-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Details</span>
            <div className="border border-border rounded-xl p-3 bg-background/5 text-[12px] font-medium text-text-primary space-y-2">
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Environment</span><span className="font-semibold">Production</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Space</span><span className="font-semibold">herdr</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Agent</span><span className="font-semibold font-mono">prod-web-01 (v1.6.0)</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Connection</span><span className="font-semibold">ssh (22ms)</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Owner</span><span className="font-semibold flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-background border border-border flex items-center justify-center text-[8.5px] font-bold">CJ</div> Claude Jordan</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Current Task</span><span className="font-semibold text-primary-blue hover:underline cursor-pointer">Deploying v1.18.1</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Started</span><span>8m ago</span></div>
              <div className="flex justify-between"><span className="text-text-secondary font-normal">Uptime</span><span>2h 41m</span></div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Recent Activity</span>
            <div className="border border-border rounded-xl bg-surface p-3 space-y-3 text-[12px] font-semibold text-text-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-success" />
                  <span>Deployed v1.18.0</span>
                </div>
                <span className="text-[10.5px] text-text-secondary font-normal">10:24:11</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-2">
                <div className="flex items-center gap-2">
                  <Heartbeat size={14} className="text-primary-blue" />
                  <span>Pulled latest changes</span>
                </div>
                <span className="text-[10.5px] text-text-secondary font-normal">10:16:02</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/60 pt-2">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-text-secondary" />
                  <span>Started deploy.sh</span>
                </div>
                <span className="text-[10.5px] text-text-secondary font-normal">10:15:44</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
