import { PanelLeftClose, PanelLeftOpen, PanelRightClose, PanelRightOpen } from 'lucide-react';
import { FocusModeToggle } from './FocusModeToggle';
import { SidebarToggleButton } from './SidebarToggleButton';

type WritingDeskToolbarProps = {
  isFocusMode: boolean;
  isLeftExpanded: boolean;
  isRightExpanded: boolean;
  onToggleFocusMode: () => void;
  onToggleLeft: () => void;
  onToggleRight: () => void;
};

export function WritingDeskToolbar({
  isFocusMode,
  isLeftExpanded,
  isRightExpanded,
  onToggleFocusMode,
  onToggleLeft,
  onToggleRight,
}: WritingDeskToolbarProps) {
  const LeftIcon = isLeftExpanded ? PanelLeftClose : PanelLeftOpen;
  const RightIcon = isRightExpanded ? PanelRightClose : PanelRightOpen;

  return (
    <div className="mb-5 rounded-[1.75rem] border border-white/10 bg-[linear-gradient(135deg,rgba(125,211,252,.08),rgba(218,188,111,.06)),rgba(255,255,255,.045)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.06)]">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.35em] text-cyan-100/50">Writing Desk v0.2</p>
          <p className="mt-1 text-sm text-slate-300">可折叠情报栏、可拖拽宽度与长写作专注模式。</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <SidebarToggleButton
            label="Archive"
            isExpanded={isLeftExpanded && !isFocusMode}
            onClick={onToggleLeft}
            icon={<LeftIcon className="h-4 w-4" aria-hidden="true" />}
          />
          <SidebarToggleButton
            label="Mission"
            isExpanded={isRightExpanded && !isFocusMode}
            onClick={onToggleRight}
            icon={<RightIcon className="h-4 w-4" aria-hidden="true" />}
          />
          <FocusModeToggle isFocusMode={isFocusMode} onToggle={onToggleFocusMode} />
        </div>
      </div>
    </div>
  );
}
