import { useState } from "react";
import SessionList from "../features/sessions/SessionList";
import SessionDetailPanel from "../features/sessions/SessionDetailPanel";
import SessionTerminal from "../features/sessions/SessionTerminal";
import { mockSessions } from "../mocks/session.mock";

export default function Sessions() {
  const [selectedSessionId, setSelectedSessionId] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<string>("active");

  const selectedSession = mockSessions.find(s => s.id === selectedSessionId) || mockSessions[0];

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Column 1: Sessions List */}
      <SessionList
        sessions={mockSessions}
        selectedSessionId={selectedSessionId}
        onSelectSession={setSelectedSessionId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Column 2: Session Details */}
      <SessionDetailPanel session={selectedSession} />

      {/* Column 3: Active Terminal Panel */}
      <SessionTerminal session={selectedSession} />
    </div>
  );
}
