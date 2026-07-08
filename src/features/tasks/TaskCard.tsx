import { Task } from "../../types/task";

interface TaskCardProps {
  task: Task;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function TaskCard({ task, isSelected = false, onClick }: TaskCardProps) {
  const getPriorityColor = () => {
    const hasHigh = task.tags.includes('high');
    const hasMedium = task.tags.includes('medium');
    if (hasHigh) return 'text-error bg-error/10 font-bold';
    if (hasMedium) return 'text-warning bg-warning/10 font-bold';
    return 'text-text-secondary bg-background font-medium';
  };

  return (
    <div
      onClick={onClick}
      className={`p-3 bg-surface border rounded-xl cursor-pointer hover:shadow-sm transition-all space-y-2.5 ${
        isSelected 
          ? "border-primary-blue bg-active-bg/10 shadow-sm font-semibold" 
          : "border-border"
      } ${task.status === "Done" ? "opacity-65" : ""}`}
    >
      <div className={`text-[12.5px] text-text-primary leading-snug ${
        task.status === "Done" ? "line-through text-text-secondary" : "font-semibold"
      }`}>
        {task.title}
      </div>
      <div className="flex items-center justify-between text-[10px] text-text-secondary select-none">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-primary-blue uppercase bg-active-bg px-1.5 py-0.5 rounded">
            herdr
          </span>
          {task.status !== "Done" && (
            <span className={`px-1.5 py-0.5 rounded uppercase ${getPriorityColor()}`}>
              {task.tags.includes('high') ? 'high' : task.tags.includes('medium') ? 'medium' : 'low'}
            </span>
          )}
        </div>
        <span className="capitalize">
          {task.agent} {task.time ? `• ${task.time}` : ''}
        </span>
      </div>
    </div>
  );
}
