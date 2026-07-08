import { useState } from "react";
import { 
  CheckSquare, 
  MagnifyingGlass,
  User,
  Plus,
  GitBranch,
  ChatTeardropText,
  FileCode,
  CheckCircle,
  Circle,
  Warning
} from "@phosphor-icons/react";
import { mockTasks, mockTaskDetail } from "../data/mockData";

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
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Filters</span>
          
          {/* Status Checkboxes */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-text-primary">Status</span>
            <div className="space-y-1">
              {["In Progress", "Queued", "Review", "Done"].map((s) => (
                <label key={s} className="flex items-center gap-2 text-[12px] text-text-secondary cursor-pointer hover:text-text-primary">
                  <input type="checkbox" defaultChecked className="rounded border-border text-primary-blue focus:ring-primary-blue w-3.5 h-3.5" />
                  <span>{s}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-text-primary">Priority</span>
            <div className="space-y-1">
              {["High", "Medium", "Low"].map((p) => (
                <label key={p} className="flex items-center gap-2 text-[12px] text-text-secondary cursor-pointer hover:text-text-primary">
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
        <div className="p-4 border-b border-border bg-surface flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-[14px] font-bold text-text-primary uppercase tracking-wider">Task Board</h2>
            <div className="flex items-center gap-1.5 bg-background border border-border px-2 py-0.5 rounded text-[11px] font-semibold text-text-secondary">
              <span>Total Tasks: 28</span>
            </div>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-primary-blue hover:bg-primary-blue/90 text-white rounded-lg text-[12px] font-bold transition-all shadow-sm">
            <Plus size={14} weight="bold" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Board Columns Grid */}
        <div className="flex-1 overflow-x-auto p-4 flex gap-4 h-full min-h-0 select-none">
          {/* Column In Progress */}
          <div className="w-[240px] flex flex-col shrink-0 h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-primary-blue rounded-full animate-pulse" />
                In Progress
              </span>
              <span className="text-[11px] font-bold text-text-secondary bg-border/40 px-1.5 py-0.2 rounded">3</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {inProgressTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleSelectTask(task.id)}
                  className={`p-3 bg-surface border rounded-xl cursor-pointer hover:shadow-sm transition-all space-y-2.5 ${
                    selectedTaskId === task.id ? "border-primary-blue bg-active-bg/10 shadow-sm" : "border-border"
                  }`}
                >
                  <div className="text-[12.5px] font-bold text-text-primary leading-snug">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-primary-blue uppercase bg-active-bg px-1.5 py-0.5 rounded">herdr</span>
                      <span className="text-error bg-error/10 px-1.5 py-0.5 rounded font-bold">high</span>
                    </div>
                    <span className="capitalize">{task.agent} • {task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Queued */}
          <div className="w-[240px] flex flex-col shrink-0 h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-text-secondary rounded-full" />
                Queued
              </span>
              <span className="text-[11px] font-bold text-text-secondary bg-border/40 px-1.5 py-0.2 rounded">5</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {queuedTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleSelectTask(task.id)}
                  className={`p-3 bg-surface border rounded-xl cursor-pointer hover:shadow-sm transition-all space-y-2.5 ${
                    selectedTaskId === task.id ? "border-primary-blue bg-active-bg/10 shadow-sm" : "border-border"
                  }`}
                >
                  <div className="text-[12.5px] font-bold text-text-primary leading-snug">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-text-secondary bg-background px-1.5 py-0.5 rounded">herdr</span>
                      <span className="bg-background px-1.5 py-0.5 rounded">low</span>
                    </div>
                    <span className="capitalize">{task.agent}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Review */}
          <div className="w-[240px] flex flex-col shrink-0 h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-warning uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-warning rounded-full" />
                Review
              </span>
              <span className="text-[11px] font-bold text-text-secondary bg-border/40 px-1.5 py-0.2 rounded">2</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {reviewTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleSelectTask(task.id)}
                  className={`p-3 bg-surface border rounded-xl cursor-pointer hover:shadow-sm transition-all space-y-2.5 ${
                    selectedTaskId === task.id ? "border-primary-blue bg-active-bg/10 shadow-sm" : "border-border"
                  }`}
                >
                  <div className="text-[12.5px] font-bold text-text-primary leading-snug">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-text-secondary bg-background px-1.5 py-0.5 rounded">herdr</span>
                      <span className="bg-background px-1.5 py-0.5 rounded">medium</span>
                    </div>
                    <span className="capitalize">{task.agent} • {task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column Done */}
          <div className="w-[240px] flex flex-col shrink-0 h-full">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-success uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
                Done
              </span>
              <span className="text-[11px] font-bold text-text-secondary bg-border/40 px-1.5 py-0.2 rounded">18</span>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 min-h-0">
              {doneTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleSelectTask(task.id)}
                  className={`p-3 bg-surface border rounded-xl cursor-pointer hover:bg-background transition-all space-y-2.5 opacity-65 ${
                    selectedTaskId === task.id ? "border-primary-blue shadow-sm bg-active-bg/5" : "border-border"
                  }`}
                >
                  <div className="text-[12.5px] font-bold text-text-primary leading-snug line-through">{task.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-text-secondary bg-background px-1.5 py-0.5 rounded">herdr</span>
                    </div>
                    <span className="capitalize">{task.agent} • {task.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Column 3: Task Details */}
      <div className="w-[320px] border-l border-border bg-surface flex flex-col h-full shrink-0">
        {/* Detail Header */}
        <div className="p-4 border-b border-border bg-background/15 select-none">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold bg-primary-blue/15 text-primary-blue px-2 py-0.5 rounded-full uppercase tracking-wider">
              {selectedTask.status}
            </span>
            <span className="text-[11px] text-text-secondary font-medium">Created 2h ago</span>
          </div>
          <h2 className="text-[14px] font-bold text-text-primary mt-2 leading-snug">{selectedTask.title}</h2>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            <span className="text-[10px] font-semibold text-primary-blue bg-active-bg px-2 py-0.5 rounded">#herdr</span>
            <span className="text-[10px] font-semibold text-error bg-error/10 px-2 py-0.5 rounded">#high</span>
            <span className="text-[10px] font-semibold text-text-secondary bg-background px-2 py-0.5 rounded">#{selectedTask.agent}</span>
            <span className="text-[10px] font-mono text-text-secondary bg-background border border-border px-1.5 rounded">{selectedTask.id}</span>
          </div>
        </div>

        {/* Objective & Steps Checklist */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Objective */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Objective</span>
            <p className="text-[12.5px] text-text-primary leading-relaxed bg-background p-3 rounded-xl border border-border">
              {mockTaskDetail.objective}
            </p>
          </div>

          {/* Steps Checklist */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Steps Checklist</span>
            <div className="space-y-1.5">
              {mockTaskDetail.steps.map((step, i) => (
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
              <span className="text-[10px] text-text-secondary uppercase tracking-wider">Agent</span>
              <div className="flex items-center justify-between bg-background border border-border rounded-lg p-2">
                <span className="text-[12px] font-bold text-text-primary capitalize">{selectedTask.agent}</span>
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-text-secondary uppercase tracking-wider">Workspace</span>
              <div className="flex items-center justify-between bg-background border border-border rounded-lg p-2">
                <span className="text-[12px] font-bold text-text-primary font-mono truncate">{mockTaskDetail.workspace.name}</span>
                <GitBranch size={12} className="text-primary-blue" />
              </div>
            </div>
          </div>

          {/* Comments section */}
          <div className="space-y-2 border-t border-border pt-3">
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
              <ChatTeardropText size={13} />
              <span>Agent Comments</span>
            </span>
            <div className="space-y-3">
              {mockTaskDetail.comments.map((comment, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
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
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1">
              <FileCode size={13} />
              <span>Related Files</span>
            </span>
            <div className="space-y-1.5">
              {mockTaskDetail.relatedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between text-[12px] border border-border rounded-lg p-2 bg-surface hover:bg-background transition-all">
                  <div className="truncate pr-2">
                    <div className="font-bold text-text-primary truncate">{file.name}</div>
                    <div className="text-[10px] text-text-secondary truncate">{file.path}</div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 font-mono text-[10.5px] font-bold">
                    <span className="text-success">+{file.additions}</span>
                    {file.deletions < 0 && <span className="text-error">{file.deletions}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
