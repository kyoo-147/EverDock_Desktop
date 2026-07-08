import { Plus, CheckCircle } from "@phosphor-icons/react";

export default function Integrations() {
  const integrations = [
    { name: "GitHub", description: "Connect repositories, sync branches, pull requests, and commit histories.", connected: true, status: "Connected", icon: "GH" },
    { name: "Telegram Bot", description: "Receive instant progress updates, screenshots, and authorize high-risk actions from your phone.", connected: true, status: "Connected", icon: "TG" },
    { name: "Slack", description: "Send status notifications and authorization prompts to Slack channels.", connected: false, status: "Not Connected", icon: "SL" },
    { name: "Docker", description: "Manage agent containers, sandboxes, and development build testing environments.", connected: false, status: "Not Connected", icon: "DK" },
    { name: "Vercel", description: "Deploy app preview instances directly from agent sessions.", connected: false, status: "Not Connected", icon: "VC" }
  ];

  return (
    <div className="w-full h-full overflow-y-auto p-6 space-y-6 font-sans bg-background">
      <div className="flex items-center justify-between select-none">
        <div>
          <h1 className="text-[20px] font-bold text-text-primary">Integrations</h1>
          <p className="text-[12px] text-text-secondary mt-0.5">Connect external platforms and developer productivity tool suites.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {integrations.map((item) => (
          <div key={item.name} className="bg-surface border border-border rounded-2xl p-4 hover:shadow-sm transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center font-bold text-text-primary text-[13px] select-none">
                    {item.icon}
                  </div>
                  <h3 className="text-[14px] font-bold text-text-primary">{item.name}</h3>
                </div>
                
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  item.connected ? "text-success bg-success/15" : "text-text-secondary bg-background border border-border"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-[12px] text-text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60 select-none">
              {item.connected ? (
                <>
                  <span className="text-[11px] text-success font-semibold flex items-center gap-1">
                    <CheckCircle size={14} weight="bold" />
                    Active connection
                  </span>
                  <button className="text-[11px] text-text-secondary hover:text-text-primary font-semibold hover:underline">
                    Disconnect
                  </button>
                </>
              ) : (
                <button className="flex items-center gap-1 px-3 py-1 bg-primary-blue hover:bg-primary-blue-hover text-white rounded-lg text-[11px] font-bold shadow-sm transition-all ml-auto">
                  <Plus size={12} weight="bold" />
                  Connect Platform
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
