import React from "react";

export interface ChatMessage {
  sender: string;
  time: string;
  text: string;
}

interface ChatThreadProps {
  messages: ChatMessage[];
  children?: React.ReactNode; // For appending interactive approvals
}

export default function ChatThread({ messages, children }: ChatThreadProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
      {messages.map((msg, i) => (
        <div key={i} className="flex flex-col space-y-0.5">
          <div className="flex items-center justify-between text-[10px] text-text-secondary select-none">
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
      {children}
    </div>
  );
}
