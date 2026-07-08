import { useState } from "react";
import { 
  Plus, 
  GitBranch, 
  CheckCircle,
  FileCode,
  Globe
} from "@phosphor-icons/react";
import { mockAgents } from "../data/mockData";

export default function Agents() {
  const [selectedAgentName, setSelectedAgentName] = useState<string>("Codex");

  const selectedAgent = mockAgents.find(a => a.name === selectedAgentName) || mockAgents[1];

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Main Column: Agents Table */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border bg-surface h-full">
        {/* Table Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Agents</h2>
            <p className="text-[11px] text-text-secondary mt-0.5">Manage your AI agents and their operational state.</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm">
            <Plus size={14} weight="bold" />
            <span>Add Agent</span>
          </button>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-background/30 text-[10.5px] font-bold text-text-secondary uppercase select-none">
                <th className="py-2.5 px-4 font-semibold">Agent</th>
                <th className="py-2.5 px-4 font-semibold">Status</th>
                <th className="py-2.5 px-4 font-semibold">Provider / Model</th>
                <th className="py-2.5 px-4 font-semibold">Workspace</th>
                <th className="py-2.5 px-4 font-semibold">Last Action</th>
                <th className="py-2.5 px-4 font-semibold">Version</th>
              </tr>
            </thead>
            <tbody>
              {mockAgents.map((agent) => (
                <tr
                  key={agent.name}
                  onClick={() => setSelectedAgentName(agent.name)}
                  className={`border-b border-border text-[12.5px] cursor-pointer transition-colors ${
                    selectedAgent.name === agent.name 
                      ? "bg-active-bg/25 font-semibold text-text-primary" 
                      : "hover:bg-background/40 text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {/* Name with icon placeholder */}
                  <td className="py-3 px-4 font-bold text-text-primary">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-background border border-border flex items-center justify-center font-bold text-[10px] text-text-primary shrink-0">
                        {agent.name.substring(0, 2).toUpperCase()}
                      </div>
                      <span>{agent.name}</span>
                    </div>
                  </td>
                  {/* Status */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        agent.status === "active" ? "bg-success animate-pulse" : "bg-warning"
                      }`} />
                      <span className="capitalize text-[11px] font-semibold">{agent.status}</span>
                    </div>
                  </td>
                  {/* Provider / Model */}
                  <td className="py-3 px-4">
                    <div className="text-[12.5px] font-medium text-text-primary">{agent.model}</div>
                    <div className="text-[10px] text-text-secondary">{agent.provider}</div>
                  </td>
                  {/* Workspace */}
                  <td className="py-3 px-4">
                    <div className="text-[12px] font-bold text-text-primary">{agent.workspace}</div>
                    <div className="text-[10px] text-text-secondary font-mono flex items-center gap-0.5">
                      <GitBranch size={10} className="text-primary-blue" />
                      <span>{agent.branch}</span>
                    </div>
                  </td>
                  {/* Last Action */}
                  <td className="py-3 px-4">
                    <div className="truncate max-w-[200px] text-text-primary">{agent.lastAction}</div>
                    <div className="text-[10px] text-text-secondary">{agent.lastActionTime}</div>
                  </td>
                  {/* Version */}
                  <td className="py-3 px-4 font-mono text-[11px] text-text-secondary">{agent.version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Column: Config & Details panel */}
      <div className="w-[320px] border-l border-border bg-surface flex flex-col h-full shrink-0 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-border bg-background/15 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-text-primary border border-border flex items-center justify-center font-bold text-white text-[15px]">
              {selectedAgent.name.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-text-primary">{selectedAgent.name}</h3>
                <span className="w-2 h-2 rounded-full bg-success" />
                <span className="text-[10px] text-success font-bold uppercase">Active</span>
              </div>
              <p className="text-[10.5px] text-text-secondary mt-0.5">{selectedAgent.category} • {selectedAgent.version}</p>
            </div>
          </div>
          <div className="flex gap-1.5 select-none">
            <button className="px-2.5 py-1 bg-surface hover:bg-background border border-border rounded text-[11px] font-bold text-text-primary transition-all">
              Configure
            </button>
          </div>
        </div>

        {/* Details & Config Sections */}
        <div className="p-4 space-y-4">
          {/* Configuration */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Configuration</span>
            <div className="border border-border rounded-xl p-3 bg-background/5 text-[12.5px] space-y-2">
              <div className="flex justify-between"><span className="text-text-secondary">Provider</span><span className="font-semibold">{selectedAgent.provider}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Model</span><span className="font-semibold">{selectedAgent.model}</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Temperature</span><span className="font-mono">0.2</span></div>
              <div className="flex justify-between"><span className="text-text-secondary">Max Tokens</span><span className="font-mono">8,192</span></div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Workspace</span>
                <span className="font-semibold font-mono flex items-center gap-0.5">
                  {selectedAgent.workspace} ({selectedAgent.branch})
                </span>
              </div>
              <div className="pt-2 border-t border-border/60">
                <span className="text-[10.5px] font-bold text-text-secondary block mb-1">System Prompt</span>
                <p className="text-[11.5px] text-text-primary leading-relaxed">
                  Code-first assistant focused on implementing features, refactoring, and fixing bugs.
                </p>
                <span className="text-[10.5px] text-primary-blue hover:underline cursor-pointer font-semibold block mt-1">Show more</span>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Permissions</span>
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
                  <div className="flex items-center gap-1.5 text-success">
                    <CheckCircle size={14} weight="bold" />
                    <span className="text-[9.5px] uppercase font-bold">Allowed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Access */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Tools Access</span>
            <div className="space-y-1 text-[12px] font-semibold text-text-primary">
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <div className="flex items-center gap-1.5"><FileCode size={14} className="text-text-secondary" /><span>Bash</span></div>
                <span className="text-[10px] text-text-secondary font-light">Read, Write, Execute</span>
              </div>
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <div className="flex items-center gap-1.5"><GitBranch size={14} className="text-primary-blue" /><span>Git</span></div>
                <span className="text-[10px] text-text-secondary font-light">Read, Write</span>
              </div>
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <div className="flex items-center gap-1.5"><Globe size={14} className="text-text-secondary" /><span>Web Fetch</span></div>
                <span className="text-[10px] text-text-secondary font-light">Read</span>
              </div>
            </div>
          </div>

          {/* Connected Servers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
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
                  <span className="font-mono text-[10px] text-text-secondary">10.0.1.1{i + 2}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Runs */}
          <div className="space-y-2 pt-2 border-t border-border">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Recent Runs</span>
            <div className="space-y-1 text-[12.5px] font-medium text-text-primary">
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <span className="truncate pr-2">Implemented user auth flow</span>
                <span className="text-[10.5px] text-text-secondary shrink-0">8m ago</span>
              </div>
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <span className="truncate pr-2">Refactored session.ts</span>
                <span className="text-[10.5px] text-text-secondary shrink-0">1h ago</span>
              </div>
              <div className="flex items-center justify-between border border-border rounded-lg p-2">
                <span className="truncate pr-2">Fixed failing tests</span>
                <span className="text-[10.5px] text-text-secondary shrink-0">2h ago</span>
              </div>
            </div>
            <span className="text-[11px] text-primary-blue hover:underline cursor-pointer font-semibold block pt-1">View all runs &gt;</span>
          </div>
        </div>
      </div>
    </div>
  );
}
