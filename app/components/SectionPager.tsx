"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type SectionPagerProps = {
  children: ReactNode;
};

type SectionChildProps = {
  isActive?: boolean;
};

const WHEEL_THRESHOLD = 30;
const TOUCH_THRESHOLD = 50;
const SCROLL_UNLOCK_DELAY = 850;

export function SectionPager({ children }: SectionPagerProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const lockRef = useRef(false);
  const activeIndexRef = useRef(0);
  const unlockTimerRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-section]")
    );

    if (sections.length === 0) return;

    const updateUrlHash = (index: number) => {
      const sectionId = sections[index]?.id;

      if (!sectionId) return;

      const nextHash = `#${sectionId}`;

      if (window.location.hash !== nextHash) {
        window.history.replaceState(null, "", nextHash);
      }
    };

    const setActiveSection = (index: number) => {
      const safeIndex = Math.max(0, Math.min(index, sections.length - 1));

      activeIndexRef.current = safeIndex;
      setActiveIndex(safeIndex);
      updateUrlHash(safeIndex);
    };

    const setIndexFromScroll = () => {
      const viewportHeight = container.clientHeight || window.innerHeight;
      const nextIndex = Math.round(container.scrollTop / viewportHeight);
      setActiveSection(nextIndex);
    };

    const unlockScroll = () => {
      lockRef.current = false;

      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = null;
      }
    };

    const goToIndex = (nextIndex: number) => {
      const safeIndex = Math.max(0, Math.min(nextIndex, sections.length - 1));

      lockRef.current = true;
      setActiveSection(safeIndex);

      sections[safeIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }

      unlockTimerRef.current = window.setTimeout(
        unlockScroll,
        SCROLL_UNLOCK_DELAY
      );
    };

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;

      event.preventDefault();

      if (lockRef.current) return;

      goToIndex(activeIndexRef.current + (event.deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (lockRef.current) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        goToIndex(activeIndexRef.current + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        goToIndex(activeIndexRef.current - 1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchStartY = touchStartYRef.current;
      const touchEndY = event.changedTouches[0]?.clientY ?? null;

      touchStartYRef.current = null;

      if (touchStartY === null || touchEndY === null || lockRef.current) {
        return;
      }

      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      goToIndex(activeIndexRef.current + (deltaY > 0 ? 1 : -1));
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");

      if (!hash) return;

      const hashIndex = sections.findIndex((section) => section.id === hash);

      if (hashIndex >= 0) {
        goToIndex(hashIndex);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", setIndexFromScroll, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("hashchange", handleHashChange);

    handleHashChange();
    setIndexFromScroll();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", setIndexFromScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("hashchange", handleHashChange);

      if (unlockTimerRef.current !== null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    };
  }, []);

  return (
    <main className="section-shell" ref={containerRef}>
      {Children.map(children, (child, index) => {
        if (!isValidElement<SectionChildProps>(child)) {
          return child;
        }

        return cloneElement(child as ReactElement<SectionChildProps>, {
          isActive: activeIndex === index,
        });
      })}
    </main>
  );
}