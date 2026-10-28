"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface StackNode {
  id: string;
  code: string;
  title: string;
  meta: string;
  color: string;
  y: number;
  hitX: number;
  hitY: number;
  dur: string;
  delay: string;
}

const LEFT_NODES: StackNode[] = [
  {
    id: "frontend",
    code: "01 / CLIENT",
    title: "Next.js 15 & TypeScript",
    meta: "App Router · SSR · React",
    color: "#38BDF8",
    y: 36,
    hitX: 232,
    hitY: 140,
    dur: "3.6s",
    delay: "0s",
  },
  {
    id: "ui",
    code: "02 / INTERFACE",
    title: "Tailwind CSS & Shadcn",
    meta: "Design System · WebGL",
    color: "#A78BFA",
    y: 140,
    hitX: 232,
    hitY: 140,
    dur: "4.2s",
    delay: "-1.2s",
  },
  {
    id: "state",
    code: "03 / VALIDATION",
    title: "Client Guards & Timers",
    meta: "Anti-Cheat · Form State",
    color: "#34D399",
    y: 244,
    hitX: 232,
    hitY: 140,
    dur: "3.9s",
    delay: "-2.4s",
  },
];

const RIGHT_NODES: StackNode[] = [
  {
    id: "api",
    code: "04 / BACKEND",
    title: "Node.js & REST APIs",
    meta: "Controllers · Middleware",
    color: "#F59E0B",
    y: 36,
    hitX: 288,
    hitY: 140,
    dur: "3.8s",
    delay: "-0.6s",
  },
  {
    id: "auth",
    code: "05 / SECURITY",
    title: "JWT & Role Access",
    meta: "RBAC · Session Tokens",
    color: "#F43F5E",
    y: 140,
    hitX: 288,
    hitY: 140,
    dur: "3.5s",
    delay: "-1.8s",
  },
  {
    id: "data",
    code: "06 / PERSISTENCE",
    title: "MongoDB & Services",
    meta: "Mongoose · Gemini",
    color: "#2DD4BF",
    y: 244,
    hitX: 288,
    hitY: 140,
    dur: "4.3s",
    delay: "-2.9s",
  },
];

function CenterPolyhedron() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.7} color="#FFFFFF" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-5, 2, -2]} intensity={0.4} color="#A0A5B0" />

      <group ref={groupRef} rotation={[0.25, 0.35, 0]} scale={1.15}>
        <mesh>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#282C34"
            roughness={0.8}
            metalness={0.15}
            flatShading={true}
          />
        </mesh>
      </group>
    </>
  );
}

export function Architecture() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const renderCard = (node: StackNode, align: "left" | "right") => {
    const isActive = activeId === node.id;
    const isDimmed = activeId !== null && !isActive;

    return (
      <div
        key={node.id}
        onMouseEnter={() => setActiveId(node.id)}
        onMouseLeave={() => setActiveId(null)}
        className={`h-[72px] px-4 rounded-[4px] bg-[#131518] border transition-all duration-500 ease-in-out flex flex-col justify-center cursor-default ${
          isActive
            ? "border-[#EFEFF1]/50"
            : "border-[#23262D] hover:border-[#383C46]"
        } ${isDimmed ? "opacity-40" : "opacity-100"} ${
          align === "right" ? "lg:text-right" : "text-left"
        }`}
      >
        <div
          className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#585C67] mb-1 ${
            align === "right" ? "lg:flex-row-reverse" : ""
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ease-in-out ${
              isActive ? "bg-[#EFEFF1]" : "bg-[#585C67]"
            }`}
          />
          <span>{node.code}</span>
        </div>
        <div className="text-xs sm:text-sm font-sans font-medium text-[#EFEFF1] truncate">
          {node.title}
        </div>
        <div className="text-[11px] font-mono text-[#8B8F9A] truncate">
          {node.meta}
        </div>
      </div>
    );
  };

  const renderBeam = (node: StackNode, side: "left" | "right") => {
    const startX = side === "left" ? 0 : 520;
    const cp1X = side === "left" ? 115 : 405;
    const cp2X = side === "left" ? 125 : 395;
    const pathD = `M ${startX} ${node.y} C ${cp1X} ${node.y}, ${cp2X} ${node.hitY}, ${node.hitX} ${node.hitY}`;

    const isHighlighted = activeId === null || activeId === node.id;
    const isSelected = activeId === node.id;

    return (
      <g
        key={`beam-${node.id}`}
        opacity={isHighlighted ? 1 : 0.18}
        className="transition-opacity duration-500 ease-in-out"
      >
        {/* Base Hairline Path */}
        <path
          d={pathD}
          fill="none"
          stroke={isSelected ? node.color : "#23262D"}
          strokeOpacity={isSelected ? 0.55 : 1}
          strokeWidth={isSelected ? "1.4" : "1"}
          vectorEffect="non-scaling-stroke"
          className="transition-all duration-500 ease-in-out"
        />

        {/* Continuous Colorful Glowing Beam Trail */}
        <path
          d={pathD}
          fill="none"
          stroke={node.color}
          strokeWidth={isSelected ? "2.2" : "1.6"}
          strokeLinecap="round"
          strokeDasharray="24 240"
          vectorEffect="non-scaling-stroke"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="264;0"
            keyTimes="0;1"
            keySplines="0.42 0 0.58 1"
            calcMode="spline"
            dur={node.dur}
            begin={node.delay}
            repeatCount="indefinite"
          />
        </path>

        {/* Continuous Travelling Core Dot */}
        <circle r="2.75" fill={node.color}>
          <animateMotion
            dur={node.dur}
            begin={node.delay}
            repeatCount="indefinite"
            path={pathD}
            keyPoints="0;1"
            keyTimes="0;1"
            keySplines="0.42 0 0.58 1"
            calcMode="spline"
          />
        </circle>
      </g>
    );
  };

  return (
    <section
      id="architecture"
      className="py-16 sm:py-20 border-b border-[#23262D]"
    >
      {/* Compact Editorial Header matching other sections */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
            03 / Architecture
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] [text-wrap:balance]">
            Full-Stack System Flow
          </h2>
        </div>
        <p className="text-xs font-mono text-[#585C67]">
          Client Interface ↔ Application Core ↔ Data Layer
        </p>
      </div>

      {/* Balanced 3-Column Layout on Desktop / Sequential Layer Flow on Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-0 items-center">
        {/* Left Column: 3 Client/Frontend Nodes */}
        <div className="lg:col-span-3 flex flex-col justify-between h-auto lg:h-[280px] gap-3 lg:gap-0">
          <div className="lg:hidden text-[10px] font-mono uppercase tracking-wider text-[#585C67] px-1">
            Client & Interface Layer
          </div>
          {LEFT_NODES.map((node) => renderCard(node, "left"))}
        </div>

        {/* Mobile-Only 3D Polyhedron Core Hub Bridge */}
        <div className="lg:hidden flex flex-col items-center justify-center py-2 relative">
          <div className="w-px h-6 bg-gradient-to-b from-[#23262D] to-[#38BDF8]" />
          <div className="relative w-[130px] h-[130px] my-1">
            <Canvas
              camera={{ position: [0, 0, 3.6], fov: 42 }}
              dpr={[1, 1.75]}
              gl={{ alpha: true, antialias: true }}
            >
              <CenterPolyhedron />
            </Canvas>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#585C67] mb-2">
            Runtime Core Hub
          </div>
          <div className="w-px h-6 bg-gradient-to-b from-[#38BDF8] to-[#23262D]" />
        </div>

        {/* Desktop-Only Center Column: Continuous Beams & 3D Polyhedron */}
        <div className="hidden lg:block lg:col-span-6 h-[280px] relative">
          <svg
            viewBox="0 0 520 280"
            preserveAspectRatio="none"
            className="relative z-0 w-full h-full overflow-visible pointer-events-none"
            aria-hidden="true"
          >
            {LEFT_NODES.map((node) => renderBeam(node, "left"))}
            {RIGHT_NODES.map((node) => renderBeam(node, "right"))}
          </svg>

          {/* Center 3D Polyhedron */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[180px] h-[180px] pointer-events-none">
            <Canvas
              camera={{ position: [0, 0, 3.6], fov: 42 }}
              dpr={[1, 1.75]}
              gl={{ alpha: true, antialias: true }}
            >
              <CenterPolyhedron />
            </Canvas>
          </div>
        </div>

        {/* Right Column: 3 Backend/Database Nodes */}
        <div className="lg:col-span-3 flex flex-col justify-between h-auto lg:h-[280px] gap-3 lg:gap-0">
          <div className="lg:hidden text-[10px] font-mono uppercase tracking-wider text-[#585C67] px-1 mt-2">
            Backend & Data Layer
          </div>
          {RIGHT_NODES.map((node) => renderCard(node, "right"))}
        </div>
      </div>
    </section>
  );
}
