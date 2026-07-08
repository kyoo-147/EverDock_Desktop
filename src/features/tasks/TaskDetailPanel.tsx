import { 
  GitBranch, 
  ChatTeardropText, 
  FileCode, 
  CheckCircle, 
  Circle
} from "@phosphor-icons/react";
import { Task, TaskDetail } from "../../types/task";

interface TaskDetailPanelProps {
  task: Task;
  detail: TaskDetail;
}

export default function TaskDetailPanel({ task, detail }: TaskDetailPanelProps) {
  return (
    <div className="w-[320px] border-l border-border bg-surface flex flex-col h-full shrink-0">
      {/* Detail Header */}
      <div className="p-4 border-b border-border bg-background/15 select-none">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold bg-primary-blue/15 text-primary-blue px-2 py-0.5 rounded-full uppercase tracking-wider">
            {task.status}
          </span>
          <span className="text-[11px] text-text-secondary font-medium">{detail.created}</span>
        </div>
        <h2 className="text-[14px] font-bold text-text-primary mt-2 leading-snug">{task.title}</h2>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          <span className="text-[10px] font-semibold text-primary-blue bg-active-bg px-2 py-0.5 rounded">#herdr</span>
          <span className="text-[10px] font-semibold text-error bg-error/10 px-2 py-0.5 rounded">#high</span>
          <span className="text-[10px] font-semibold text-text-secondary bg-background px-2 py-0.5 rounded">#{task.agent}</span>
          <span className="text-[10px] font-mono text-text-secondary bg-background border border-border px-1.5 rounded">{task.id}</span>
        </div>
      </div>

      {/* Objective & Steps Checklist */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        {/* Objective */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Objective</span>
          <p className="text-[12.5px] text-text-primary leading-relaxed bg-background p-3 rounded-xl border border-border">
            {detail.objective}
          </p>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider select-none">Steps Checklist</span>
          <div className="space-y-1.5">
            {detail.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-2 text-[12.5px] text-text-primary leading-none">
                {step.done ? (
                  <CheckCircle size={16} weight="fill" className="text-success mt-0.5 shrink-0" />
                ) : (
                  <Circle size={16} className="text-text-secondary mt-0.5 shrink-0" />
                )}
                <span className={`${step.done ? "line-through text-text-secondary" : "font-medium"}`}>
                  {step.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Agent & Workspace */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider select-none">Agent</span>
            <div className="flex items-center justify-between bg-background border border-border rounded-lg p-2">
              <span className="text-[12px] font-bold text-text-primary capitalize">{task.agent}</span>
              <span className="w-1.5 h-1.5 bg-success rounded-full" />
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-text-secondary uppercase tracking-wider select-none">Workspace</span>
            <div className="flex items-center justify-between bg-background border border-border rounded-lg p-2">
              <span className="text-[12px] font-bold text-text-primary font-mono truncate">{detail.workspace.name}</span>
              <GitBranch size={12} className="text-primary-blue" />
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="space-y-2 border-t border-border pt-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1 select-none">
            <ChatTeardropText size={13} />
            <span>Agent Comments</span>
          </span>
          <div className="space-y-3">
            {detail.comments.map((comment, i) => (
              <div key={i} className="space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-text-secondary select-none">
                  <span className="font-bold text-text-primary capitalize">{comment.author}</span>
                  <span>{comment.time}</span>
                </div>
                <p className="text-[12px] bg-background border border-border rounded-lg p-2.5 leading-relaxed text-text-primary">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Files */}
        <div className="space-y-2 border-t border-border pt-3">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1 select-none">
            <FileCode size={13} />
            <span>Related Files</span>
          </span>
          <div className="space-y-1.5">
            {detail.relatedFiles.map((file, i) => (
              <div key={i} className="flex items-center justify-between text-[12px] border border-border rounded-lg p-2 bg-surface hover:bg-background transition-all">
                <div className="truncate pr-2">
                  <div className="font-bold text-text-primary truncate">{file.name}</div>
                  <div className="text-[10px] text-text-secondary truncate">{file.path}</div>
                </div>
                <div className="flex items-center gap-1 shrink-0 font-mono text-[10.5px] font-bold select-none">
                  <span className="text-success">+{file.additions}</span>
                  {file.deletions < 0 && <span className="text-error">{file.deletions}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
