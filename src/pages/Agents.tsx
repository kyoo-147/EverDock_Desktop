import { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import AgentTable from "../features/agents/AgentTable";
import AgentDetailPanel from "../features/agents/AgentDetailPanel";
import { mockAgents } from "../mocks/agent.mock";

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
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg text-[12px] font-semibold transition-all shadow-sm cursor-pointer select-none">
            <Plus size={14} weight="bold" />
            <span>Add Agent</span>
          </button>
        </div>

        {/* Table Content Component */}
        <AgentTable
          agents={mockAgents}
          selectedAgentName={selectedAgentName}
          onSelectAgent={setSelectedAgentName}
        />
      </div>

      {/* Right Column: Config & Details panel */}
      <AgentDetailPanel agent={selectedAgent} />
    </div>
  );
}
