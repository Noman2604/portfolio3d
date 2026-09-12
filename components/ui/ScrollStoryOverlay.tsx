"use client";

import { useExperience } from "@/lib/store";
import { about, projects, skills, contact } from "@/data/content";

export function ScrollStoryOverlay() {
  const {
    chapter,
    setChapter,
    isFreeOrbit,
    openStation,
    viewMode,
    setTerminalOpen,
  } = useExperience();

  if (viewMode === "quick-view") return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {/* Floating Story Card for Active Chapter */}
      {!isFreeOrbit && (
        <div className="pointer-events-auto absolute left-6 sm:left-10 bottom-24 sm:bottom-28 max-w-md animate-fade-in">
          {/* Chapter 0: Hero Cosmic Overview */}
          {chapter === 0 && (
            <div className="rounded-3xl border border-[#38bdf8]/30 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_0_40px_rgba(56,189,248,0.15)] space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#38bdf8]">
                <span>🌌</span> The Nexus Universe
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#ffffff] tracking-tight">
                {about.name}
              </h1>
              <p className="font-mono text-xs text-[#f59e0b]">
                {about.title} • {about.experience[0].role} @{" "}
                {about.experience[0].company}
              </p>
              <p className="text-sm text-[#94a3b8] leading-relaxed">
                {about.tagline} Welcome to my interactive 3D universe. Scroll or
                warp through the beacons to explore my full-stack work.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => setChapter(1)}
                  className="rounded-xl bg-[#38bdf8] px-5 py-2.5 font-mono text-xs font-semibold text-[#090d16] hover:bg-[#7dd3fc] transition shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                >
                  Explore Next Station →
                </button>
                <button
                  onClick={() => setTerminalOpen(true)}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2.5 font-mono text-xs text-[#38bdf8] hover:border-[#38bdf8] transition"
                >
                  Launch Terminal 💻
                </button>
              </div>
            </div>
          )}

          {/* Chapter 1: About & Engineering Background */}
          {chapter === 1 && (
            <div className="rounded-3xl border border-[#38bdf8]/30 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#38bdf8]">
                <span>⚡</span> Station 01 // Developer Workspace
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                About & Experience
              </h2>
              <div className="text-xs text-[#94a3b8] space-y-2">
                <p className="text-sm text-[#e2e8f0] font-medium">
                  {about.experience[0].role} ·{" "}
                  <span className="text-[#38bdf8]">
                    {about.experience[0].company}
                  </span>{" "}
                  ({about.experience[0].period})
                </p>
                <p>{about.bio[0]}</p>
              </div>

              {/* Stats pill row */}
              <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs sm:grid-cols-4">
                {about.stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-[#1e293b] bg-[#0f172a]/70 p-2 text-center"
                  >
                    <div className="font-bold text-[#ffffff]">{s.value}</div>
                    <div className="text-[9px] text-[#64748b]">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => openStation("about")}
                  className="rounded-xl bg-[#38bdf8] px-4 py-2 font-mono text-xs font-semibold text-[#090d16] hover:bg-[#7dd3fc] transition"
                >
                  View Full Bio & Timeline ↗
                </button>
                <button
                  onClick={() => setChapter(2)}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2 font-mono text-xs text-[#e2e8f0] hover:border-[#38bdf8] transition"
                >
                  AptiCore Monolith →
                </button>
              </div>
            </div>
          )}

          {/* Chapter 2: AptiCore Monolith */}
          {chapter === 2 && (
            <div className="rounded-3xl border border-[#f59e0b]/40 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#f59e0b]">
                <span>🏆</span> Station 02 // Flagship Monolith
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                {projects.apticore.name}
              </h2>
              <p className="font-mono text-xs text-[#f59e0b] uppercase tracking-wider">
                {projects.apticore.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {projects.apticore.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {projects.apticore.stack.slice(0, 5).map((s) => (
                  <span
                    key={s}
                    className="rounded border border-[#1e293b] bg-[#0f172a] px-2 py-0.5 font-mono text-[10px] text-[#f59e0b]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={projects.apticore.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#f59e0b] px-4 py-2 font-mono text-xs font-semibold text-[#090d16] hover:bg-[#fbbf24] transition shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                >
                  GitHub Repository ↗
                </a>
                <button
                  onClick={() => openStation("project-apticore")}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2 font-mono text-xs text-[#e2e8f0] hover:border-[#f59e0b] transition"
                >
                  Feature Details
                </button>
              </div>
            </div>
          )}

          {/* Chapter 3: Projects & Repos Satellite */}
          {chapter === 3 && (
            <div className="rounded-3xl border border-[#38bdf8]/40 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#38bdf8]">
                <span>🛰️</span> Station 03 // Open Source Satellite
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                Projects & Repositories
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Chatbot Nova (Gemini AI), Expense Tracker, Hospital & Library
                Management Systems, and 18+ public GitHub repositories.
              </p>

              <div className="space-y-1.5 pt-1">
                {projects.uccops.extraProjects?.slice(0, 2).map((p) => (
                  <a
                    key={p.name}
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-lg border border-[#1e293b] bg-[#0f172a] p-2.5 text-xs text-[#e2e8f0] hover:border-[#38bdf8] transition"
                  >
                    <div>
                      <span className="font-bold text-[#ffffff]">{p.name}</span>
                      <span className="block text-[10px] text-[#64748b]">
                        {p.desc}
                      </span>
                    </div>
                    <span className="text-[#38bdf8]">↗</span>
                  </a>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-[#38bdf8] px-4 py-2 font-mono text-xs font-semibold text-[#090d16] hover:bg-[#7dd3fc] transition"
                >
                  Explore All 18+ Repos ↗
                </a>
                <button
                  onClick={() => openStation("project-uccops")}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2 font-mono text-xs text-[#e2e8f0] hover:border-[#38bdf8] transition"
                >
                  View All
                </button>
              </div>
            </div>
          )}

          {/* Chapter 4: Skills Constellation */}
          {chapter === 4 && (
            <div className="rounded-3xl border border-[#a855f7]/40 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#a855f7]">
                <span>🔮</span> Station 04 // Tech Constellation
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                Capabilities & Stack
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Full-stack toolkit centered around , Next.js 15, TypeScript,
                MongoDB, and modern reactive frontends.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {[
                  "Next.js 15",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "MongoDB",
                  "REST APIs",
                  "Three.js",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-[#1e293b] bg-[#0f172a] px-2.5 py-1 font-mono text-xs text-[#c084fc]"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => openStation("skills")}
                  className="rounded-xl bg-[#a855f7] px-4 py-2 font-mono text-xs font-semibold text-[#090d16] hover:bg-[#c084fc] transition shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                >
                  Inspect Matrix ↗
                </button>
                <button
                  onClick={() => setChapter(5)}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2 font-mono text-xs text-[#e2e8f0] hover:border-[#a855f7] transition"
                >
                  Contact Beacon →
                </button>
              </div>
            </div>
          )}

          {/* Chapter 5: Contact Beacon */}
          {chapter === 5 && (
            <div className="rounded-3xl border border-[#10b981]/40 bg-[#090d16]/80 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#1e293b] bg-[#0f172a] px-3 py-1 font-mono text-xs text-[#10b981]">
                <span>📡</span> Station 05 // Transmission Beacon
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#ffffff]">
                Let&apos;s Connect
              </h2>
              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                Open to internships, freelance projects, and full-stack
                engineering opportunities.
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center justify-between rounded-xl border border-[#1e293b] bg-[#0f172a] p-3 text-[#10b981] hover:border-[#10b981] transition"
                >
                  <span>{contact.email}</span>
                  <span>Email ↗</span>
                </a>
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[#1e293b] bg-[#0f172a] p-3 text-[#38bdf8] hover:border-[#38bdf8] transition"
                >
                  <span>linkedin.com/in/noman-patel</span>
                  <span>LinkedIn ↗</span>
                </a>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setChapter(0)}
                  className="rounded-xl border border-[#1e293b] bg-[#0f172a] px-4 py-2 font-mono text-xs text-[#e2e8f0] hover:border-[#10b981] transition"
                >
                  ↺ Return to Hub
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
