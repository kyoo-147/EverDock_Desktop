import { useState } from "react";
import { 
  Pause, 
  TerminalWindow, 
  X, 
  Plus, 
  PaperPlaneTilt,
  ChatTeardropText,
  ShieldCheck,
  Check,
  Warning,
  Gear
} from "@phosphor-icons/react";
import { mockMCConsoles } from "../data/mockData";

export default function TerminalWorkspace() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [inputMessage, setInputMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState([
    { sender: "System", time: "10:15 AM", text: "Session started. Codex and Claude initialized." },
    { sender: "Claude", time: "10:16 AM", text: "I have analyzed the codebase. The login route lacks validation." },
    { sender: "User", time: "10:20 AM", text: "Go ahead and fix it." },
    { sender: "Claude", time: "10:24 AM", text: "Ready to implement redirect middleware. Requires high-risk write permission." }
  ]);
  const [showApproval, setShowApproval] = useState(true);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      { sender: "User", time: "Just now", text: inputMessage }
    ]);
    setInputMessage("");
  };

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Center Area: Terminal Grid */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border h-full">
        {/* Terminal Header Toolbar */}
        <div className="h-10 border-b border-border px-4 flex items-center justify-between bg-surface">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-text-primary uppercase tracking-wider">Terminal Grid</span>
            <span className="text-[10px] text-success font-medium bg-success/10 px-1.5 py-0.2 rounded-full">4 Panes Running</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text-primary border border-border rounded px-2 py-0.5 bg-surface transition-all">
              <Plus size={12} weight="bold" />
              <span>Add Terminal</span>
            </button>
            <button className="flex items-center gap-1 text-[11px] font-semibold text-text-secondary hover:text-text-primary border border-border rounded px-2 py-0.5 bg-surface transition-all">
              <Gear size={12} />
              <span>Grid Layout</span>
            </button>
          </div>
        </div>

        {/* 2x2 Grid of Terminal Panes */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-[1px] bg-border p-[1px] overflow-hidden">
          {mockMCConsoles.map((pane) => (
            <div key={pane.id} className="bg-[#071126] flex flex-col h-full overflow-hidden text-[#E2E8F0] font-mono text-[12px]">
              {/* Pane Header */}
              <div className="h-8 bg-[#0F1D36] border-b border-[#1E293B] px-3 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <TerminalWindow size={14} className="text-[#38BDF8]" />
                  <span className="font-semibold text-[11px] text-white">{pane.title}</span>
                  <span className="text-[9px] text-[#94A3B8] bg-[#1E293B] px-1.5 py-0.2 rounded font-sans uppercase">
                    {pane.server} • {pane.shell}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] text-[#38BDF8] font-sans font-light">
                    Agent: <strong className="font-semibold">{pane.agent}</strong>
                  </span>
                  <button className="text-[#94A3B8] hover:text-white transition-colors">
                    <Pause size={12} />
                  </button>
                  <button className="text-[#94A3B8] hover:text-white transition-colors">
                    <X size={12} />
                  </button>
                </div>
              </div>

              {/* Pane Logs / Shell Output */}
              <div className="flex-1 p-3 overflow-y-auto space-y-1 scrollbar-thin">
                {pane.logs.map((log, index) => {
                  let logClass = "text-[#E2E8F0]";
                  if (log.startsWith("$") || log.startsWith(">") || log.startsWith("herdr")) {
                    logClass = "text-[#38BDF8]";
                  } else if (log.includes("compiled") || log.includes("Ready") || log.includes("COUNT")) {
                    logClass = "text-[#34D399]";
                  } else if (log.includes("ERROR") || log.includes("Invalid")) {
                    logClass = "text-[#F87171]";
                  } else if (log.includes("WARN")) {
                    logClass = "text-[#FBBF24]";
                  } else if (log.includes("INFO")) {
                    logClass = "text-[#94A3B8]";
                  }
                  return (
                    <div key={index} className={`${logClass} whitespace-pre-wrap leading-relaxed`}>
                      {log}
                    </div>
                  );
                })}
                {/* Fake Terminal Prompt */}
                <div className="flex items-center gap-1 text-[#38BDF8]">
                  <span>$</span>
                  <span className="w-1.5 h-3.5 bg-white animate-pulse"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side Panel: Agent Chat & Approvals */}
      <div className="w-[320px] bg-surface flex flex-col h-full shrink-0">
        {/* Panel Tabs */}
        <div className="h-10 border-b border-border flex items-center px-2 bg-background/30 gap-1 select-none">
          <button 
            onClick={() => setActiveTab("all")}
            className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold transition-colors ${
              activeTab === "all" ? "bg-surface text-primary-blue shadow-sm border border-border" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <ChatTeardropText size={14} />
            <span>Agent Chat</span>
          </button>
          <button 
            onClick={() => setActiveTab("approvals")}
            className={`flex items-center gap-1.5 px-3 h-7 rounded-md text-[12px] font-semibold relative transition-colors ${
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
            {/* Chat Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
              {chatMessages.map((msg, i) => (
                <div key={i} className="flex flex-col space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <span className={`font-bold ${
                      msg.sender === "Claude" ? "text-primary-blue" :
                      msg.sender === "System" ? "text-success font-medium" : "text-text-primary"
                    }`}>{msg.sender}</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className={`p-2.5 rounded-lg text-[12.5px] border ${
                    msg.sender === "Claude" ? "bg-active-bg/30 text-text-primary border-border" :
                    msg.sender === "System" ? "bg-background text-text-secondary border-dashed border-border" :
                    "bg-surface text-text-primary border-border font-medium"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Interactive Live Approval Request inside Chat */}
              {showApproval && (
                <div className="border border-warning bg-warning/5 rounded-xl p-3 space-y-2 mt-4">
                  <div className="flex items-center gap-1.5 text-warning font-semibold text-[11px] uppercase tracking-wider">
                    <Warning size={14} weight="fill" />
                    <span>Approval Required</span>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[12px] font-bold text-text-primary">
                      Write permission for middleware/auth.ts
                    </div>
                    <div className="text-[11px] text-text-secondary leading-relaxed">
                      Claude requested to replace lines 12-45 with optimized redirect middleware.
                    </div>
                  </div>
                  <div className="flex items-center gap-2 pt-1.5">
                    <button 
                      onClick={() => {
                        setShowApproval(false);
                        setChatMessages([
                          ...chatMessages,
                          { sender: "System", time: "Just now", text: "✓ Write permission approved by user." }
                        ]);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1 bg-success hover:bg-success/90 text-white rounded text-[11px] font-bold shadow-sm transition-all"
                    >
                      <Check size={12} weight="bold" />
                      <span>Approve</span>
                    </button>
                    <button 
                      onClick={() => {
                        setShowApproval(false);
                        setChatMessages([
                          ...chatMessages,
                          { sender: "System", time: "Just now", text: "✗ Write permission rejected by user." }
                        ]);
                      }}
                      className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1 bg-error hover:bg-error/90 text-white rounded text-[11px] font-bold shadow-sm transition-all"
                    >
                      <X size={12} weight="bold" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Input Input Box */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border bg-background/50 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type command or instruction..."
                className="flex-1 bg-surface border border-border focus:border-primary-blue focus:outline-none rounded-lg px-3 py-1.5 text-[12px]"
              />
              <button 
                type="submit"
                className="w-8 h-8 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg flex items-center justify-center transition-all shrink-0"
              >
                <PaperPlaneTilt size={16} weight="fill" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {/* Direct Approvals List */}
            <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-error bg-error/10 px-1.5 py-0.5 rounded-full uppercase">High Risk</span>
                <span className="text-[10px] text-text-secondary">2m ago</span>
              </div>
              <div className="space-y-0.5">
                <div className="text-[12px] font-bold text-text-primary">auth/session.ts fix</div>
                <div className="text-[11px] text-text-secondary">git push origin master</div>
              </div>
              <div className="flex gap-1.5 pt-1">
                <button className="flex-1 py-1 bg-primary-blue hover:bg-primary-blue/90 text-white rounded text-[10px] font-bold">Approve</button>
                <button className="flex-1 py-1 border border-border hover:bg-background rounded text-[10px] font-semibold text-text-primary">Reject</button>
              </div>
            </div>
            
            <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-2 opacity-50">
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
