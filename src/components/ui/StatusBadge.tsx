interface StatusBadgeProps {
  status: 'active' | 'running' | 'idle' | 'blocked' | 'offline' | 'busy' | 'completed' | 'failed' | 'needs_approval' | 'done' | 'Queued' | 'Review' | 'In Progress';
  pulse?: boolean;
}

export default function StatusBadge({ status, pulse = false }: StatusBadgeProps) {
  const getColors = () => {
    switch (status) {
      case 'active':
      case 'running':
      case 'completed':
      case 'done':
      case 'In Progress':
        return { bg: 'bg-success/10', text: 'text-success', dot: 'bg-success' };
      case 'idle':
      case 'Review':
      case 'Queued':
        return { bg: 'bg-warning/10', text: 'text-warning', dot: 'bg-warning' };
      case 'blocked':
      case 'failed':
      case 'offline':
      case 'busy':
        return { bg: 'bg-error/10', text: 'text-error', dot: 'bg-error' };
      default:
        return { bg: 'bg-background', text: 'text-text-secondary', dot: 'bg-text-secondary' };
    }
  };

  const colors = getColors();

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} ${pulse ? 'animate-pulse' : ''}`} />
      <span>{status}</span>
    </span>
  );
}
