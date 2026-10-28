"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { useScrollStore } from "@/lib/scroll";

// Polyfill WebGL getContextAttributes if it returns null in headless or virtual contexts
if (typeof window !== "undefined") {
  const patchContext = (proto: { getContextAttributes?: () => WebGLContextAttributes | null }) => {
    if (!proto || !proto.getContextAttributes) return;
    const orig = proto.getContextAttributes;
    proto.getContextAttributes = function () {
      const res = orig.call(this);
      return (
        res || {
          alpha: true,
          depth: true,
          stencil: true,
          antialias: true,
          premultipliedAlpha: true,
          preserveDrawingBuffer: false,
        }
      );
    };
  };
  if (typeof WebGLRenderingContext !== "undefined") {
    patchContext(WebGLRenderingContext.prototype);
  }
  if (typeof WebGL2RenderingContext !== "undefined") {
    patchContext(WebGL2RenderingContext.prototype);
  }
}

function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

export function CanvasContainer() {
  const [hasWebGL] = useState(checkWebGLSupport);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const setIsMobile = useScrollStore((s) => s.setIsMobile);
  const setPrefersReducedMotion = useScrollStore((s) => s.setPrefersReducedMotion);
  const setMouse = useScrollStore((s) => s.setMouse);

  // Media queries & listeners
  useEffect(() => {
    try {
      localStorage.removeItem("portfolio_quality");
    } catch {}

    // Responsive check
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Reduced motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const onMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", onMotionChange);

    // Visibility check to pause rendering when tab is hidden
    const onVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Mouse movement listener
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y, targetX: e.clientX, targetY: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", onMotionChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [setIsMobile, setPrefersReducedMotion, setMouse]);

  if (!hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#0C0D0E]" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45, near: 0.1, far: 50 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop={isTabVisible ? "always" : "never"}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
