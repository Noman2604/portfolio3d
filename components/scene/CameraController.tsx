"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useExperience } from "@/lib/store";

interface Waypoint {
  pos: [number, number, number];
  lookAt: [number, number, number];
}

const CHAPTER_WAYPOINTS: Record<number, Waypoint> = {
  0: { pos: [0, 4.8, 11.5], lookAt: [0, 0.5, 0] }, // Hero cosmic overview
  1: { pos: [0, 1.9, 3.4], lookAt: [0, 1.35, 0] }, // Dev station / About / Experience
  2: { pos: [-5.6, 2.4, -2.2], lookAt: [-9, 2.0, -4.5] }, // AptiCore Monolith
  3: { pos: [5.6, 2.7, -2.0], lookAt: [9, 2.5, -4] }, // Projects & Repos Satellite
  4: { pos: [-4.0, 3.4, 4.2], lookAt: [-7, 3.2, 6] }, // Skills Constellation
  5: { pos: [4.0, 3.2, 4.2], lookAt: [7, 3.0, 6] }, // Contact Beacon
};

const targetPos = new THREE.Vector3();
const targetLook = new THREE.Vector3();
const currentLook = new THREE.Vector3(0, 0.5, 0);

export function CameraController() {
  const { chapter, isFreeOrbit } = useExperience();
  const { camera } = useThree();
  const orbitRef = useRef<any>(null);

  // Set initial position
  useEffect(() => {
    const wp = CHAPTER_WAYPOINTS[0];
    camera.position.set(...wp.pos);
    camera.lookAt(...wp.lookAt);
  }, [camera]);

  useFrame((state, delta) => {
    // If free orbit mode is enabled, let OrbitControls take over
    if (isFreeOrbit) return;

    const wp = CHAPTER_WAYPOINTS[chapter] || CHAPTER_WAYPOINTS[0];
    targetPos.set(...wp.pos);
    targetLook.set(...wp.lookAt);

    // Subtle gentle floating / breathing motion
    const time = state.clock.getElapsedTime();
    targetPos.y += Math.sin(time * 0.8) * 0.08;
    targetPos.x += Math.cos(time * 0.6) * 0.06;

    // Smooth camera position interpolation
    camera.position.lerp(targetPos, delta * 3.2);

    // Smooth lookAt interpolation
    currentLook.lerp(targetLook, delta * 4.0);
    camera.lookAt(currentLook);
  });

  return (
    <>
      {isFreeOrbit && (
        <OrbitControls
          ref={orbitRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={4}
          maxDistance={24}
          maxPolarAngle={Math.PI / 2 + 0.15}
          target={[0, 0.5, 0]}
        />
      )}
    </>
  );
}
