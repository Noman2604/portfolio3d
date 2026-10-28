"use client";

import { useRef } from "react";
import { ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { HeroObject } from "./HeroObject";

export function Scene() {
  const cameraGroupRef = useRef<THREE.Group>(null);

  return (
    <>
      <group ref={cameraGroupRef}>
        {/* Soft, neutral architectural ambient lighting */}
        <ambientLight intensity={0.7} color="#FFFFFF" />

        {/* Soft Key Light */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#FFFFFF"
        />

        {/* Soft Fill Light */}
        <directionalLight
          position={[-5, 2, -2]}
          intensity={0.4}
          color="#A0A5B0"
        />

        {/* Central Matte 3D Polyhedron */}
        <HeroObject />

        {/* Soft Ground Contact Shadow */}
        <ContactShadows
          position={[2.55, -1.8, -0.5]}
          opacity={0.35}
          scale={5}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </group>
    </>
  );
}
