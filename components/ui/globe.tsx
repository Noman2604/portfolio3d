"use client";

import React, { useEffect, useRef, useState } from "react";
import createGlobe, { Marker, Arc } from "cobe";
import { cn } from "@/lib/utils";

export interface FullGlobeProps {
  className?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  enableDrag?: boolean;
  initialPhi?: number;
  initialTheta?: number;
  focusLocation?: [number, number] | null;
  scrollRotate?: boolean;
  scrollZoom?: boolean;
  scrollRange?: number;
  startAngles?: { phi: number; theta: number };
  endAngles?: { phi: number; theta: number };
  maxScale?: number;
  markers?: Marker[];
  arcs?: Arc[];
  baseColor?: [number, number, number];
  markerColor?: [number, number, number];
  glowColor?: [number, number, number];
  arcColor?: [number, number, number];
  dark?: number;
  diffuse?: number;
  mapSamples?: number;
  mapBrightness?: number;
  mapBaseBrightness?: number;
  scale?: number;
  offset?: [number, number];
  showAtmosphereGlow?: boolean;
}

const DEFAULT_START_ANGLES = { phi: 2.9, theta: 1.35 }; // North Pole top-down
const DEFAULT_END_ANGLES = { phi: 3.35, theta: 0.37 }; // India center

export function FullGlobe({
  className,
  autoRotate = false,
  autoRotateSpeed = 0.003,
  enableDrag = true,
  initialPhi = 2.9,
  initialTheta = 1.35,
  focusLocation = null,
  scrollRotate = true,
  scrollZoom = true,
  scrollRange,
  startAngles = DEFAULT_START_ANGLES,
  endAngles = DEFAULT_END_ANGLES,
  maxScale = 2.5, // Crisp zoom framing of India
  markers = [],
  arcs = [],
  baseColor = [1, 1, 1], // Pure brilliant white dots
  markerColor = [0.2, 0.9, 1],
  glowColor = [0.15, 0.35, 0.6],
  arcColor = [0.3, 0.7, 1],
  dark = 1,
  diffuse = 1.6,
  mapSamples = 32767, // Maximum resolution
  mapBrightness = 12, // Ultra-clear, razor-sharp dots
  mapBaseBrightness = 0, // 0 = remove all blurry/fuzzy background dots completely
  scale = 1,
  offset = [0, 0],
  showAtmosphereGlow = true,
}: FullGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerInteracting = useRef<{ x: number; y: number } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Rotation and scale state refs
  const phiRef = useRef(initialPhi);
  const thetaRef = useRef(initialTheta);
  const scaleRef = useRef(scale);
  const targetPhiRef = useRef<number | null>(null);
  const targetThetaRef = useRef<number | null>(null);
  const scrollProgressRef = useRef(0);
  const globeInstanceRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  // Scroll listener
  useEffect(() => {
    if (!scrollRotate) return;

    const handleScroll = () => {
      const maxScroll =
        scrollRange || (typeof window !== "undefined" ? window.innerHeight * 2.0 : 1600);
      const current = typeof window !== "undefined" ? window.scrollY : 0;
      const progress = Math.min(1, Math.max(0, current / maxScroll));
      scrollProgressRef.current = progress;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollRotate, scrollRange]);

  // Focus location change listener
  useEffect(() => {
    if (focusLocation) {
      const [lat, lng] = focusLocation;
      const targetPhi = ((-lng - 90) * Math.PI) / 180;
      const targetTheta = (lat * Math.PI) / 180;

      let currentPhi = phiRef.current % (Math.PI * 2);
      if (currentPhi < 0) currentPhi += Math.PI * 2;
      let diff = (targetPhi % (Math.PI * 2)) - currentPhi;
      if (diff > Math.PI) diff -= Math.PI * 2;
      if (diff < -Math.PI) diff += Math.PI * 2;

      targetPhiRef.current = phiRef.current + diff;
      targetThetaRef.current = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetTheta));
    }
  }, [focusLocation]);

  useEffect(() => {
    let width = 0;
    let height = 0;
    let animationFrameId: number;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const onResize = () => {
      if (container) {
        width = container.offsetWidth;
        height = container.offsetHeight;
      }
    };
    onResize();

    const dpr = typeof window !== "undefined" ? Math.min(Math.max(window.devicePixelRatio || 1, 2), 3) : 2;

    try {
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: (width || window.innerWidth || 800) * dpr,
        height: (height || window.innerHeight || 800) * dpr,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark,
        diffuse,
        scale: scaleRef.current,
        mapSamples,
        mapBrightness,
        mapBaseBrightness: 0, // Clean solid black background, no blurry dots
        baseColor,
        markerColor,
        glowColor,
        markers: [],
        arcs: [],
        offset,
      });

      globeInstanceRef.current = globe;
      setIsLoaded(true);

      const render = () => {
        if (pointerInteracting.current) {
          // Manual drag takes active priority
        } else if (scrollRotate) {
          const progress = scrollProgressRef.current;
          // Phase 1 (0 -> 0.35): rotate from North Pole to India
          const rotT = Math.min(1, progress / 0.35);
          const tPhi = startAngles.phi + (endAngles.phi - startAngles.phi) * rotT;
          const tTheta = startAngles.theta + (endAngles.theta - startAngles.theta) * rotT;

          phiRef.current += (tPhi - phiRef.current) * 0.08;
          thetaRef.current += (tTheta - thetaRef.current) * 0.08;

          // Phase 2 (0.35 -> 1.0): smooth zoom into India
          let targetScale = scale;
          if (scrollZoom && progress > 0.32) {
            const zoomT = Math.min(1, (progress - 0.32) / 0.68);
            targetScale = scale + zoomT * (maxScale - scale);
          }
          scaleRef.current += (targetScale - scaleRef.current) * 0.08;
        } else if (targetPhiRef.current !== null && targetThetaRef.current !== null) {
          phiRef.current += (targetPhiRef.current - phiRef.current) * 0.06;
          thetaRef.current += (targetThetaRef.current - thetaRef.current) * 0.06;

          if (
            Math.abs(targetPhiRef.current - phiRef.current) < 0.001 &&
            Math.abs(targetThetaRef.current - thetaRef.current) < 0.001
          ) {
            targetPhiRef.current = null;
            targetThetaRef.current = null;
          }
        } else if (autoRotate) {
          phiRef.current += autoRotateSpeed;
        }

        globe.update({
          phi: phiRef.current,
          theta: thetaRef.current,
          scale: scaleRef.current,
          markers: [],
          width: width * dpr,
          height: height * dpr,
        });

        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);
    } catch (err) {
      console.error("Failed to initialize globe:", err);
    }

    const resizeObserver = new ResizeObserver(() => {
      onResize();
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (globeInstanceRef.current) {
        globeInstanceRef.current.destroy();
        globeInstanceRef.current = null;
      }
    };
  }, [
    autoRotate,
    autoRotateSpeed,
    scrollRotate,
    scrollZoom,
    maxScale,
    startAngles,
    endAngles,
    dark,
    diffuse,
    scale,
    offset,
    mapSamples,
    mapBrightness,
    mapBaseBrightness,
    baseColor,
    markerColor,
    glowColor,
    arcColor,
  ]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enableDrag) return;
    targetPhiRef.current = null;
    targetThetaRef.current = null;
    pointerInteracting.current = { x: e.clientX, y: e.clientY };
    if (canvasRef.current) {
      canvasRef.current.setPointerCapture(e.pointerId);
      canvasRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enableDrag) return;
    pointerInteracting.current = null;
    if (canvasRef.current) {
      try {
        canvasRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Ignored
      }
      canvasRef.current.style.cursor = "grab";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!enableDrag || !pointerInteracting.current) return;
    const deltaX = e.clientX - pointerInteracting.current.x;
    const deltaY = e.clientY - pointerInteracting.current.y;
    pointerInteracting.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.005 / Math.max(1, scaleRef.current * 0.6);
    phiRef.current += deltaX * sensitivity;
    thetaRef.current = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, thetaRef.current - deltaY * sensitivity)
    );
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full select-none overflow-hidden",
        className
      )}
    >
      {/* Subtle atmospheric glow */}
      {showAtmosphereGlow && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full blur-3xl opacity-30 -z-10"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(37, 99, 235, 0.12) 40%, rgba(0, 0, 0, 0) 70%)`,
          }}
        />
      )}

      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={cn(
          "w-full h-full block touch-none transition-opacity duration-700",
          enableDrag ? "cursor-grab" : "cursor-default",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerMove={handlePointerMove}
      />
    </div>
  );
}

export default FullGlobe;
