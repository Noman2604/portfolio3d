"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { useExperience } from "@/lib/store";

const CYAN = "#38bdf8";
const PURPLE = "#a855f7";
const AMBER = "#f59e0b";
const DARK_PANEL = "#0f172a";
const ACCENT_PANEL = "#1e293b";

export function CyberIsland() {
  const coreGlowRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const ledsRef = useRef<THREE.Group>(null);
  const { setTerminalOpen, chapter } = useExperience();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Pulse underside anti-gravity core
    if (coreGlowRef.current) {
      const mat = coreGlowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 3) * 0.2;
    }

    // Rotate energy ring
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.4;
    }

    // Monitor screen subtle shimmer
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.85 + Math.sin(t * 8) * 0.08;
    }

    // Server LEDs blinking
    if (ledsRef.current) {
      ledsRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.opacity = 0.3 + Math.sin(t * (4 + i * 1.5)) * 0.5;
        }
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.25}>
      <group position={[0, -0.5, 0]}>
        {/* --- 1. Main Hexagonal Cyber Platform --- */}
        {/* Upper Deck */}
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[5.2, 5.8, 0.4, 6]} />
          <meshStandardMaterial color={DARK_PANEL} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Lower Inset Deck */}
        <mesh position={[0, -0.35, 0]}>
          <cylinderGeometry args={[5.8, 4.8, 0.35, 6]} />
          <meshStandardMaterial color="#090d16" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Underside Floating Anti-Gravity Energy Core */}
        <mesh ref={coreGlowRef} position={[0, -0.8, 0]}>
          <cylinderGeometry args={[2.5, 0.5, 0.6, 6]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
        </mesh>

        {/* Platform Surface Glowing Energy Ring */}
        <mesh ref={ringRef} position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[3.8, 4.0, 48]} />
          <meshBasicMaterial color={PURPLE} transparent opacity={0.65} />
        </mesh>
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.2, 2.3, 36]} />
          <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
        </mesh>

        {/* Outer Perimeter Light Beacons on Hexagon Corners */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const angle = (i * Math.PI) / 3;
          const radius = 5.2;
          const px = Math.cos(angle) * radius;
          const pz = Math.sin(angle) * radius;
          return (
            <group key={i} position={[px, 0.25, pz]}>
              <mesh>
                <cylinderGeometry args={[0.15, 0.2, 0.4, 12]} />
                <meshStandardMaterial color={ACCENT_PANEL} metalness={0.9} />
              </mesh>
              <mesh position={[0, 0.25, 0]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshBasicMaterial color={i % 2 === 0 ? CYAN : AMBER} />
              </mesh>
            </group>
          );
        })}

        {/* --- 2. Central Developer Workspace --- */}
        <group position={[0, 0.2, 0.2]}>
          {/* Ergonomic Curved Desk */}
          <mesh position={[0, 0.85, 0]} castShadow receiveShadow>
            <boxGeometry args={[2.8, 0.08, 1.3]} />
            <meshStandardMaterial color={ACCENT_PANEL} roughness={0.3} metalness={0.5} />
          </mesh>

          {/* Desk Sleek Metal Frame & Legs */}
          {[
            [-1.25, 0.42, -0.5],
            [1.25, 0.42, -0.5],
            [-1.25, 0.42, 0.5],
            [1.25, 0.42, 0.5],
          ].map((pos, idx) => (
            <mesh key={idx} position={pos as [number, number, number]}>
              <cylinderGeometry args={[0.04, 0.04, 0.85, 12]} />
              <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}

          {/* Dual Curved Holographic Monitors */}
          {/* Main Center Monitor */}
          <mesh position={[0, 1.55, -0.3]}>
            <boxGeometry args={[1.5, 0.85, 0.05]} />
            <meshStandardMaterial color="#020617" roughness={0.5} />
          </mesh>
          <mesh
            ref={screenRef}
            position={[0, 1.55, -0.27]}
            onClick={() => setTerminalOpen(true)}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "auto")}
          >
            <planeGeometry args={[1.42, 0.77]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.9} />
          </mesh>

          {/* Secondary Angled Monitor */}
          <group position={[0.95, 1.55, -0.15]} rotation={[0, -0.35, 0]}>
            <mesh>
              <boxGeometry args={[0.6, 0.85, 0.05]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
            <mesh position={[0, 0, 0.026]}>
              <planeGeometry args={[0.55, 0.77]} />
              <meshBasicMaterial color={AMBER} transparent opacity={0.8} />
            </mesh>
          </group>

          {/* Glowing Mechanical Keyboard Plate */}
          <mesh position={[0, 0.91, 0.2]} rotation={[-0.08, 0, 0]}>
            <boxGeometry args={[0.8, 0.025, 0.28]} />
            <meshStandardMaterial color="#020617" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0.925, 0.2]} rotation={[-0.08, 0, 0]}>
            <planeGeometry args={[0.76, 0.24]} />
            <meshBasicMaterial color={PURPLE} transparent opacity={0.6} />
          </mesh>

          {/* Glowing Cyber Mug */}
          <mesh position={[0.85, 0.98, 0.25]}>
            <cylinderGeometry args={[0.07, 0.06, 0.14, 16]} />
            <meshStandardMaterial color={CYAN} roughness={0.2} metalness={0.3} />
          </mesh>

          {/* Cyber Bonsai / Geometric Hologram on desk edge */}
          <group position={[-1.0, 0.95, 0.15]}>
            <mesh position={[0, 0.06, 0]}>
              <cylinderGeometry args={[0.15, 0.1, 0.12, 6]} />
              <meshStandardMaterial color={ACCENT_PANEL} />
            </mesh>
            <mesh position={[0, 0.25, 0]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color={CYAN} wireframe emissive={CYAN} emissiveIntensity={0.8} />
            </mesh>
          </group>
        </group>

        {/* --- 3. Vertical Server Monoliths with Data Lights --- */}
        <group position={[-3.2, 0.2, -1.8]} rotation={[0, 0.4, 0]}>
          {[0, 0.55].map((offX, i) => (
            <mesh key={i} position={[offX, 1.1, 0]} castShadow>
              <boxGeometry args={[0.45, 2.2, 0.5]} />
              <meshStandardMaterial color="#090d16" roughness={0.3} metalness={0.7} />
            </mesh>
          ))}

          {/* Animated Server Activity LEDs */}
          <group ref={ledsRef} position={[0.27, 1.1, 0.26]}>
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
              <mesh key={idx} position={[(idx % 2 === 0 ? -0.27 : 0.27), (idx - 3) * 0.3, 0]}>
                <planeGeometry args={[0.35, 0.04]} />
                <meshBasicMaterial color={idx % 2 === 0 ? CYAN : PURPLE} transparent opacity={0.8} />
              </mesh>
            ))}
          </group>
        </group>
      </group>
    </Float>
  );
}
