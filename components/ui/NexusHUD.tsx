"use client";

import { useExperience } from "@/lib/store";
import { about } from "@/data/content";

const CHAPTERS = [
  { id: 0, label: "Cosmic Hub" },
  { id: 1, label: "About & Exp" },
  { id: 2, label: "AptiCore" },
  { id: 3, label: "Projects & AI" },
  { id: 4, label: "Tech Stack" },
  { id: 5, label: "Contact" },
];

export function NexusHUD() {
  const {
    chapter,
    setChapter,
    isFreeOrbit,
    setFreeOrbit,
    setTerminalOpen,
    viewMode,
    setViewMode,
    soundEnabled,
    toggleSound,
    activeStation,
  } = useExperience();

  if (viewMode === "quick-view" || activeStation) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <header className="pointer-events-auto flex flex-wrap items-start justify-between gap-3">
        {/* Brand & Live Status */}
        <div className="flex flex-col gap-1 rounded-2xl border border-[#1e293b]/90 bg-[#090d16]/85 p-3.5 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#ffffff] font-bold">
              {about.name}
            </span>
            <span className="rounded bg-[#38bdf8]/15 px-2 py-0.5 font-mono text-[10px] text-[#38bdf8]">
              v4.0 Nexus
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#94a3b8]">
            Full-Stack Intern @ Autowhat.ai • Available for hire
          </span>
        </div>

        {/* Top Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#1e293b]/90 bg-[#090d16]/85 p-2 backdrop-blur-md shadow-2xl">
          {/* Mode Switcher: Storytelling vs Free Orbit */}
          <button
            onClick={() => setFreeOrbit(!isFreeOrbit)}
            title={
              isFreeOrbit
                ? "Switch to Guided Story Mode"
                : "Switch to Free 360° Orbit Mode"
            }
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs transition ${
              isFreeOrbit
                ? "border-[#38bdf8] bg-[#38bdf8]/20 text-[#38bdf8]"
                : "border-[#1e293b] bg-[#0f172a] text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#ffffff]"
            }`}
          >
            <span>{isFreeOrbit ? "🛰️" : "📜"}</span>
            <span className="hidden sm:inline">
              {isFreeOrbit ? "Free Orbit" : "Story Flight"}
            </span>
          </button>

          {/* Interactive CLI Terminal */}
          <button
            onClick={() => setTerminalOpen(true)}
            title="Open Interactive Cyberpunk Terminal"
            className="flex items-center gap-1.5 rounded-xl border border-[#1e293b] bg-[#0f172a] px-3 py-1.5 font-mono text-xs text-[#38bdf8] transition hover:border-[#38bdf8] hover:bg-[#1e293b]"
          >
            <span>💻</span>
            <span className="hidden sm:inline">Terminal</span>
          </button>

          {/* 2D Quick View for Recruiters */}
          <button
            onClick={() => setViewMode("quick-view")}
            title="Open Recruiter 2D View"
            className="flex items-center gap-1.5 rounded-xl border border-[#1e293b] bg-[#0f172a] px-3 py-1.5 font-mono text-xs text-[#eef1f5] transition hover:border-[#f59e0b] hover:text-[#f59e0b]"
          >
            <span>📄</span>
            <span className="hidden sm:inline">2D View</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={
              soundEnabled ? "Mute audio" : "Enable sci-fi procedural audio"
            }
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-[#1e293b] bg-[#0f172a] text-xs transition hover:border-[#38bdf8]"
          >
            {soundEnabled ? "🔊" : "🔇"}
          </button>
        </div>
      </header>

      {/* Center Orbit Hint (shown when in free orbit) */}
      {isFreeOrbit && (
        <div className="pointer-events-none mx-auto rounded-full border border-[#38bdf8]/30 bg-[#090d16]/80 px-4 py-1.5 font-mono text-[11px] text-[#38bdf8] backdrop-blur-sm animate-pulse">
          Drag to orbit 360° • Scroll to zoom • Click any station beacon
        </div>
      )}

      {/* Bottom Fast Warp Navigation Dock */}
      <footer className="pointer-events-auto flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-[#1e293b]/90 bg-[#090d16]/90 p-2 backdrop-blur-md shadow-2xl">
          <span className="hidden lg:inline px-3 font-mono text-[10px] uppercase tracking-widest text-[#64748b]">
            WARP TO:
          </span>
          {CHAPTERS.map((c) => (
            <button
              key={c.id}
              onClick={() => setChapter(c.id)}
              className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono text-xs transition ${
                chapter === c.id
                  ? "border-[#38bdf8] bg-[#38bdf8]/20 text-[#38bdf8] font-bold shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                  : "border-[#1e293b] bg-[#0f172a] text-[#94a3b8] hover:border-[#38bdf8] hover:text-[#ffffff]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  chapter === c.id ? "bg-[#38bdf8]" : "bg-[#475569]"
                }`}
              />
              {c.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
}
