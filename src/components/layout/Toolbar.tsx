import { 
  GitBranch, 
  UserPlus, 
  Gear, 
  CaretDown
} from "@phosphor-icons/react";

export default function Toolbar() {
  return (
    <header className="h-[48px] bg-surface border-b border-border px-4 flex items-center justify-between font-sans shrink-0">
      {/* Breadcrumb Path & Git Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[13px] text-text-secondary font-medium">
          <span className="font-mono">~/Projects/herdr</span>
          <span>&gt;</span>
          <span className="text-text-primary font-semibold">herdr</span>
        </div>
        
        {/* Git Branch Selector */}
        <div className="flex items-center gap-1 bg-background hover:bg-active-bg px-2 py-1 rounded border border-border cursor-pointer select-none transition-colors">
          <GitBranch size={13} className="text-primary-blue" />
          <span className="text-[12px] font-medium text-text-primary">master</span>
          <CaretDown size={10} className="text-text-secondary" />
        </div>
      </div>

      {/* Toolbar Right Controls */}
      <div className="flex items-center gap-4">
        {/* Synced Status */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success"></span>
          </span>
          <span className="text-[12px] font-medium text-text-secondary">Synced</span>
        </div>

        {/* Invite CTA */}
        <button className="flex items-center gap-1.5 px-3 py-1 bg-surface hover:bg-background border border-border rounded-lg text-[12px] font-semibold text-text-primary transition-all shadow-sm">
          <UserPlus size={14} className="text-text-secondary" />
          <span>Invite</span>
        </button>

        {/* Quick Settings Gear */}
        <button className="text-text-secondary hover:text-text-primary transition-colors">
          <Gear size={18} />
        </button>

        {/* User Profile Avatar */}
        <div className="w-7 h-7 rounded-full bg-background border border-border flex items-center justify-center font-bold text-[11px] text-text-primary cursor-pointer hover:border-text-secondary transition-all">
          AK
        </div>
      </div>
    </header>
  );
}
