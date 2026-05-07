import { Focus, Minimize2 } from 'lucide-react';

type FocusModeToggleProps = {
  isFocusMode: boolean;
  onToggle: () => void;
};

export function FocusModeToggle({ isFocusMode, onToggle }: FocusModeToggleProps) {
  const Icon = isFocusMode ? Minimize2 : Focus;

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isFocusMode}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-stardust/35 bg-stardust/10 px-4 py-2 text-sm font-semibold text-stardust transition hover:border-stardust/65 hover:bg-stardust/15 active:scale-95"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {isFocusMode ? 'Exit Focus Mode' : 'Focus Mode'}
    </button>
  );
}
