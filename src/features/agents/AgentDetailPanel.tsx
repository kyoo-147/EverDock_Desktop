import { 
  GitBranch, 
  CheckCircle,
  FileCode,
  Globe
} from "@phosphor-icons/react";
import { Agent } from "../../types/agent";

interface AgentDetailPanelProps {
  agent: Agent;
}

export default function AgentDetailPanel({ agent }: AgentDetailPanelProps) {
  return (
    <div className="w-[320px] border-l border-border bg-surface flex flex-col h-full shrink-0 overflow-y-auto scrollbar-thin">
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/15 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-text-primary border border-border flex items-center justify-center font-bold text-white text-[15px]">
            {agent.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-bold text-text-primary">{agent.name}</h3>
              <span className="w-2 h-2 rounded-full bg-success" />
              <span className="text-[10px] text-success font-bold uppercase select-none">Active</span>
            </div>
            <p className="text-[10.5px] text-text-secondary mt-0.5 select-none">{agent.category} • {agent.version}</p>
          </div>
        </div>
        <div className="flex gap-1.5 select-none">
          <button className="px-2.5 py-1 bg-surface hover:bg-background border border-border rounded text-[11px] font-bold text-text-primary transition-all cursor-pointer">
            Configure
          </button>
        </div>
      </div>

      {/* Details & Config Sections */}
      <div className="p-4 space-y-4">
        {/* Configuration */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Configuration</span>
          <div className="border border-border rounded-xl p-3 bg-background/5 text-[12.5px] space-y-2">
            <div className="flex justify-between"><span className="text-text-secondary">Provider</span><span className="font-semibold">{agent.provider}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Model</span><span className="font-semibold">{agent.model}</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Temperature</span><span className="font-mono">0.2</span></div>
            <div className="flex justify-between"><span className="text-text-secondary">Max Tokens</span><span className="font-mono">8,192</span></div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Workspace</span>
              <span className="font-semibold font-mono flex items-center gap-0.5">
                {agent.workspace} ({agent.branch})
              </span>
            </div>
            <div className="pt-2 border-t border-border/60">
              <span className="text-[10.5px] font-bold text-text-secondary block mb-1 select-none">System Prompt</span>
              <p className="text-[11.5px] text-text-primary leading-relaxed">
                Code-first assistant focused on implementing features, refactoring, and fixing bugs.
              </p>
              <span className="text-[10.5px] text-primary-blue hover:underline cursor-pointer font-semibold block mt-1 select-none">Show more</span>
            </div>
          </div>
        </div>

        {/* Permissions */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Permissions</span>
          <div className="grid grid-cols-1 gap-1.5 text-[12px] font-medium text-text-primary">
            {[
              "Read Files",
              "Write Files",
              "Execute Commands",
              "Network Access",
              "Git Operations"
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between bg-surface border border-border rounded-lg p-2">
                <span>{p}</span>
                <div className="flex items-center gap-1.5 text-success select-none">
                  <CheckCircle size={14} weight="bold" />
                  <span className="text-[9.5px] uppercase font-bold">Allowed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Access */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Tools Access</span>
          <div className="space-y-1 text-[12px] font-semibold text-text-primary">
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <div className="flex items-center gap-1.5"><FileCode size={14} className="text-text-secondary" /><span className="select-none">Bash</span></div>
              <span className="text-[10px] text-text-secondary font-light select-none">Read, Write, Execute</span>
            </div>
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <div className="flex items-center gap-1.5"><GitBranch size={14} className="text-primary-blue" /><span className="select-none">Git</span></div>
              <span className="text-[10px] text-text-secondary font-light select-none">Read, Write</span>
            </div>
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <div className="flex items-center gap-1.5"><Globe size={14} className="text-text-secondary" /><span className="select-none">Web Fetch</span></div>
              <span className="text-[10px] text-text-secondary font-light select-none">Read</span>
            </div>
          </div>
        </div>

        {/* Connected Servers */}
        <div className="space-y-2">
          <div className="flex items-center justify-between select-none">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Connected Servers</span>
            <span className="text-[10px] text-primary-blue hover:underline cursor-pointer font-semibold">+ Add server</span>
          </div>
          <div className="space-y-1">
            {["prod-web-01", "staging-api", "db-primary"].map((srv, i) => (
              <div key={i} className="flex items-center justify-between border border-border rounded-lg p-2 text-[12px] font-semibold text-text-primary bg-background/5">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  <span>{srv}</span>
                </div>
                <span className="font-mono text-[10px] text-text-secondary select-none">10.0.1.1{i + 2}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Runs */}
        <div className="space-y-2 pt-2 border-t border-border">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block select-none">Recent Runs</span>
          <div className="space-y-1 text-[12.5px] font-medium text-text-primary">
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <span className="truncate pr-2">Implemented user auth flow</span>
              <span className="text-[10.5px] text-text-secondary shrink-0 select-none">8m ago</span>
            </div>
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <span className="truncate pr-2">Refactored session.ts</span>
              <span className="text-[10.5px] text-text-secondary shrink-0 select-none">1h ago</span>
            </div>
            <div className="flex items-center justify-between border border-border rounded-lg p-2">
              <span className="truncate pr-2">Fixed failing tests</span>
              <span className="text-[10.5px] text-text-secondary shrink-0 select-none">2h ago</span>
            </div>
          </div>
          <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-semibold block pt-1 select-none">View all runs &gt;</span>
        </div>
      </div>
    </div>
  );
}
