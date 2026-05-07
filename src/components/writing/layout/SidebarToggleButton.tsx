import type { ReactNode } from 'react';

type SidebarToggleButtonProps = {
  label: string;
  isExpanded: boolean;
  onClick: () => void;
  icon?: ReactNode;
};

export function SidebarToggleButton({ label, isExpanded, onClick, icon }: SidebarToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isExpanded}
      className="inline-flex items-center gap-2 rounded-full border border-cyan-100/20 bg-cyan-100/10 px-3 py-2 text-xs font-medium text-cyan-50 transition hover:border-cyan-100/45 hover:bg-cyan-100/15 active:scale-95"
    >
      {icon}
      <span>{isExpanded ? `Hide ${label}` : `Show ${label}`}</span>
    </button>
  );
}
