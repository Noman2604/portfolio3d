"use client";

import { useEffect } from "react";
import { useExperience } from "@/lib/store";
import { about, contact, projects, skills } from "@/data/content";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[#2c3348] px-3 py-1 font-mono text-xs text-[#8b93a7]">
      {children}
    </span>
  );
}

function ProjectBody({ project }: { project: typeof projects.apticore | typeof projects.uccops }) {
  const isAptiCore = "subtitle" in project && project.subtitle.includes("Aptitude");

  return (
    <>
      <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#4fd1c5]">
        {project.subtitle}
      </p>
      <h2 className="mb-4 text-3xl text-[#eef1f5]">{project.name}</h2>
      <p className="mb-5 text-[#b6bccb] leading-relaxed">{project.description}</p>

      <ul className="mb-6 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="flex gap-2 text-sm text-[#b6bccb]">
            <span className="text-[#e8a33d]">—</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Extra projects list if viewing projects & repos */}
      {"extraProjects" in project && project.extraProjects && (
        <div className="mb-6 space-y-2 pt-2 border-t border-[#232a3a]">
          <p className="font-mono text-xs uppercase tracking-wider text-[#4fd1c5] mb-2">Featured Repositories:</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {project.extraProjects.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="group rounded-xl border border-[#232a3a] bg-[#171c28]/60 p-3 transition hover:border-[#4fd1c5]"
              >
                <div className="flex items-center justify-between text-xs font-bold text-[#ffffff] group-hover:text-[#4fd1c5]">
                  <span>{p.name}</span>
                  <span>↗</span>
                </div>
                <div className="text-[11px] text-[#8b93a7] mt-1">{p.desc}</div>
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-6">
        {project.stack.map((s) => (
          <Chip key={s}>{s}</Chip>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#232a3a]">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#232a3a] px-4 py-2 font-mono text-xs text-[#eef1f5] hover:bg-[#2c3348] hover:text-[#4fd1c5] transition"
          >
            GitHub Repository ↗
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[#2c3348] px-4 py-2 font-mono text-xs text-[#e8a33d] hover:border-[#e8a33d] transition"
          >
            Live Showcase ↗
          </a>
        )}
      </div>
    </>
  );
}

export function InfoPanel() {
  const { activeStation, closeStation } = useExperience();

  useEffect(() => {
    if (!activeStation) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeStation();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeStation, closeStation]);

  if (!activeStation) return null;

  const handleClose = () => {
    closeStation();
  };

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b0f1a]/85 p-6 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl border border-[#232a3a] bg-[#12161f] p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 font-mono text-sm text-[#5c6577] hover:text-[#eef1f5] focus:outline-none"
        >
          ESC ×
        </button>

        {activeStation === "about" && (
          <div className="space-y-6">
            <div>
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#4fd1c5]">
                {about.title}
              </p>
              <h2 className="text-3xl font-bold text-[#eef1f5]">{about.name}</h2>
              <p className="mt-1 font-mono text-xs text-[#e8a33d]">{about.tagline}</p>
            </div>

            <div className="space-y-3">
              {about.bio.map((p, idx) => (
                <p key={idx} className="text-[#b6bccb] leading-relaxed text-sm">
                  {p}
                </p>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-4">
              {about.stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-[#232a3a] bg-[#171c28] p-3 text-center">
                  <div className="text-lg font-bold text-[#ffffff]">{s.value}</div>
                  <div className="font-mono text-[10px] text-[#8b93a7]">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Experience timeline */}
            <div className="pt-4 border-t border-[#232a3a] space-y-3">
              <p className="font-mono text-xs uppercase tracking-wider text-[#4fd1c5]">Experience & Education</p>
              <div className="space-y-2.5">
                {about.experience.map((exp, i) => (
                  <div key={i} className="rounded-xl border border-[#232a3a]/60 bg-[#171c28]/40 p-3">
                    <div className="flex items-center justify-between text-xs font-bold text-[#ffffff]">
                      <span>{exp.role} <span className="font-normal text-[#8b93a7]">· {exp.company}</span></span>
                      <span className="font-mono text-[10px] text-[#e8a33d]">{exp.period}</span>
                    </div>
                    <p className="mt-1 text-xs text-[#9ba3b8]">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeStation === "project-apticore" && <ProjectBody project={projects.apticore} />}
        {activeStation === "project-uccops" && <ProjectBody project={projects.uccops} />}

        {activeStation === "skills" && (
          <>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#4fd1c5]">
              Capabilities
            </p>
            <h2 className="mb-5 text-3xl font-bold text-[#eef1f5]">Technical Stack</h2>
            <div className="space-y-5">
              {skills.categories.map((c) => (
                <div key={c.label}>
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.2em] text-[#e8a33d]">
                    {c.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {c.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeStation === "contact" && (
          <>
            <p className="mb-1 font-mono text-xs uppercase tracking-[0.25em] text-[#4fd1c5]">
              Get in touch
            </p>
            <h2 className="mb-5 text-3xl font-bold text-[#eef1f5]">Contact & Links</h2>
            <div className="space-y-3">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-between rounded-xl border border-[#232a3a] bg-[#171c28]/70 p-4 transition hover:border-[#e8a33d] hover:bg-[#171c28]"
              >
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#5c6577]">Email</span>
                  <span className="font-mono text-sm text-[#eef1f5]">{contact.email}</span>
                </div>
                <span className="font-mono text-xs text-[#e8a33d]">Send email ↗</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#232a3a] bg-[#171c28]/70 p-4 transition hover:border-[#4fd1c5] hover:bg-[#171c28]"
              >
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#5c6577]">GitHub</span>
                  <span className="font-mono text-sm text-[#eef1f5]">github.com/Noman2604</span>
                </div>
                <span className="font-mono text-xs text-[#4fd1c5]">View Repos ↗</span>
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#232a3a] bg-[#171c28]/70 p-4 transition hover:border-[#e8a33d] hover:bg-[#171c28]"
              >
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#5c6577]">LinkedIn</span>
                  <span className="font-mono text-sm text-[#eef1f5]">linkedin.com/in/noman-patel</span>
                </div>
                <span className="font-mono text-xs text-[#e8a33d]">Connect ↗</span>
              </a>
              <a
                href={contact.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-xl border border-[#232a3a] bg-[#171c28]/70 p-4 transition hover:border-[#4fd1c5] hover:bg-[#171c28]"
              >
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#5c6577]">Live Portfolio</span>
                  <span className="font-mono text-sm text-[#eef1f5]">nomanpatel.vercel.app</span>
                </div>
                <span className="font-mono text-xs text-[#4fd1c5]">Visit ↗</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
