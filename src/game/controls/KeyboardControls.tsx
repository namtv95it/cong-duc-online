import { useEffect, type ReactNode } from 'react';

export default function KeyboardControls({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prevent = (e: KeyboardEvent) => {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        // Prevent browser scrolling when inside game
        if (document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
          e.preventDefault();
        }
      }
    };
    window.addEventListener('keydown', prevent, { passive: false });
    return () => window.removeEventListener('keydown', prevent);
  }, []);

  return <>{children}</>;
}

