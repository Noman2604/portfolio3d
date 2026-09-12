"use client";

import { Suspense, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { PalakScene } from "@/components/scene/PalakScene";
import { PalakNavbar } from "@/components/ui/PalakNavbar";
import { DotNavigation } from "@/components/ui/DotNavigation";
import { Sections } from "@/components/ui/Sections";
import { Terminal } from "@/components/ui/Terminal";
import { useScrollStore } from "@/lib/scrollStore";

export function Experience() {
  const { setScrollProgress, setActiveSection, setMousePos } = useScrollStore();

  const handleScrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Track window scroll progress and active section
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const currentY = window.scrollY;
          const progress = totalHeight > 0 ? Math.min(Math.max(currentY / totalHeight, 0), 1) : 0;
          setScrollProgress(progress);

          // Determine active section based on scroll offsets
          const sections = ["hero", "about", "stack", "work", "projects", "experience", "contact"];
          const scrollPos = currentY + window.innerHeight * 0.35;

          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el && el.offsetTop <= scrollPos) {
              setActiveSection(i);
              break;
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Initial check
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [setScrollProgress, setActiveSection, setMousePos]);

  return (
    <div className="relative min-h-screen w-full bg-[#06080e] overflow-x-hidden selection:bg-amber-400/30 selection:text-amber-200">
      {/* Fixed 3D WebGL Background Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <Suspense fallback={null}>
            <PalakScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Floating Header Navigation */}
      <PalakNavbar onScrollTo={handleScrollTo} />

      {/* Right-hand Rail Dot Navigation */}
      <DotNavigation onScrollTo={handleScrollTo} />

      {/* Native Scrollable Content Sections */}
      <main className="relative z-10 w-full">
        <Sections onScrollTo={handleScrollTo} />
      </main>

      {/* Retro Cyberpunk Interactive Terminal Modal */}
      <Terminal />
    </div>
  );
}
