"use client";

import React, { useState } from "react";
import { FullGlobe } from "@/components/ui/globe";
import { 
  Globe2, 
  RotateCw, 
  Pause, 
  Play, 
  MapPin, 
  Sparkles, 
  Sliders, 
  Compass,
  Layers
} from "lucide-react";

interface CityPreset {
  name: string;
  country: string;
  location: [number, number];
}

const CITIES: CityPreset[] = [
  { name: "San Francisco", country: "USA", location: [37.7749, -122.4194] },
  { name: "Tokyo", country: "Japan", location: [35.6762, 139.6503] },
  { name: "London", country: "UK", location: [51.5074, -0.1278] },
  { name: "Mumbai", country: "India", location: [19.076, 72.8777] },
  { name: "Dubai", country: "UAE", location: [25.2048, 55.2708] },
  { name: "Singapore", country: "Singapore", location: [1.3521, 103.8198] },
  { name: "Sydney", country: "Australia", location: [-33.8688, 151.2093] },
];

type ThemeKey = "magic-dark" | "emerald" | "cyberpunk" | "monochrome";

interface ThemeConfig {
  name: string;
  baseColor: [number, number, number];
  markerColor: [number, number, number];
  glowColor: [number, number, number];
  arcColor: [number, number, number];
  dark: number;
  diffuse: number;
  mapBrightness: number;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  "magic-dark": {
    name: "Magic UI Dark",
    baseColor: [0.35, 0.35, 0.35],
    markerColor: [1, 0.45, 0.15], // Neon Orange
    glowColor: [0.15, 0.3, 0.55], // Deep Cyan/Blue
    arcColor: [0.3, 0.7, 1], // Sky Blue
    dark: 1,
    diffuse: 1.4,
    mapBrightness: 5.5,
  },
  emerald: {
    name: "Emerald Aurora",
    baseColor: [0.2, 0.35, 0.28],
    markerColor: [0.1, 1, 0.6], // Mint neon
    glowColor: [0.08, 0.4, 0.25], // Emerald glow
    arcColor: [0.2, 0.9, 0.5], // Spring green
    dark: 1,
    diffuse: 1.2,
    mapBrightness: 6,
  },
  cyberpunk: {
    name: "Cyber Neon",
    baseColor: [0.35, 0.25, 0.4],
    markerColor: [1, 0.2, 0.7], // Neon Pink/Magenta
    glowColor: [0.4, 0.15, 0.5], // Violet
    arcColor: [0.9, 0.3, 1], // Purple Arc
    dark: 1,
    diffuse: 1.5,
    mapBrightness: 6,
  },
  monochrome: {
    name: "Monochrome Studio",
    baseColor: [0.6, 0.6, 0.6],
    markerColor: [1, 1, 1], // Pure White
    glowColor: [0.3, 0.3, 0.3], // White/Silver halo
    arcColor: [0.8, 0.8, 0.8], // Silver Arc
    dark: 1,
    diffuse: 1.1,
    mapBrightness: 4.5,
  },
};

export function GlobeDemo() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [selectedCity, setSelectedCity] = useState<CityPreset | null>(CITIES[0]);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("magic-dark");

  const theme = THEMES[currentTheme];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 space-y-8 font-sans">
      {/* Top Banner / Hero header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-sky-400 text-xs font-mono tracking-wide">
          <Globe2 className="w-3.5 h-3.5 animate-spin [animation-duration:8s]" />
          <span>FULL 360° WEBGL GLOBE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Full Interactive 3D Globe
        </h1>

        <p className="text-neutral-400 max-w-2xl text-sm md:text-base leading-relaxed">
          Inspired by Magic UI&apos;s WebGL dot-matrix globe, redesigned for full spherical viewability with complete 360° drag rotation, flight arcs, city markers, and dynamic coordinates.
        </p>
      </div>

      {/* Main Interactive Stage */}
      <div className="relative rounded-2xl border border-neutral-800 bg-[#0d1017]/80 backdrop-blur-xl p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-sky-500/10 blur-[130px] rounded-full -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: City Navigator & Telemetry */}
          <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            {/* Active Node Telemetry Card */}
            <div className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  COORDINATES
                </span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  ONLINE
                </span>
              </div>

              <div>
                <div className="text-xl font-bold text-white tracking-tight">
                  {selectedCity ? selectedCity.name : "Free Navigation"}
                </div>
                <div className="text-xs text-neutral-400">
                  {selectedCity ? selectedCity.country : "Rotate using pointer drag"}
                </div>
              </div>

              {selectedCity && (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-800 text-xs font-mono">
                  <div className="bg-neutral-950/60 p-2 rounded border border-neutral-800/50">
                    <span className="text-neutral-500 block text-[10px]">LATITUDE</span>
                    <span className="text-sky-300 font-medium">
                      {selectedCity.location[0].toFixed(4)}°
                    </span>
                  </div>
                  <div className="bg-neutral-950/60 p-2 rounded border border-neutral-800/50">
                    <span className="text-neutral-500 block text-[10px]">LONGITUDE</span>
                    <span className="text-sky-300 font-medium">
                      {selectedCity.location[1].toFixed(4)}°
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Fly-To City Buttons */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-400" />
                Fly To City (Auto-Focus)
              </label>
              <div className="flex flex-wrap gap-2">
                {CITIES.map((city) => {
                  const isSelected = selectedCity?.name === city.name;
                  return (
                    <button
                      key={city.name}
                      onClick={() => setSelectedCity(city)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border ${
                        isSelected
                          ? "bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                          : "bg-neutral-900/60 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800"
                      }`}
                    >
                      {city.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Themes Selector */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase text-neutral-400 tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(THEMES) as ThemeKey[]).map((key) => {
                  const isCurrent = currentTheme === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setCurrentTheme(key)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium text-left border transition-all ${
                        isCurrent
                          ? "bg-neutral-800 text-white border-sky-400/50 shadow-sm"
                          : "bg-neutral-900/40 text-neutral-400 border-neutral-800 hover:text-neutral-200"
                      }`}
                    >
                      {THEMES[key].name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto-rotate Toggle */}
            <div className="pt-2">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-700/80 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 text-xs font-medium transition-all"
              >
                {autoRotate ? (
                  <>
                    <Pause className="w-4 h-4 text-amber-400" />
                    Pause Auto-Spin
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-emerald-400" />
                    Resume Auto-Spin
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right/Center Column: The True Full Globe */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center relative order-1 lg:order-2">
            {/* Interactive hint floating badge */}
            <div className="absolute top-0 right-4 z-20 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-800 text-[11px] text-neutral-400 backdrop-blur-md">
              <RotateCw className="w-3 h-3 text-sky-400 animate-spin" />
              <span>Drag in any direction to rotate</span>
            </div>

            {/* The Full Globe Component */}
            <div className="w-full max-w-[540px] aspect-square flex items-center justify-center">
              <FullGlobe
                autoRotate={autoRotate}
                autoRotateSpeed={0.0035}
                enableDrag={true}
                focusLocation={selectedCity ? selectedCity.location : null}
                baseColor={theme.baseColor}
                markerColor={theme.markerColor}
                glowColor={theme.glowColor}
                arcColor={theme.arcColor}
                dark={theme.dark}
                diffuse={theme.diffuse}
                mapBrightness={theme.mapBrightness}
                showAtmosphereGlow={true}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Code Snippet / Integration Guide */}
      <div className="rounded-xl border border-neutral-800 bg-[#0d1017]/60 p-6 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span>How to use the Full Globe in your project</span>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          Import <code className="text-sky-300 font-mono">FullGlobe</code> from{" "}
          <code className="text-sky-300 font-mono">@/components/ui/globe</code>. It renders a complete, uncapped 360° sphere with full drag physics, customizable markers, and animated connecting arcs:
        </p>

        <div className="rounded-lg bg-neutral-950 p-4 border border-neutral-800/80 font-mono text-xs text-neutral-300 overflow-x-auto">
          <pre>{`import { FullGlobe } from "@/components/ui/globe";

export default function MySection() {
  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto">
      <FullGlobe
        autoRotate={true}
        enableDrag={true}
        focusLocation={[37.7749, -122.4194]} // optional: auto-focus to [lat, lng]
      />
    </div>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}

export default GlobeDemo;

