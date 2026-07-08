import React from "react";

interface SidebarSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export default function SidebarSection({ title, action, children }: SidebarSectionProps) {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between px-3 py-1 text-[11px] font-bold text-text-secondary uppercase tracking-wider select-none">
        <span>{title}</span>
        {action}
      </div>
      <div className="space-y-[1px]">{children}</div>
    </div>
  );
}
