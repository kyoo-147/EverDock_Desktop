import { 
  Plus, 
  Gear, 
  ChatTeardropText, 
  ShieldCheck, 
  Check
} from "@phosphor-icons/react";
import TerminalGrid from "./TerminalGrid";
import ChatThread from "../chat/ChatThread";
import ChatInput from "../chat/ChatInput";
import ApprovalCard from "../approvals/ApprovalCard";
import { useTerminalStore } from "../../stores/terminal.store";

export default function TerminalWorkspace() {
  const {
    activeTab,
    setActiveTab,
    panes,
    chatMessages,
    showApproval,
    setShowApproval,
    addMessage,
    closePane
  } = useTerminalStore();

  const handleSendMessage = (text: string) => {
    addMessage({ sender: "User", time: "Just now", text });
  };

  const handleClosePane = (id: string) => {
    closePane(id);
  };

  const handleApprove = () => {
    setShowApproval(false);
    addMessage({ sender: "System", time: "Just now", text: "✓ Write permission approved by user." });
  };

  const handleReject = () => {
    setShowApproval(false);
    addMessage({ sender: "System", time: "Just now", text: "✗ Write permission rejected by user." });
  };

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Center Area: Terminal Grid */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border h-full">
        {/* Terminal Header Toolbar */}
        <div className="h-10 border-b border-border px-4 flex items-center justify-between bg-surface shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-text-primary uppercase tracking-wider">Terminal Grid</span>
            <span className="text-[10px] text-success font-medium bg-success/10 px-1.5 py-0.2 rounded-full">
              {panes.length} Panes Running
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text-primary border border-border rounded px-2 py-0.5 bg-surface transition-all cursor-pointer">
              <Plus size={12} weight="bold" />
              <span>Add Terminal</span>
            </button>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text-primary border border-border rounded px-2 py-0.5 bg-surface transition-all cursor-pointer">
              <Gear size={12} />
              <span>Grid Layout</span>
            </button>
          </div>
        </div>

        {/* 2x2 Grid of Terminal Panes */}
        <div className="flex-1 bg-border overflow-hidden relative min-h-0 min-w-0">
          <TerminalGrid panes={panes} onClosePane={handleClosePane} />
        </div>
      </div>

      {/* Right Side Panel: Agent Chat & Approvals */}
      <div className="w-[320px] bg-surface flex flex-col h-full shrink-0">
        {/* Panel Tabs */}
        <div className="h-10 border-b border-border flex items-center px-2 bg-background/30 gap-1 select-none shrink-0">
          <button 
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold transition-colors cursor-pointer ${
              activeTab === "all" ? "bg-surface text-primary-blue shadow-sm border border-border" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <ChatTeardropText size={14} />
            <span>Agent Chat</span>
          </button>
          <button 
            onClick={() => setActiveTab("approvals")}
            className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold relative transition-colors cursor-pointer ${
              activeTab === "approvals" ? "bg-surface text-primary-blue shadow-sm border border-border" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <ShieldCheck size={14} />
            <span>Approvals</span>
            <span className="absolute -top-1.5 -right-1 w-4 h-4 bg-error text-white font-bold text-[8px] rounded-full flex items-center justify-center">
              1
            </span>
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "all" ? (
          <div className="flex-1 flex flex-col min-h-0">
            {/* Chat Thread with optional embedded approval */}
            <ChatThread messages={chatMessages}>
              {showApproval && (
                <ApprovalCard
                  title="Write permission for middleware/auth.ts"
                  description="Claude requested to replace lines 12-45 with optimized redirect middleware."
                  riskLevel="high"
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              )}
            </ChatThread>

            {/* Chat Input Input Box */}
            <ChatInput onSendMessage={handleSendMessage} />
          </div>
        ) : (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {/* Direct Approvals List */}
            <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-2">
              <div className="flex items-center justify-between select-none">
                <span className="text-[9px] font-bold text-error bg-error/10 px-1.5 py-0.5 rounded-full uppercase">High Risk</span>
                <span className="text-[10px] text-text-secondary font-light">2m ago</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-[12px] font-bold text-text-primary">auth/session.ts fix</div>
                <div className="text-[11px] text-text-secondary">git push origin master</div>
              </div>
              <div className="flex gap-1.5 pt-1 select-none">
                <button onClick={handleApprove} className="flex-1 py-1 bg-primary-blue hover:bg-primary-blue/90 text-white rounded text-[10px] font-bold cursor-pointer">Approve</button>
                <button onClick={handleReject} className="flex-1 py-1 border border-border hover:bg-background rounded text-[10px] font-semibold text-text-primary cursor-pointer">Reject</button>
              </div>
            </div>
            
            <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-2 opacity-50 select-none">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-text-secondary bg-background px-1.5 py-0.5 rounded-full uppercase">Low Risk</span>
                <span className="text-[10px] text-text-secondary">10m ago</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-[12px] font-bold text-text-primary">CLI docs update</div>
                <div className="text-[11px] text-text-secondary">bun test auth.test.ts</div>
              </div>
              <div className="flex items-center gap-1.5 text-success text-[10px] font-semibold">
                <Check size={12} weight="bold" />
                <span>Auto-Approved</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
