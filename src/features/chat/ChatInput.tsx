import React, { useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  placeholder?: string;
}

export default function ChatInput({ onSendMessage, placeholder = "Type command or instruction..." }: ChatInputProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/50 flex gap-2 shrink-0">
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-surface border border-border focus:border-primary-blue focus:outline-none rounded-lg px-3 py-1.5 text-[12px]"
      />
      <button 
        type="submit"
        className="w-8 h-8 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg flex items-center justify-center transition-all shrink-0 cursor-pointer"
      >
        <PaperPlaneTilt size={16} weight="fill" />
      </button>
    </form>
  );
}
