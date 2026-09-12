"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float } from "@react-three/drei";
import * as THREE from "three";
import { useScrollStore } from "@/lib/scrollStore";

const WARM_GOLD = "#d4a373";
const PALE_GOLD = "#e9edc9";
const CYAN = "#38bdf8";
const PURPLE = "#c084fc";

export function Scene() {
  const { scrollProgress, mousePos } = useScrollStore();

  // Root scene group for mouse parallax
  const rootRef = useRef<THREE.Group>(null);

  // 1. Hero Faceted Sphere & Orbiting Rings
  const heroGroupRef = useRef<THREE.Group>(null);
  const heroSphereRef = useRef<THREE.Mesh>(null);
  const heroRing1Ref = useRef<THREE.Mesh>(null);
  const heroRing2Ref = useRef<THREE.Mesh>(null);

  // 2. About Stacked Architectural Slabs
  const slabGroupRef = useRef<THREE.Group>(null);

  // 3. Stack Orbital Rings
  const orbitGroupRef = useRef<THREE.Group>(null);
  const orbitRing1Ref = useRef<THREE.Mesh>(null);
  const orbitRing2Ref = useRef<THREE.Mesh>(null);
  const orbitRing3Ref = useRef<THREE.Mesh>(null);

  // 4. Projects Torus Knot & Guide Ray
  const projectGroupRef = useRef<THREE.Group>(null);
  const torusKnotRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // Mouse parallax
    if (rootRef.current) {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        mousePos.x * 0.15,
        delta * 2,
      );
      rootRef.current.rotation.x = THREE.MathUtils.lerp(
        rootRef.current.rotation.x,
        -mousePos.y * 0.1,
        delta * 2,
      );
    }

    // --- Dynamic Section Morphing based on scrollProgress [0..1] ---
    // Section 0 (Hero: 0.0 - 0.2)
    // Section 1 (About: 0.2 - 0.4)
    // Section 2 (Stack: 0.4 - 0.6)
    // Section 3 (AptiCore: 0.6 - 0.8)
    // Section 4 (Projects/Contact: 0.8 - 1.0)

    // 1. Hero Object Transitions
    if (heroGroupRef.current) {
      const heroVisibility = Math.max(0, 1 - scrollProgress * 5);
      heroGroupRef.current.position.y = (1 - heroVisibility) * 4;
      heroGroupRef.current.position.x = THREE.MathUtils.lerp(
        0.8,
        -2,
        scrollProgress,
      );
      heroGroupRef.current.scale.setScalar(heroVisibility);

      if (heroSphereRef.current) {
        heroSphereRef.current.rotation.y = t * 0.4;
        heroSphereRef.current.rotation.x = t * 0.2;
      }
      if (heroRing1Ref.current) heroRing1Ref.current.rotation.z = -t * 0.6;
      if (heroRing2Ref.current) heroRing2Ref.current.rotation.x = t * 0.5;
    }

    // 2. Architectural Slabs Transitions (visible around 0.15 - 0.45)
    if (slabGroupRef.current) {
      const slabFactor = Math.max(0, 1 - Math.abs(scrollProgress - 0.25) * 5);
      slabGroupRef.current.scale.setScalar(slabFactor);
      slabGroupRef.current.rotation.y = t * 0.3 + scrollProgress * 2;
      slabGroupRef.current.position.x = THREE.MathUtils.lerp(
        -2.2,
        -1.8,
        slabFactor,
      );
      slabGroupRef.current.position.y = THREE.MathUtils.lerp(
        -0.5,
        0,
        slabFactor,
      );
    }

    // 3. Stack Orbital Rings Transitions (visible around 0.35 - 0.65)
    if (orbitGroupRef.current) {
      const orbitFactor = Math.max(0, 1 - Math.abs(scrollProgress - 0.48) * 5);
      orbitGroupRef.current.scale.setScalar(orbitFactor);
      orbitGroupRef.current.position.x = THREE.MathUtils.lerp(
        1.2,
        1.9,
        orbitFactor,
      );
      orbitGroupRef.current.position.y = 0;

      if (orbitRing1Ref.current) orbitRing1Ref.current.rotation.z = t * 0.5;
      if (orbitRing2Ref.current) orbitRing2Ref.current.rotation.y = t * 0.6;
      if (orbitRing3Ref.current) orbitRing3Ref.current.rotation.x = -t * 0.4;
    }

    // 4. Projects Torus Knot Transitions (visible around 0.55 - 1.0)
    if (projectGroupRef.current) {
      const projFactor = Math.max(0, 1 - Math.abs(scrollProgress - 0.8) * 3);
      projectGroupRef.current.scale.setScalar(projFactor);
      projectGroupRef.current.position.x = THREE.MathUtils.lerp(
        -2.4,
        -1.9,
        projFactor,
      );

      if (torusKnotRef.current) {
        torusKnotRef.current.rotation.x = t * 0.4;
        torusKnotRef.current.rotation.y = t * 0.5;
      }
    }
  });

  return (
    <group ref={rootRef}>
      {/* Background Starfield */}
      <Stars
        radius={60}
        depth={40}
        count={3500}
        factor={3.5}
        saturation={0.3}
        fade
        speed={0.8}
      />

      {/* Floating Cosmic Dust */}
      <Sparkles
        count={80}
        scale={[25, 15, 25]}
        size={3}
        speed={0.3}
        opacity={0.3}
        color={WARM_GOLD}
      />
      <Sparkles
        count={60}
        scale={[20, 12, 20]}
        size={2.5}
        speed={0.2}
        opacity={0.25}
        color={CYAN}
      />

      {/* Lighting Rig */}
      <ambientLight intensity={0.5} color="#334155" />
      <directionalLight position={[6, 8, 6]} intensity={1.8} color="#fef08a" />
      <directionalLight
        position={[-8, -6, -4]}
        intensity={0.8}
        color="#38bdf8"
      />
      <pointLight
        position={[0, 0, 2]}
        intensity={15}
        color="#e0e7ff"
        distance={8}
        decay={2}
      />

      {/* =============================================================== */}
      {/* 1. HERO OBJECT: Faceted Wireframe Sphere + Rings + Floating Cubes */}
      {/* =============================================================== */}
      <group ref={heroGroupRef} position={[0.8, 0, 0]}>
        {/* Faceted Core Sphere */}
        <mesh ref={heroSphereRef}>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial
            color={WARM_GOLD}
            roughness={0.4}
            metalness={0.2}
            flatShading
          />
        </mesh>
        {/* Wireframe Overlay */}
        <mesh>
          <icosahedronGeometry args={[1.56, 1]} />
          <meshBasicMaterial
            color={PALE_GOLD}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* Orbiting Elliptical Rings */}
        <mesh ref={heroRing1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.3, 0.02, 16, 64]} />
          <meshBasicMaterial color={PALE_GOLD} transparent opacity={0.6} />
        </mesh>
        <mesh ref={heroRing2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[2.6, 0.015, 16, 64]} />
          <meshBasicMaterial color={WARM_GOLD} transparent opacity={0.45} />
        </mesh>

        {/* Orbiting Floating Cubes (Space Dust) */}
        {[
          [2.1, 0.8, -0.5],
          [-1.9, -1.1, 0.6],
          [0.6, 2.2, 0.4],
          [-1.2, 1.8, -0.8],
          [1.8, -1.6, -0.3],
        ].map((pos, i) => (
          <Float
            key={i}
            speed={2 + i * 0.5}
            rotationIntensity={1}
            floatIntensity={0.5}
          >
            <mesh position={pos as [number, number, number]}>
              <boxGeometry args={[0.12, 0.12, 0.12]} />
              <meshStandardMaterial color={PALE_GOLD} roughness={0.3} />
            </mesh>
          </Float>
        ))}
      </group>

      {/* =============================================================== */}
      {/* 2. ABOUT: Stacked Architectural Slabs (Frontend, API, Database) */}
      {/* =============================================================== */}
      <group ref={slabGroupRef} position={[-2.0, 0, 0]}>
        {/* Slab 1: Top (Frontend Tier) */}
        <mesh position={[0, 0.9, 0]} rotation={[-0.15, 0.3, 0]}>
          <boxGeometry args={[2.2, 0.08, 1.4]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.9, 0]} rotation={[-0.15, 0.3, 0]}>
          <boxGeometry args={[2.22, 0.082, 1.42]} />
          <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.6} />
        </mesh>

        {/* Central Luminous Light Core */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <pointLight
          position={[0, 0, 0]}
          intensity={12}
          color={CYAN}
          distance={5}
        />

        {/* Slab 2: Middle (API / Microservices Tier - Autowhat.ai) */}
        <mesh position={[0, 0, 0]} rotation={[-0.08, -0.2, 0]}>
          <boxGeometry args={[2.6, 0.08, 1.6]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[-0.08, -0.2, 0]}>
          <boxGeometry args={[2.62, 0.082, 1.62]} />
          <meshBasicMaterial
            color="#ffffff"
            wireframe
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Slab 3: Bottom (Database & Infrastructure Tier) */}
        <mesh position={[0, -0.9, 0]} rotation={[0.1, 0.15, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.5]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, -0.9, 0]} rotation={[0.1, 0.15, 0]}>
          <boxGeometry args={[2.42, 0.082, 1.52]} />
          <meshBasicMaterial
            color={WARM_GOLD}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>

        {/* Connecting Vertical Laser Rays */}
        {[-0.9, 0.9].map((x, idx) => (
          <mesh key={idx} position={[x, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 2.0, 8]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.7} />
          </mesh>
        ))}

        {/* Floating wireframe torus knot on side */}
        <mesh position={[1.8, 0.3, 0]} rotation={[0.4, 0.5, 0]}>
          <torusKnotGeometry args={[0.38, 0.1, 64, 16]} />
          <meshBasicMaterial
            color="#94a3b8"
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>

      {/* =============================================================== */}
      {/* 3. STACK: Concentric Multi-Axis Orbital Rings */}
      {/* =============================================================== */}
      <group ref={orbitGroupRef} position={[1.8, 0, 0]}>
        {/* Pulsing Luminous Core */}
        <mesh>
          <sphereGeometry args={[0.45, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
        <pointLight intensity={18} color={CYAN} distance={6} decay={2} />

        {/* Ring 1 */}
        <mesh ref={orbitRing1Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 64]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.75} />
        </mesh>

        {/* Ring 2 */}
        <mesh ref={orbitRing2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.1, 0.02, 16, 64]} />
          <meshBasicMaterial color={WARM_GOLD} transparent opacity={0.65} />
        </mesh>

        {/* Ring 3 */}
        <mesh ref={orbitRing3Ref} rotation={[0, Math.PI / 3, Math.PI / 6]}>
          <torusGeometry args={[2.5, 0.018, 16, 64]} />
          <meshBasicMaterial color={PURPLE} transparent opacity={0.5} />
        </mesh>

        {/* Orbiting Satellite Nodes */}
        {[
          [1.6, 0, 0],
          [-1.5, 1.4, 0.2],
          [0.8, -1.8, 0.5],
          [-1.0, -1.2, -0.6],
        ].map((pos, idx) => (
          <mesh key={idx} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        ))}
      </group>

      {/* =============================================================== */}
      {/* 4. PROJECTS: Giant Floating Wireframe Torus Knot + Guide Ray */}
      {/* =============================================================== */}
      <group ref={projectGroupRef} position={[-2.0, 0, 0]}>
        {/* Elegant Wireframe Torus Knot */}
        <mesh ref={torusKnotRef} scale={[1.6, 1.6, 1.6]}>
          <torusKnotGeometry args={[1.0, 0.28, 96, 24, 2, 3]} />
          <meshStandardMaterial
            color={PURPLE}
            wireframe
            roughness={0.2}
            metalness={0.6}
            emissive={PURPLE}
            emissiveIntensity={0.25}
          />
        </mesh>

        {/* Angular Guide Ray */}
        <mesh position={[1.5, 0, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.012, 0.012, 8, 8]} />
          <meshBasicMaterial color="#64748b" transparent opacity={0.4} />
        </mesh>

        {/* Floating Polyhedra along the guide ray */}
        {[
          [0.8, -0.2, 0.5],
          [2.2, 0.4, 0.2],
          [3.5, 0.9, -0.3],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshBasicMaterial
              color={i === 0 ? CYAN : PALE_GOLD}
              wireframe
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
