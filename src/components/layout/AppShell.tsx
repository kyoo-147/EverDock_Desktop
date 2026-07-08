import React from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background font-sans select-none">
      {/* Sidebar (Fixed left) */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Toolbar (Fixed top) */}
        <Toolbar />

        {/* Dynamic Page Content */}
        <main className="flex-1 min-h-0 min-w-0 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
}
