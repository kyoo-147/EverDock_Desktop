import { WorkspaceRepository } from "../../types/workspace";

interface WorkspaceCardProps {
  repository: WorkspaceRepository;
}

export default function WorkspaceCard({ repository }: WorkspaceCardProps) {
  return (
    <div className="border border-border rounded-xl p-3.5 bg-surface hover:shadow-sm transition-all space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-background border border-border rounded-lg flex items-center justify-center font-bold text-text-primary text-[11.5px] select-none">
            H
          </div>
          <div>
            <div className="text-[13px] font-bold text-text-primary">{repository.name}</div>
            <div className="text-[10px] text-text-secondary font-mono select-none">{repository.commit} • {repository.updated}</div>
          </div>
        </div>
        <div className="text-[10px] text-text-secondary font-bold font-mono bg-background border border-border px-1.5 rounded select-none">
          Ahead {repository.ahead}
        </div>
      </div>
      <p className="text-[12px] text-text-primary font-medium italic">
        "{repository.message}"
      </p>
    </div>
  );
}
