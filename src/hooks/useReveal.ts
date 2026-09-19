import { useEffect, useRef, useState } from 'react';

interface RevealOptions {
  /** How much of the element must be visible before it animates (0–1). */
  threshold?: number;
  /** Animate only the first time it appears. Defaults to true. */
  once?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.15,
  once = true,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);
  /* Browsers without IntersectionObserver start visible, so their content is
     never hidden by the animation's starting state. */
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, once]);

  return { ref, isVisible };
}
