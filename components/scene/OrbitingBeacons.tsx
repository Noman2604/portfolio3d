"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";
import { useExperience } from "@/lib/store";

const CYAN = "#38bdf8";
const PURPLE = "#a855f7";
const AMBER = "#f59e0b";
const EMERALD = "#10b981";

export function OrbitingBeacons() {
  const aptiCoreRef = useRef<THREE.Group>(null);
  const reposRef = useRef<THREE.Group>(null);
  const skillsRef = useRef<THREE.Group>(null);
  const contactRef = useRef<THREE.Group>(null);

  const { openStation, setChapter } = useExperience();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // AptiCore Monolith rotations
    if (aptiCoreRef.current) {
      aptiCoreRef.current.rotation.y = t * 0.5;
    }

    // Repos Satellite rotations
    if (reposRef.current) {
      reposRef.current.rotation.x = t * 0.4;
      reposRef.current.rotation.y = -t * 0.6;
    }

    // Skills Constellation pulses
    if (skillsRef.current) {
      skillsRef.current.rotation.y = t * 0.3;
    }

    // Contact Beacon wave pulses
    if (contactRef.current) {
      contactRef.current.rotation.z = t * 0.5;
    }
  });

  return (
    <group>
      {/* --- 1. AptiCore Planetary Monolith --- */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
        <group
          position={[-9, 2.0, -4.5]}
          onClick={() => {
            setChapter(2);
            openStation("project-apticore");
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          {/* Label */}
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.36}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            APTICORE
          </Text>
          <Text
            position={[0, 1.45, 0]}
            fontSize={0.18}
            color={AMBER}
            anchorX="center"
            anchorY="middle"
          >
            FLAGSHIP PROJECT
          </Text>

          {/* Rotating Core */}
          <group ref={aptiCoreRef}>
            <mesh>
              <octahedronGeometry args={[0.9, 0]} />
              <meshStandardMaterial
                color={AMBER}
                emissive={AMBER}
                emissiveIntensity={0.8}
                wireframe
              />
            </mesh>
            <mesh>
              <octahedronGeometry args={[0.5, 0]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>

            {/* Orbiting Energy Ring */}
            <mesh rotation={[Math.PI / 3, 0, 0]}>
              <torusGeometry args={[1.5, 0.03, 16, 48]} />
              <meshBasicMaterial color={AMBER} transparent opacity={0.7} />
            </mesh>
          </group>

          {/* Pedestal platform under beacon */}
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[0.8, 1.0, 0.2, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* --- 2. Repos & Open Source Node --- */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
        <group
          position={[9, 2.5, -4]}
          onClick={() => {
            setChapter(3);
            openStation("project-uccops");
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          {/* Label */}
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.36}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            PROJECTS & REPOS
          </Text>
          <Text
            position={[0, 1.45, 0]}
            fontSize={0.18}
            color={CYAN}
            anchorX="center"
            anchorY="middle"
          >
            AI & FULL-STACK
          </Text>

          {/* Polyhedral Crystal Core */}
          <group ref={reposRef}>
            <mesh>
              <icosahedronGeometry args={[0.85, 0]} />
              <meshStandardMaterial
                color={CYAN}
                emissive={CYAN}
                emissiveIntensity={0.7}
                wireframe
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
            </mesh>

            <mesh rotation={[0, Math.PI / 4, 0]}>
              <torusGeometry args={[1.4, 0.03, 16, 48]} />
              <meshBasicMaterial color={CYAN} transparent opacity={0.6} />
            </mesh>
          </group>

          {/* Sub-base */}
          <mesh position={[0, -1.2, 0]}>
            <cylinderGeometry args={[0.8, 1.0, 0.2, 6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </Float>

      {/* --- 3. Skills Constellation Cluster --- */}
      <Float speed={2.2} rotationIntensity={0.15} floatIntensity={0.4}>
        <group
          position={[-7, 3.2, 6]}
          onClick={() => {
            setChapter(4);
            openStation("skills");
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.36}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            TECH CONSTELLATION
          </Text>
          <Text
            position={[0, 1.45, 0]}
            fontSize={0.18}
            color={PURPLE}
            anchorX="center"
            anchorY="middle"
          >
            CAPABILITIES & STACK
          </Text>

          {/* Interconnected Node Cluster */}
          <group ref={skillsRef}>
            {[
              [0, 0, 0],
              [0.8, 0.6, 0],
              [-0.8, 0.5, 0.3],
              [0, -0.7, -0.4],
            ].map((p, idx) => (
              <mesh key={idx} position={p as [number, number, number]}>
                <octahedronGeometry args={[0.25, 0]} />
                <meshStandardMaterial
                  color={PURPLE}
                  emissive={PURPLE}
                  emissiveIntensity={1}
                />
              </mesh>
            ))}

            <mesh>
              <torusGeometry args={[1.3, 0.025, 16, 48]} />
              <meshBasicMaterial color={PURPLE} transparent opacity={0.5} />
            </mesh>
          </group>
        </group>
      </Float>

      {/* --- 4. Contact Transmission Beacon --- */}
      <Float speed={1.7} rotationIntensity={0.2} floatIntensity={0.3}>
        <group
          position={[7, 3.0, 6]}
          onClick={() => {
            setChapter(5);
            openStation("contact");
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "auto")}
        >
          <Text
            position={[0, 1.8, 0]}
            fontSize={0.36}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.08}
          >
            CONTACT BEACON
          </Text>
          <Text
            position={[0, 1.45, 0]}
            fontSize={0.18}
            color={EMERALD}
            anchorX="center"
            anchorY="middle"
          >
            GET IN TOUCH
          </Text>

          {/* Transceiver Dish & Signal Rings */}
          <group ref={contactRef}>
            <mesh>
              <sphereGeometry args={[0.5, 16, 16]} />
              <meshStandardMaterial
                color={EMERALD}
                emissive={EMERALD}
                emissiveIntensity={0.9}
              />
            </mesh>

            {[1.0, 1.4].map((rad, i) => (
              <mesh key={i} rotation={[Math.PI / 2 + (i * 0.4), 0, 0]}>
                <torusGeometry args={[rad, 0.02, 16, 36]} />
                <meshBasicMaterial color={EMERALD} transparent opacity={0.6 - i * 0.2} />
              </mesh>
            ))}
          </group>
        </group>
      </Float>
    </group>
  );
}
