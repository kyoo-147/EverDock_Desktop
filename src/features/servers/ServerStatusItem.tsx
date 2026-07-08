import { WorkspaceServer } from "../../types/workspace";

interface ServerStatusItemProps {
  server: WorkspaceServer;
}

export default function ServerStatusItem({ server }: ServerStatusItemProps) {
  return (
    <div className="border border-border rounded-xl p-3 bg-surface hover:shadow-sm transition-all space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] font-bold text-text-primary">{server.name}</span>
        <span className={`text-[9.5px] border rounded px-1 py-0.2 uppercase font-bold select-none ${
          server.status === 'online' 
            ? 'bg-success/10 text-success border-success/20' 
            : 'bg-error/10 text-error border-error/20'
        }`}>
          {server.latency}
        </span>
      </div>
      <div className="flex items-center justify-between text-[11px] text-text-secondary font-mono select-none">
        <span>{server.ip}</span>
        <span className="uppercase">{server.type}</span>
      </div>
    </div>
  );
}
