import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    const fromNavigation = (state as { scrollTo?: string } | null)?.scrollTo;
    /* Only the homepage has sections to scroll to. */
    const fromHash = pathname === '/' && hash ? hash.slice(1) : undefined;
    const targetId = fromNavigation ?? fromHash;

    if (targetId) {
      /* Wait one frame so the sections exist in the DOM before we scroll. */
      requestAnimationFrame(() => {
        document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
      });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname, hash, state]);

  return null;
}
