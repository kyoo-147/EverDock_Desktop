import TaskCard from "./TaskCard";
import { Task } from "../../types/task";

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  statusColor: string;
  selectedTaskId: string;
  onSelectTask: (id: string) => void;
  pulse?: boolean;
}

export default function TaskColumn({
  title,
  tasks,
  statusColor,
  selectedTaskId,
  onSelectTask,
  pulse = false
}: TaskColumnProps) {
  return (
    <div className="w-[240px] flex flex-col shrink-0 h-full min-h-0">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-2 select-none">
        <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColor} ${pulse ? "animate-pulse" : ""}`} />
          {title}
        </span>
        <span className="text-[11px] font-bold text-text-secondary bg-border/40 px-1.5 py-0.2 rounded">
          {tasks.length}
        </span>
      </div>

      {/* Task List container */}
      <div className="flex-1 overflow-y-auto space-y-2 min-h-0 scrollbar-thin">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isSelected={selectedTaskId === task.id}
            onClick={() => onSelectTask(task.id)}
          />
        ))}
        {tasks.length === 0 && (
          <div className="border border-dashed border-border rounded-xl p-4 text-center text-[11px] text-text-secondary">
            No tasks in this lane
          </div>
        )}
      </div>
    </div>
  );
}
