"use client";

import { Stars, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SpaceEnvironment() {
  const nebulaRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <>
      {/* Deep Space Background Color */}
      <color attach="background" args={["#06080e"]} />

      {/* Cosmic Starfield */}
      <Stars
        radius={80}
        depth={50}
        count={6000}
        factor={4}
        saturation={0.5}
        fade
        speed={1}
      />

      {/* Orbiting Cosmic Nebula Dust */}
      <group ref={nebulaRef}>
        <Sparkles
          count={120}
          scale={[35, 20, 35]}
          size={3.5}
          speed={0.3}
          opacity={0.4}
          color="#38bdf8"
        />
        <Sparkles
          count={80}
          scale={[30, 18, 30]}
          size={4}
          speed={0.2}
          opacity={0.3}
          color="#a855f7"
        />
        <Sparkles
          count={60}
          scale={[25, 15, 25]}
          size={4.5}
          speed={0.25}
          opacity={0.35}
          color="#f59e0b"
        />
      </group>

      {/* Balanced Multi-point Cosmic Lighting */}
      <ambientLight intensity={0.45} color="#475569" />
      <directionalLight position={[10, 20, 15]} intensity={1.5} color="#f8fafc" />
      {/* Soft teal rim light */}
      <directionalLight position={[-15, -10, -15]} intensity={0.8} color="#38bdf8" />
      {/* Central Island Glow */}
      <pointLight position={[0, 4, 0]} intensity={35} color="#38bdf8" distance={18} decay={2} />
      <pointLight position={[0, -2, 0]} intensity={25} color="#a855f7" distance={15} decay={2} />
    </>
  );
}
