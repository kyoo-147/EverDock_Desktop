import { useState } from "react";
import { 
  CheckSquare, 
  MagnifyingGlass,
  User,
  Plus,
  Warning
} from "@phosphor-icons/react";
import TaskColumn from "../features/tasks/TaskColumn";
import TaskDetailPanel from "../features/tasks/TaskDetailPanel";
import { mockTasks, mockTaskDetail } from "../mocks/task.mock";

export default function Tasks() {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("TASK-1024");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelectTask = (id: string) => {
    setSelectedTaskId(id);
  };

  const selectedTask = mockTasks.find(t => t.id === selectedTaskId) || mockTasks[0];

  const inProgressTasks = mockTasks.filter(t => t.status === "In Progress");
  const queuedTasks = mockTasks.filter(t => t.status === "Queued");
  const reviewTasks = mockTasks.filter(t => t.status === "Review");
  const doneTasks = mockTasks.filter(t => t.status === "Done");

  return (
    <div className="w-full h-full flex font-sans bg-background">
      {/* Column 1: Filters sidebar */}
      <div className="w-[220px] border-r border-border bg-surface flex flex-col h-full shrink-0 p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-background border border-border focus:border-primary-blue focus:outline-none rounded-lg pl-8 pr-3 py-1.5 text-[12px] font-medium"
          />
          <MagnifyingGlass size={14} className="absolute left-2.5 top-2.5 text-text-secondary" />
        </div>

        {/* Task Groups */}
        <div className="space-y-[1px] select-none">
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-semibold bg-active-bg text-primary-blue">
            <span className="flex items-center gap-2">
              <CheckSquare size={15} weight="fill" />
              All Tasks
            </span>
            <span className="text-[10px] font-bold">12</span>
          </button>
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium text-text-secondary hover:bg-background hover:text-text-primary">
            <span className="flex items-center gap-2">
              <User size={15} />
              My Tasks
            </span>
            <span className="text-[10px]">3</span>
          </button>
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium text-text-secondary hover:bg-background hover:text-text-primary">
            <span className="flex items-center gap-2 text-text-secondary">@</span>
            <span>Mentioned</span>
          </button>
          <button className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium text-text-secondary hover:bg-background hover:text-text-primary">
            <span className="flex items-center gap-2">
              <Warning size={15} />
              Needs Review
            </span>
            <span className="text-[10px] text-error font-bold">2</span>
          </button>
        </div>

        {/* Filter Attributes */}
        <div className="space-y-3 pt-3 border-t border-border">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block">Filters</span>
          
          {/* Status Checkboxes */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-text-primary">Status</span>
            <div className="space-y-1 text-[12px] text-text-secondary">
              {["In Progress", "Queued", "Review", "Done"].map((s) => (
                <label key={s} className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                  <input type="checkbox" defaultChecked className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-text-primary">Priority</span>
            <div className="space-y-1 text-[12px] text-text-secondary">
              {["High", "Medium", "Low"].map((p) => (
                <label key={p} className="flex items-center gap-2 cursor-pointer hover:text-text-primary">
                  <input type="checkbox" defaultChecked className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                  <span>{p}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Column 2: Kanban Task Board */}
      <div className="flex-1 flex flex-col min-w-0 border-r border-border h-full bg-background">
        {/* Top Board Toolbar */}
        <div className="p-4 border-b border-border bg-surface flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-4">
            <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Task Board</h2>
            <div className="flex items-center gap-1.5 bg-background border border-border px-2 py-0.5 rounded text-[11px] font-semibold text-text-secondary">
              <span>Total Tasks: 28</span>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg text-[12px] font-bold transition-all shadow-sm cursor-pointer">
            <Plus size={14} weight="bold" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Board Columns Grid */}
        <div className="flex-1 overflow-x-auto p-4 flex gap-4 h-full min-h-0 select-none">
          <TaskColumn
            title="In Progress"
            tasks={inProgressTasks}
            statusColor="bg-primary-blue"
            selectedTaskId={selectedTaskId}
            onSelectTask={handleSelectTask}
            pulse={true}
          />
          <TaskColumn
            title="Queued"
            tasks={queuedTasks}
            statusColor="bg-text-secondary"
            selectedTaskId={selectedTaskId}
            onSelectTask={handleSelectTask}
          />
          <TaskColumn
            title="Review"
            tasks={reviewTasks}
            statusColor="bg-warning"
            selectedTaskId={selectedTaskId}
            onSelectTask={handleSelectTask}
          />
          <TaskColumn
            title="Done"
            tasks={doneTasks}
            statusColor="bg-success"
            selectedTaskId={selectedTaskId}
            onSelectTask={handleSelectTask}
          />
        </div>
      </div>

      {/* Column 3: Task Details */}
      <TaskDetailPanel task={selectedTask} detail={mockTaskDetail} />
    </div>
  );
}
