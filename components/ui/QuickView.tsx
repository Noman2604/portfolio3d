"use client";

import { useExperience } from "@/lib/store";
import { about, projects, skills, contact } from "@/data/content";
import { useState } from "react";

export function QuickView() {
  const { viewMode, setViewMode } = useExperience();
  const [copied, setCopied] = useState(false);

  if (viewMode !== "quick-view") return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0b0f1a]/95 backdrop-blur-xl text-[#eef1f5]">
      {/* Top sticky nav */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#1f2738] bg-[#0b0f1a]/80 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
          <span className="font-mono text-sm tracking-wide text-[#eef1f5]">
            {about.name} <span className="text-[#e8a33d]">/</span> Quick View
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("3d")}
            className="flex items-center gap-2 rounded-full border border-[#4fd1c5] bg-[#4fd1c5]/10 px-4 py-1.5 font-mono text-xs text-[#4fd1c5] transition hover:bg-[#4fd1c5] hover:text-[#0b0f1a]"
          >
            <span>🎮</span> Return to 3D Room
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-4xl px-6 py-12 space-y-16">
        {/* Hero Section */}
        <section className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#232a3a] bg-[#12161f] px-3.5 py-1 font-mono text-xs text-[#4fd1c5]">
            <span>⚡</span> {about.title} • Available for opportunities
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-[#ffffff] leading-[1.1]">
            {about.tagline}
          </h1>
          <div className="max-w-2xl space-y-3 text-[#9ba3b8] text-base sm:text-lg leading-relaxed">
            {about.bio.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-xl bg-[#4fd1c5] px-6 py-3 font-mono text-sm font-medium text-[#0b0f1a] transition hover:bg-[#38bdf8] shadow-[0_0_20px_rgba(79,209,197,0.3)]"
            >
              Get in touch ↗
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[#2c3348] bg-[#12161f] px-6 py-3 font-mono text-sm text-[#eef1f5] transition hover:border-[#4fd1c5] hover:bg-[#171c28]"
            >
              GitHub Profile ↗
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[#2c3348] bg-[#12161f] px-6 py-3 font-mono text-sm text-[#eef1f5] transition hover:border-[#e8a33d] hover:bg-[#171c28]"
            >
              LinkedIn ↗
            </a>
            <button
              onClick={handleCopyEmail}
              className="rounded-xl border border-[#2c3348] bg-[#12161f] px-5 py-3 font-mono text-sm text-[#e8a33d] transition hover:border-[#e8a33d]"
            >
              {copied ? "✓ Copied Email!" : "Copy Email"}
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 pt-4 sm:grid-cols-4">
            {about.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-[#232a3a] bg-[#12161f]/80 p-4 backdrop-blur-sm"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#ffffff]">{s.value}</div>
                <div className="mt-1 font-mono text-xs text-[#8b93a7]">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Project: AptiCore */}
        <section className="space-y-6">
          <div className="border-b border-[#1f2738] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#4fd1c5]">
              Flagship Build
            </h2>
            <p className="text-2xl font-bold text-[#ffffff]">{projects.apticore.name} — {projects.apticore.subtitle}</p>
          </div>

          <div className="rounded-2xl border border-[#232a3a] bg-[#12161f]/80 p-6 sm:p-8 backdrop-blur-sm space-y-6 transition hover:border-[#e8a33d]/60">
            <div>
              <p className="text-base text-[#b6bccb] leading-relaxed">{projects.apticore.description}</p>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {projects.apticore.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#eef1f5]">
                    <span className="text-[#e8a33d] font-bold">—</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {projects.apticore.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md border border-[#232a3a] bg-[#171c28] px-3 py-1 font-mono text-xs text-[#4fd1c5]"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-[#1f2738]">
              <a
                href={projects.apticore.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl bg-[#232a3a] px-5 py-2.5 font-mono text-xs text-[#ffffff] hover:bg-[#2c3348] hover:text-[#4fd1c5] transition"
              >
                View Repository on GitHub ↗
              </a>
              <a
                href={projects.apticore.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-xl border border-[#2c3348] px-5 py-2.5 font-mono text-xs text-[#e8a33d] hover:border-[#e8a33d] transition"
              >
                Live Showcase ↗
              </a>
            </div>
          </div>
        </section>

        {/* More Projects Showcase */}
        <section className="space-y-6">
          <div className="border-b border-[#1f2738] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#4fd1c5]">
              Other Projects
            </h2>
            <p className="text-2xl font-bold text-[#ffffff]">Full-Stack & Open Source Builds</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.uccops.extraProjects?.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col justify-between rounded-2xl border border-[#232a3a] bg-[#12161f]/60 p-5 transition hover:border-[#4fd1c5] hover:bg-[#12161f]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-[#ffffff] group-hover:text-[#4fd1c5] transition">
                      {p.name}
                    </h3>
                    <span className="font-mono text-xs text-[#5c6577] group-hover:text-[#4fd1c5]">↗</span>
                  </div>
                  <p className="mt-2 text-sm text-[#8b93a7]">{p.desc}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-[#232a3a] bg-[#171c28] px-2 py-0.5 font-mono text-[10px] text-[#9ba3b8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section className="space-y-6">
          <div className="border-b border-[#1f2738] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#4fd1c5]">
              Career Path
            </h2>
            <p className="text-2xl font-bold text-[#ffffff]">Experience & Education</p>
          </div>

          <div className="space-y-4">
            {about.experience.map((exp, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#232a3a] bg-[#12161f]/60 p-6 backdrop-blur-sm space-y-2"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-lg font-bold text-[#ffffff]">
                    {exp.role} <span className="font-normal text-[#4fd1c5]">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-[#e8a33d]">{exp.period}</span>
                </div>
                <p className="text-sm text-[#9ba3b8] leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="space-y-6">
          <div className="border-b border-[#1f2738] pb-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-[#4fd1c5]">
              Capabilities
            </h2>
            <p className="text-2xl font-bold text-[#ffffff]">Skills & Technologies</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.categories.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-[#232a3a] bg-[#12161f]/60 p-5 backdrop-blur-sm"
              >
                <h3 className="font-mono text-xs uppercase tracking-wider text-[#e8a33d] mb-3">
                  {c.label}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {c.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-[#232a3a] bg-[#171c28] px-2.5 py-1 font-mono text-xs text-[#eef1f5]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="rounded-2xl border border-[#232a3a] bg-gradient-to-br from-[#12161f] to-[#0e1219] p-8 text-center space-y-6">
          <h2 className="text-3xl font-bold text-[#ffffff]">Open to internships & full-stack roles.</h2>
          <p className="mx-auto max-w-md text-sm text-[#9ba3b8]">
            If you&apos;re building something that needs a full-stack developer who ships clean, performant products, let&apos;s talk.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="rounded-xl bg-[#e8a33d] px-6 py-3 font-mono text-sm font-medium text-[#0b0f1a] transition hover:bg-[#f59e0b]"
            >
              {contact.email} ↗
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#2c3348] bg-[#171c28] px-6 py-3 font-mono text-sm text-[#eef1f5] transition hover:border-[#4fd1c5]"
            >
              GitHub (Noman2604) ↗
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#2c3348] bg-[#171c28] px-6 py-3 font-mono text-sm text-[#eef1f5] transition hover:border-[#4fd1c5]"
            >
              LinkedIn ↗
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
