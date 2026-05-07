import type { CSSProperties, PointerEvent as ReactPointerEvent, ReactNode } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type PanelSide = 'left' | 'right';

type ResizablePanelProps = {
  side: PanelSide;
  width: number;
  minWidth: number;
  maxWidth: number;
  children: ReactNode;
  className?: string;
  onResize: (width: number) => void;
};

function clampWidth(width: number, minWidth: number, maxWidth: number) {
  return Math.min(Math.max(width, minWidth), maxWidth);
}

export function ResizablePanel({ side, width, minWidth, maxWidth, children, className = '', onResize }: ResizablePanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ pointerX: 0, width: 0 });
  const boundedWidth = useMemo(() => clampWidth(width, minWidth, maxWidth), [maxWidth, minWidth, width]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    const delta = event.clientX - dragStartRef.current.pointerX;
    const nextWidth = side === 'left' ? dragStartRef.current.width + delta : dragStartRef.current.width - delta;
    onResize(clampWidth(nextWidth, minWidth, maxWidth));
  }, [maxWidth, minWidth, onResize, side]);

  const stopDragging = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);

    return () => {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', stopDragging);
      window.removeEventListener('pointercancel', stopDragging);
    };
  }, [handlePointerMove, isDragging, stopDragging]);

  function startDragging(event: ReactPointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    dragStartRef.current = { pointerX: event.clientX, width: boundedWidth };
    setIsDragging(true);
  }

  const handlePositionClass = side === 'left' ? 'right-[-14px]' : 'left-[-14px]';

  return (
    <div className={`writing-desk-resizable-panel relative min-w-0 ${className}`} style={{ '--panel-width': `${boundedWidth}px` } as CSSProperties}>
      {children}
      <button
        type="button"
        aria-label={`Resize ${side} writing desk panel`}
        onPointerDown={startDragging}
        className={`writing-desk-resize-handle absolute top-8 z-20 hidden h-[calc(100%-4rem)] w-7 cursor-col-resize rounded-full border border-cyan-100/10 bg-cyan-100/[0.035] text-cyan-100/70 transition hover:border-cyan-100/35 hover:bg-cyan-100/[0.075] lg:block ${handlePositionClass} ${isDragging ? 'is-dragging' : ''}`}
      >
        <span className="mx-auto block h-10 w-1 rounded-full bg-cyan-100/30" />
      </button>
    </div>
  );
}
