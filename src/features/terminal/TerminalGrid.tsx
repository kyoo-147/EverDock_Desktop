import TerminalPane from "./TerminalPane";
import { MCConsolePane } from "./terminal.types";

interface TerminalGridProps {
  panes: MCConsolePane[];
  onClosePane?: (id: string) => void;
}

export default function TerminalGrid({ panes, onClosePane }: TerminalGridProps) {
  if (panes.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-text-secondary select-none">
        <span className="text-[13px] font-medium">No active terminal sessions.</span>
        <span className="text-[11px] mt-1">Click "+ Add Terminal" to create one.</span>
      </div>
    );
  }

  // Calculate layout classes based on number of active panes
  const getGridClasses = () => {
    const count = panes.length;
    if (count === 1) return "grid-cols-1 grid-rows-1";
    if (count === 2) return "grid-cols-2 grid-rows-1";
    if (count <= 4) return "grid-cols-2 grid-rows-2";
    return "grid-cols-3 grid-rows-2";
  };

  return (
    <div className={`flex-1 grid ${getGridClasses()} gap-2 p-2 bg-background overflow-hidden min-h-0 min-w-0`}>
      {panes.map((pane) => (
        <TerminalPane
          key={pane.id}
          id={pane.id}
          title={pane.title}
          server={pane.server}
          shell={pane.shell}
          agent={pane.agent}
          logs={pane.logs}
          onClose={() => onClosePane && onClosePane(pane.id)}
        />
      ))}
    </div>
  );
}
