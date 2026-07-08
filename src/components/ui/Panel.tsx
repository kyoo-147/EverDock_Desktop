import React from "react";

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'flat' | 'bordered';
}

export default function Panel({ children, variant = 'bordered', className = '', ...props }: PanelProps) {
  return (
    <div 
      className={`bg-surface rounded-2xl ${
        variant === 'bordered' ? 'border border-border' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
