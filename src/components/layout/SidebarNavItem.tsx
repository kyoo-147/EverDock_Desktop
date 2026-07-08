import { Link } from "react-router-dom";
import { Icon } from "@phosphor-icons/react";

interface SidebarNavItemProps {
  name: string;
  path?: string;
  onClick?: () => void;
  icon: Icon;
  isActive?: boolean;
  badge?: string | number;
  metaText?: string;
  statusColor?: string;
}

export default function SidebarNavItem({
  name,
  path,
  onClick,
  icon: IconComponent,
  isActive = false,
  badge,
  metaText,
  statusColor
}: SidebarNavItemProps) {
  const content = (
    <>
      <div className="flex items-center gap-2.5 min-w-0">
        {statusColor ? (
          <span className={`w-2 h-2 rounded-full shrink-0 ${statusColor}`} />
        ) : (
          <IconComponent 
            size={16} 
            weight={isActive ? "bold" : "regular"} 
            className={isActive ? "text-primary-blue shrink-0" : "text-text-secondary shrink-0"} 
          />
        )}
        <span className="truncate">{name}</span>
      </div>
      {badge !== undefined && (
        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-active-bg text-primary-blue font-bold shrink-0">
          {badge}
        </span>
      )}
      {metaText && (
        <span className="text-[11px] text-text-secondary font-light shrink-0 ml-1">
          {metaText}
        </span>
      )}
    </>
  );

  const className = `w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
    isActive 
      ? "bg-active-bg text-primary-blue" 
      : "text-text-secondary hover:bg-background hover:text-text-primary"
  }`;

  if (path) {
    return (
      <Link to={path} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${className} text-left`}>
      {content}
    </button>
  );
}
