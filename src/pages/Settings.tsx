import { Gear, User, Shield, Key, Bell } from "@phosphor-icons/react";

export default function Settings() {
  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6 font-sans bg-background">
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-[20px] font-bold text-text-primary">Settings</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">Manage application preferences, keys, and security controls.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left list options */}
        <div className="col-span-1 border border-border bg-surface rounded-2xl p-2 h-fit space-y-[2px] select-none">
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-bold bg-active-bg text-primary-blue text-left">
            <User size={16} weight="fill" />
            <span>Profile & Account</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary text-left">
            <Gear size={16} />
            <span>General Preferences</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary text-left">
            <Shield size={16} />
            <span>Security & Approvals</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary text-left">
            <Key size={16} />
            <span>Secrets & API Keys</span>
          </button>
          <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-text-secondary hover:bg-background hover:text-text-primary text-left">
            <Bell size={16} />
            <span>Notifications</span>
          </button>
        </div>

        {/* Right detailed forms */}
        <div className="col-span-2 space-y-4">
          <div className="bg-surface border border-border rounded-2xl p-5 space-y-4">
            <h3 className="text-[14px] font-bold text-text-primary pb-2 border-b border-border">Account Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase">Full Name</label>
                <input type="text" defaultValue="Alex K." className="w-full bg-background border border-border focus:border-primary-blue focus:outline-none rounded-lg px-3 py-1.5 text-[12.5px] font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-text-secondary uppercase">Email Address</label>
                <input type="email" defaultValue="alex@everdock.dev" className="w-full bg-background border border-border focus:border-primary-blue focus:outline-none rounded-lg px-3 py-1.5 text-[12.5px] font-medium" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-text-secondary uppercase">Active Role</label>
              <div className="bg-background border border-border p-3 rounded-lg text-[12.5px] text-text-primary font-semibold">
                Workspace Admin • Developer
              </div>
            </div>
            
            <div className="flex justify-end select-none">
              <button className="px-4 py-1.5 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
                Save Account Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
