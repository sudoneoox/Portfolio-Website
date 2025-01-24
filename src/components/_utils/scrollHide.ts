import { useState, useEffect, useRef } from "react";

export function useScrollDirection() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    function updateScrollDirection() {
      const currentScrollY = window.scrollY;

      setIsVisible(lastScrollY.current > currentScrollY || currentScrollY < 10);

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    }

    let timeoutId;
    function onScroll() {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(updateScrollDirection, 100);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return isVisible;
}
