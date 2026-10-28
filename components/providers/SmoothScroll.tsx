"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useScrollStore } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useScrollStore((s) => s.setScrollProgress);
  const setVelocity = useScrollStore((s) => s.setVelocity);
  const prefersReducedMotion = useScrollStore((s) => s.prefersReducedMotion);
  const setScrollTo = useScrollStore((s) => s.setScrollTo);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion) {
      setScrollTo((target: string) => {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: "auto" });
      });

      // Standard scroll listener if user requests reduced motion
      const handleNativeScroll = () => {
        const totalHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          totalHeight > 0
            ? Math.min(Math.max(window.scrollY / totalHeight, 0), 1)
            : 0;
        setScrollProgress(progress);
        setVelocity(0);
      };

      window.addEventListener("scroll", handleNativeScroll, { passive: true });
      handleNativeScroll();
      return () => window.removeEventListener("scroll", handleNativeScroll);
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Weighted spatial easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    setScrollTo((target: string) => {
      lenis.scrollTo(target, {
        duration: 1.0,
        offset: -70,
      });
    });

    lenis.on("scroll", (e: { scroll: number; velocity: number }) => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(e.scroll / total, 0), 1) : 0;
      setScrollProgress(progress);
      setVelocity(e.velocity || 0);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Initial check
    const initialTotal =
      document.documentElement.scrollHeight - window.innerHeight;
    if (initialTotal > 0) {
      setScrollProgress(Math.min(Math.max(window.scrollY / initialTotal, 0), 1));
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setScrollProgress, setVelocity, setScrollTo, prefersReducedMotion]);

  return <>{children}</>;
}
