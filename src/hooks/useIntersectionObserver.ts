import { useEffect, useRef } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void,
  options: UseIntersectionObserverOptions = {}
) => {
  const targetRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const hasTriggered = useRef(false);

  const { threshold = 0.1, rootMargin = '50px', triggerOnce = false } = options;

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && hasTriggered.current) return;
        
        if (entry.isIntersecting) {
          hasTriggered.current = true;
          callback(true);
          
          if (triggerOnce) {
            observerRef.current?.disconnect();
          }
        } else if (!triggerOnce) {
          callback(false);
        }
      },
      { threshold, rootMargin }
    );

    observerRef.current.observe(target);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [callback, threshold, rootMargin, triggerOnce]);

  return targetRef;
};