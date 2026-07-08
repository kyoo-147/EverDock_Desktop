import { GitBranch } from "@phosphor-icons/react";
import { Agent } from "../../types/agent";

interface AgentTableProps {
  agents: Agent[];
  selectedAgentName: string;
  onSelectAgent: (name: string) => void;
}

export default function AgentTable({ agents, selectedAgentName, onSelectAgent }: AgentTableProps) {
  return (
    <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
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
          {agents.map((agent) => (
            <tr
              key={agent.name}
              onClick={() => onSelectAgent(agent.name)}
              className={`border-b border-border text-[12.5px] cursor-pointer transition-colors ${
                selectedAgentName === agent.name 
                  ? "bg-active-bg/25 font-semibold text-text-primary" 
                  : "hover:bg-background/40 text-text-secondary hover:text-text-primary"
              }`}
            >
              <td className="py-3 px-4 font-bold text-text-primary">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-background border border-border flex items-center justify-center font-bold text-[10px] text-text-primary shrink-0">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span>{agent.name}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1.5 select-none">
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === "active" ? "bg-success animate-pulse" : "bg-warning"
                  }`} />
                  <span className="capitalize text-[11px] font-semibold">{agent.status}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="text-[12.5px] font-medium text-text-primary">{agent.model}</div>
                <div className="text-[10px] text-text-secondary">{agent.provider}</div>
              </td>
              <td className="py-3 px-4">
                <div className="text-[12px] font-bold text-text-primary">{agent.workspace}</div>
                <div className="text-[10px] text-text-secondary font-mono flex items-center gap-0.5 select-none">
                  <GitBranch size={10} className="text-primary-blue" />
                  <span>{agent.branch}</span>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="truncate max-w-[200px] text-text-primary">{agent.lastAction}</div>
                <div className="text-[10px] text-text-secondary">{agent.lastActionTime}</div>
              </td>
              <td className="py-3 px-4 font-mono text-[11px] text-text-secondary">{agent.version}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
