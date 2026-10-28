"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/lib/scroll";

export const heroLivePosition = new THREE.Vector3(2.55, -0.05, -0.5);

interface ShardData {
  geometry: THREE.BufferGeometry;
  normal: THREE.Vector3;
  radialDir: THREE.Vector3;
  rotAxis: THREE.Vector3;
  rotAmount: number;
  orbitDist: number;
  stagger: number;
}

// Gentle, weighted smoothstep curve (no sudden mid-transition rush)
function smoothEase(t: number): number {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}

const portraitVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const portraitFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uReveal;
  varying vec2 vUv;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);

    // Keep the full natural rectangular portrait shape (both shoulders & suit intact, no oval/egg crop)
    // Only feather the outermost 6% perimeter of the rectangle so there is no hard box line
    float fadeX = smoothstep(0.0, 0.06, vUv.x) * (1.0 - smoothstep(0.94, 1.0, vUv.x));
    float fadeY = smoothstep(0.0, 0.10, vUv.y) * (1.0 - smoothstep(0.94, 1.0, vUv.y));
    float rectFeather = fadeX * fadeY;

    // Smooth reveal fade without distorting shape or colors
    float alpha = rectFeather * uReveal;

    gl_FragColor = vec4(texColor.rgb, alpha);
  }
`;

export function HeroObject() {
  const rootGroupRef = useRef<THREE.Group>(null);
  const shardsGroupRef = useRef<THREE.Group>(null);
  const shardMeshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const portraitGroupRef = useRef<THREE.Group>(null);
  const portraitShaderRef = useRef<THREE.ShaderMaterial>(null);

  const prefersReducedMotion = useScrollStore((s) => s.prefersReducedMotion);
  const isMobile = useScrollStore((s) => s.isMobile);

  // 0 = closed solid icosahedron, 1 = gently parted shards revealing studio portrait
  const explodeProgress = useRef(0);
  const isHoveredRef = useRef(false);
  const projectedCenter = useMemo(() => new THREE.Vector3(), []);

  // Load portrait texture (/image.webp) preserving full 3:4 portrait framing & true sRGB colors
  const portraitUniforms = useMemo(() => {
    const tex =
      typeof window !== "undefined"
        ? new THREE.TextureLoader().load("/image.webp", (loaded) => {
            loaded.minFilter = THREE.LinearFilter;
            loaded.magFilter = THREE.LinearFilter;
            loaded.needsUpdate = true;
          })
        : null;

    return {
      uTexture: { value: tex },
      uReveal: { value: 0 },
    };
  }, []);

  // Build 80 solid 3D wedge shards from IcosahedronGeometry(1, 1)
  const shards = useMemo<ShardData[]>(() => {
    const baseGeo = new THREE.IcosahedronGeometry(1, 1).toNonIndexed();
    const posAttr = baseGeo.attributes.position;
    const faceCount = posAttr.count / 3;
    const innerScale = 0.78;
    const list: ShardData[] = [];

    for (let i = 0; i < faceCount; i++) {
      const i0 = i * 3;
      const v0 = new THREE.Vector3().fromBufferAttribute(posAttr, i0);
      const v1 = new THREE.Vector3().fromBufferAttribute(posAttr, i0 + 1);
      const v2 = new THREE.Vector3().fromBufferAttribute(posAttr, i0 + 2);

      const centroid = new THREE.Vector3()
        .add(v0)
        .add(v1)
        .add(v2)
        .divideScalar(3);
      const normal = centroid.clone().normalize();

      const u0 = v0.clone().multiplyScalar(innerScale);
      const u1 = v1.clone().multiplyScalar(innerScale);
      const u2 = v2.clone().multiplyScalar(innerScale);

      const a0 = v0.clone().sub(centroid);
      const a1 = v1.clone().sub(centroid);
      const a2 = v2.clone().sub(centroid);
      const b0 = u0.clone().sub(centroid);
      const b1 = u1.clone().sub(centroid);
      const b2 = u2.clone().sub(centroid);

      const verts = new Float32Array([
        // Outer face
        a0.x, a0.y, a0.z, a1.x, a1.y, a1.z, a2.x, a2.y, a2.z,
        // Inner face
        b0.x, b0.y, b0.z, b2.x, b2.y, b2.z, b1.x, b1.y, b1.z,
        // Side 1
        a0.x, a0.y, a0.z, b0.x, b0.y, b0.z, b1.x, b1.y, b1.z,
        a0.x, a0.y, a0.z, b1.x, b1.y, b1.z, a1.x, a1.y, a1.z,
        // Side 2
        a1.x, a1.y, a1.z, b1.x, b1.y, b1.z, b2.x, b2.y, b2.z,
        a1.x, a1.y, a1.z, b2.x, b2.y, b2.z, a2.x, a2.y, a2.z,
        // Side 3
        a2.x, a2.y, a2.z, b2.x, b2.y, b2.z, b0.x, b0.y, b0.z,
        a2.x, a2.y, a2.z, b0.x, b0.y, b0.z, a0.x, a0.y, a0.z,
      ]);

      const shardGeo = new THREE.BufferGeometry();
      shardGeo.setAttribute("position", new THREE.BufferAttribute(verts, 3));
      shardGeo.computeVertexNormals();

      const xyLen = Math.hypot(normal.x, normal.y);
      const angle = Math.atan2(normal.y, normal.x) + (i % 2 === 0 ? 0.12 : -0.12);
      const radialDir =
        xyLen > 0.08
          ? new THREE.Vector3(
              normal.x / xyLen,
              (normal.y / xyLen) * 1.08,
              normal.z * 0.2
            ).normalize()
          : new THREE.Vector3(
              Math.cos(angle),
              Math.sin(angle) * 1.08,
              normal.z * 0.18
            ).normalize();

      const rotAxis = new THREE.Vector3(
        Math.sin(i * 1.7 + 0.5),
        Math.cos(i * 2.3 + 0.2),
        Math.sin(i * 3.1)
      ).normalize();

      // Contained, balanced orbital radius so shards frame the portrait without hitting text
      const ringLayer = i % 3;
      const orbitDist = 1.12 + ringLayer * 0.13 + ((i * 7) % 5) * 0.025;
      const rotAmount = 0.55 + ((i * 13) % 7) * 0.12;
      const stagger = THREE.MathUtils.clamp((1 - xyLen) * 0.25, 0, 0.25);

      list.push({
        geometry: shardGeo,
        normal: centroid,
        radialDir,
        rotAxis,
        rotAmount,
        orbitDist,
        stagger,
      });
    }

    baseGeo.dispose();
    return list;
  }, []);

  const shardMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#282C34",
        roughness: 0.74,
        metalness: 0.2,
        flatShading: true,
      }),
    []
  );

  useEffect(() => {
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "";
      }
    };
  }, []);

  useFrame(({ camera, size, clock }, delta) => {
    if (!rootGroupRef.current || !shardsGroupRef.current) return;
    const { scrollProgress, mouse } = useScrollStore.getState();

    // Positioned further to the right on desktop (x = 2.55) so it never overlaps hero text
    const targetX = isMobile ? 0 : 2.55;
    const targetY =
      isMobile ? -0.8 : -0.05 + Math.sin(scrollProgress * Math.PI) * 0.18;
    const targetZ = isMobile ? -3.0 : -0.5;

    rootGroupRef.current.position.x = THREE.MathUtils.damp(
      rootGroupRef.current.position.x,
      targetX,
      2.5,
      delta
    );
    rootGroupRef.current.position.y = THREE.MathUtils.damp(
      rootGroupRef.current.position.y,
      targetY,
      2.5,
      delta
    );
    rootGroupRef.current.position.z = THREE.MathUtils.damp(
      rootGroupRef.current.position.z,
      targetZ,
      2.5,
      delta
    );

    // Keep the Hero polyhedron in the Hero section so it doesn't float over lower sections
    const heroVisibility = 1 - smoothEase(THREE.MathUtils.clamp((scrollProgress - 0.10) / 0.08, 0, 1));
    const baseScale = isMobile ? 0.75 : 1.12;
    rootGroupRef.current.scale.setScalar(baseScale * heroVisibility);
    rootGroupRef.current.visible = heroVisibility > 0.01;

    heroLivePosition.copy(rootGroupRef.current.position);

    // Screen-space hover detection
    projectedCenter.copy(rootGroupRef.current.position).project(camera);
    const aspect = size.width / Math.max(size.height, 1);
    const dx = (mouse.x - projectedCenter.x) * aspect;
    const dy = mouse.y - projectedCenter.y;
    const dist = Math.hypot(dx, dy);

    const hasMovedMouse = mouse.targetX !== 0 || mouse.targetY !== 0;
    const inHeroSection = scrollProgress < 0.16;
    const hoverRadius = isHoveredRef.current ? 0.56 : 0.42;
    const shouldHover =
      !isMobile && hasMovedMouse && inHeroSection && dist < hoverRadius;

    if (shouldHover !== isHoveredRef.current) {
      isHoveredRef.current = shouldHover;
      useScrollStore.getState().setIsHeroHovered(shouldHover);
      if (typeof document !== "undefined") {
        document.body.style.cursor = shouldHover ? "pointer" : "";
      }
    }

    // Gentle, cinematic damping (~3s luxurious opening and closing)
    const targetExplode = isHoveredRef.current ? 1 : 0;
    explodeProgress.current = THREE.MathUtils.damp(
      explodeProgress.current,
      targetExplode,
      isHoveredRef.current ? 0.85 : 1.05,
      delta
    );

    const p = explodeProgress.current;
    const elapsed = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      const baseRotX = 0.2 + scrollProgress * 1.5 + elapsed * 0.035 * (1 - p);
      const baseRotY = 0.3 + scrollProgress * 2.2 + elapsed * 0.065 * (1 - p);
      shardsGroupRef.current.rotation.x = THREE.MathUtils.damp(
        shardsGroupRef.current.rotation.x,
        baseRotX * (1 - p * 0.75),
        1.5,
        delta
      );
      shardsGroupRef.current.rotation.y = THREE.MathUtils.damp(
        shardsGroupRef.current.rotation.y,
        baseRotY * (1 - p * 0.75),
        1.5,
        delta
      );
    }

    // Update each of the 80 shards with slow, fluid motion
    for (let i = 0; i < shards.length; i++) {
      const mesh = shardMeshesRef.current[i];
      if (!mesh) continue;
      const s = shards[i];

      const localT = THREE.MathUtils.clamp(
        (p - s.stagger) / (1 - s.stagger),
        0,
        1
      );
      const eased = smoothEase(localT);

      if (eased < 0.0005) {
        mesh.position.copy(s.normal);
        mesh.rotation.set(0, 0, 0);
        mesh.scale.setScalar(1);
      } else {
        // Gentle outward separation first, then slow drift into a compact framing halo
        const crackPush = Math.sin(eased * Math.PI) * 0.12;
        const floatWave =
          Math.sin(elapsed * 0.45 + i * 0.4) * 0.02 * eased;

        const targetPosX =
          s.normal.x * (1 + crackPush) +
          s.radialDir.x * (s.orbitDist - 0.52) * eased;
        const targetPosY =
          s.normal.y * (1 + crackPush) +
          s.radialDir.y * (s.orbitDist - 0.48) * eased +
          floatWave;
        const targetPosZ =
          s.normal.z * (1 - 0.5 * eased) +
          s.radialDir.z * 0.22 * eased;

        mesh.position.set(targetPosX, targetPosY, targetPosZ);

        const angle =
          eased * s.rotAmount + Math.sin(elapsed * 0.35 + i) * 0.05 * eased;
        mesh.quaternion.setFromAxisAngle(s.rotAxis, angle);

        const shardScale = 1 - eased * 0.45;
        mesh.scale.setScalar(shardScale);
      }
    }

    // Update seamless studio portrait reveal
    if (portraitGroupRef.current && portraitShaderRef.current) {
      const revealT = smoothEase(
        THREE.MathUtils.clamp((p - 0.06) / 0.88, 0, 1)
      );

      portraitGroupRef.current.visible = revealT > 0.005;
      // Smooth emergence from inside the core (0.72 -> 1.0)
      const portraitScale = 0.72 + revealT * 0.28;
      portraitGroupRef.current.scale.setScalar(portraitScale);

      // Gentle parallax tilt toward cursor
      const tiltX = THREE.MathUtils.clamp(-dy * 0.14, -0.1, 0.1) * revealT;
      const tiltY = THREE.MathUtils.clamp(dx * 0.14, -0.1, 0.1) * revealT;
      portraitGroupRef.current.rotation.x = THREE.MathUtils.damp(
        portraitGroupRef.current.rotation.x,
        tiltX,
        2.0,
        delta
      );
      portraitGroupRef.current.rotation.y = THREE.MathUtils.damp(
        portraitGroupRef.current.rotation.y,
        tiltY,
        2.0,
        delta
      );

      portraitShaderRef.current.uniforms.uReveal.value = revealT;
    }
  });

  return (
    <group
      ref={rootGroupRef}
      position={[2.55, -0.05, -0.5]}
      scale={isMobile ? 0.75 : 1.12}
    >
      {/* Frameless Studio Portrait Emerging from Core (blends naturally into #0C0D0E) */}
      <group ref={portraitGroupRef} visible={false}>
        <mesh position={[0, -0.04, 0]}>
          <planeGeometry args={[1.55, 2.06]} />
          <shaderMaterial
            ref={portraitShaderRef}
            vertexShader={portraitVertexShader}
            fragmentShader={portraitFragmentShader}
            uniforms={portraitUniforms}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* 80 Faceted Polyhedron Shards */}
      <group ref={shardsGroupRef}>
        {shards.map((shard, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              shardMeshesRef.current[idx] = el;
            }}
            geometry={shard.geometry}
            material={shardMaterial}
            position={shard.normal}
          />
        ))}
      </group>
    </group>
  );
}
