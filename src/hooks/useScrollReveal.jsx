import { useEffect, useRef, useState } from 'react';

/**
 * Hook for scroll-triggered fade-in animations.
 * Returns a ref to attach to the element and an isVisible boolean.
 *
 * Usage:
 *   const [ref, isVisible] = useScrollReveal({ delay: 200 });
 *   <div ref={ref} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'none' : 'translateY(30px)', transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms` }}>
 */
export function useScrollReveal({ threshold = 0.1, delay = 0 } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setIsVisible(true), delay);
          } else {
            setIsVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return [ref, isVisible];
}

/**
 * Wrapper component for scroll-reveal animations.
 * Simpler API when you don't need the ref directly.
 */
export function ScrollReveal({ children, delay = 0, threshold = 0.1, style = {}, className = '' }) {
  const [ref, isVisible] = useScrollReveal({ delay, threshold });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default useScrollReveal;
