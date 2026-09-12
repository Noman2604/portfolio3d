"use client";

import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { useState, useEffect } from "react";

export function Atmosphere() {
  const [canPostProcess, setCanPostProcess] = useState(true);

  // Catch any potential webgl postprocessing initialization issues gracefully
  useEffect(() => {
    // If WebGL context doesn't support float textures or fails, fallback gracefully
    const handler = (e: ErrorEvent) => {
      if (e.message?.includes("postprocessing") || e.message?.includes("EffectComposer")) {
        setCanPostProcess(false);
      }
    };
    window.addEventListener("error", handler);
    return () => window.removeEventListener("error", handler);
  }, []);

  return (
    <>
      {/* Floating ambient cyber motes and dust particles */}
      <Sparkles
        count={70}
        scale={[24, 7, 24]}
        size={2.5}
        speed={0.3}
        opacity={0.35}
        color="#4fd1c5"
      />
      <Sparkles
        count={45}
        scale={[20, 6, 20]}
        size={3}
        speed={0.2}
        opacity={0.25}
        color="#e8a33d"
      />

      {/* Post-processing bloom & cinematic vignette */}
      {canPostProcess && (
        <EffectComposer multisampling={0}>
          <Bloom
            luminanceThreshold={0.5}
            luminanceSmoothing={0.8}
            intensity={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.15} darkness={0.9} />
        </EffectComposer>
      )}
    </>
  );
}
