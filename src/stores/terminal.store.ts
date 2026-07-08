import { create } from "zustand";
import { MCConsolePane } from "../features/terminal/terminal.types";
import { ChatMessage } from "../features/chat/ChatThread";
import { mockMCConsoles } from "../mocks/terminal.mock";

interface TerminalState {
  activeTab: string;
  panes: MCConsolePane[];
  chatMessages: ChatMessage[];
  showApproval: boolean;
  setActiveTab: (tab: string) => void;
  setPanes: (panes: MCConsolePane[] | ((prev: MCConsolePane[]) => MCConsolePane[])) => void;
  setChatMessages: (messages: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => void;
  setShowApproval: (show: boolean) => void;
  addMessage: (msg: ChatMessage) => void;
  closePane: (id: string) => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  activeTab: "all",
  panes: mockMCConsoles,
  chatMessages: [
    { sender: "System", time: "10:15 AM", text: "Session started. Codex and Claude initialized." },
    { sender: "Claude", time: "10:16 AM", text: "I have analyzed the codebase. The login route lacks validation." },
    { sender: "User", time: "10:20 AM", text: "Go ahead and fix it." },
    { sender: "Claude", time: "10:24 AM", text: "Ready to implement redirect middleware. Requires high-risk write permission." }
  ],
  showApproval: true,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setPanes: (newPanes) => set((state) => ({
    panes: typeof newPanes === "function" ? newPanes(state.panes) : newPanes
  })),

  setChatMessages: (newMessages) => set((state) => ({
    chatMessages: typeof newMessages === "function" ? newMessages(state.chatMessages) : newMessages
  })),

  setShowApproval: (show) => set({ showApproval: show }),

  addMessage: (msg) => set((state) => ({
    chatMessages: [...state.chatMessages, msg]
  })),

  closePane: (id) => set((state) => ({
    panes: state.panes.filter((p) => p.id !== id)
  }))
}));
