import { Check, X, Warning } from "@phosphor-icons/react";
import { ApprovalRiskLevel } from "../../types/approval";

interface ApprovalCardProps {
  title: string;
  description: string;
  riskLevel?: ApprovalRiskLevel;
  onApprove: () => void;
  onReject: () => void;
}

export default function ApprovalCard({
  title,
  description,
  riskLevel = 'high',
  onApprove,
  onReject
}: ApprovalCardProps) {
  const getRiskStyles = () => {
    switch (riskLevel) {
      case 'critical':
      case 'high':
        return { border: 'border-error/30', bg: 'bg-error/5', text: 'text-error' };
      case 'medium':
        return { border: 'border-warning/30', bg: 'bg-warning/5', text: 'text-warning' };
      default:
        return { border: 'border-border', bg: 'bg-background', text: 'text-text-secondary' };
    }
  };

  const styles = getRiskStyles();

  return (
    <div className={`border rounded-xl p-3 space-y-2 mt-4 transition-all ${styles.border} ${styles.bg}`}>
      <div className={`flex items-center gap-1.5 font-semibold text-[11px] uppercase tracking-wider ${styles.text}`}>
        <Warning size={14} weight="fill" />
        <span>Approval Required ({riskLevel})</span>
      </div>
      <div className="space-y-1">
        <div className="text-[12px] font-bold text-text-primary">
          {title}
        </div>
        <div className="text-[11px] text-text-secondary leading-relaxed">
          {description}
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1.5 select-none">
        <button 
          onClick={onApprove}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1 bg-success hover:bg-success/90 text-white rounded text-[11px] font-bold shadow-sm transition-all cursor-pointer"
        >
          <Check size={12} weight="bold" />
          <span>Approve</span>
        </button>
        <button 
          onClick={onReject}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1 bg-error hover:bg-error/90 text-white rounded text-[11px] font-bold shadow-sm transition-all cursor-pointer"
        >
          <X size={12} weight="bold" />
          <span>Reject</span>
        </button>
      </div>
    </div>
  );
}
