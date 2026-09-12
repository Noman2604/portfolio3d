"use client";

import { about, projects, skills, contact } from "@/data/content";
import { useScrollStore } from "@/lib/scrollStore";
import {
  ArrowUpRight,
  Terminal,
  Code2,
  Database,
  Layers,
  Cpu,
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Sparkles,
  Briefcase,
  GraduationCap,
} from "@/components/ui/Icons";

export interface SectionsProps {
  onScrollTo: (id: string) => void;
}
export type SectionProps = SectionsProps;

export function Sections({ onScrollTo }: SectionsProps) {
  const { setTerminalOpen } = useScrollStore();

  return (
    <div className="relative z-10 w-full text-zinc-100 pointer-events-auto">
      {/* =========================================================================
          SECTION 1: HERO
          ========================================================================= */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-28 pb-16 max-w-7xl mx-auto"
      >
        <div className="max-w-4xl space-y-6">
          {/* Section Monospace Sub-header */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/4 border border-white/10 text-xs font-mono text-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>01 // ARCHITECTURE & SYSTEMS</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.04] tracking-tight text-zinc-100">
            Full-stack engineer crafting{" "}
            <span className="text-amber-200 underline decoration-amber-400/40 decoration-wavy underline-offset-8">
              considered web systems
            </span>{" "}
            & real-time products.
          </h1>

          {/* Bio Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed">
            I&apos;m{" "}
            <strong className="font-semibold text-white">Noman Patel</strong>. I
            build full-stack web applications end to end — from data models and
            Next.js microservices to the pixels people click on.
          </p>

          {/* Currently Working Live Status Alert Card */}
          <div className="p-4 rounded-xl bg-linear-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border border-emerald-500/30 backdrop-blur-md max-w-2xl">
            <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-300 font-semibold mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              CURRENTLY WORKING
            </div>
            <div className="text-sm font-medium text-zinc-100">
              Full-Stack Next.js Intern @{" "}
              <span className="text-emerald-300 font-semibold">
                Autowhat.ai
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-1">
              August 2026 – Present · Engineering backend microservices, REST
              APIs, and TypeScript integrations.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onScrollTo("about")}
              className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium text-sm hover:bg-amber-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.15)] group"
            >
              <span>Explore Role & Architecture</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => setTerminalOpen(true)}
              className="px-5 py-3 rounded-full bg-white/5 border border-white/15 text-zinc-200 font-mono text-xs hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Launch Terminal CLI</span>
            </button>

            <button
              onClick={() => onScrollTo("work")}
              className="px-5 py-3 rounded-full text-zinc-400 hover:text-white font-mono text-xs transition-colors"
            >
              Jump to AptiCore →
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ABOUT & CURRENT WORK
          ========================================================================= */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              02 // CURRENT STATUS & ENGINEERING FOCUS
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-zinc-100">
              &ldquo;From the click to the query plan.&rdquo;
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              A comprehensive view into where I am currently contributing, how I
              architect web software, and what drives my work.
            </p>
          </div>

          {/* 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Currently Working Spotlight Card */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0b0e14]/80 border border-emerald-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold tracking-wider">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    ACTIVE POSITION
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">
                    Aug 2026 – Present
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">
                  Full-Stack Next.js Intern
                </h3>
                <div className="text-emerald-400 font-mono text-sm font-medium mb-4">
                  @ Autowhat.ai
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                  Developing scalable backend microservices, robust REST APIs,
                  and full-stack integrations utilizing Next.js, Node.js, and
                  TypeScript architecture. Focused on high-availability request
                  handlers, maintainable patterns, and performant data
                  processing.
                </p>

                <div className="space-y-2 pt-4 border-t border-white/8">
                  <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Core Specializations:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Next.js",
                      "Node.js",
                      "TypeScript",
                      "REST APIs",
                      "Microservices",
                      "MongoDB",
                      "Backend Architecture",
                    ].map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-emerald-950/40 border border-emerald-500/25 text-emerald-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Past Professional Milestone */}
              <div className="p-6 rounded-2xl bg-white/2 border border-white/8 backdrop-blur-md">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>PREVIOUS INTERNSHIP</span>
                  <span>May 2026 – Jun 2026</span>
                </div>
                <h4 className="text-lg font-semibold text-zinc-100">
                  Full-Stack Developer @ Saiket Systems
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  Designed and built end-to-end applications with a focus on
                  reusable architecture, clean handoff points, and performant
                  interfaces using Next.js, React, and MongoDB.
                </p>
              </div>
            </div>

            {/* Right Column: Bio Narrative & Stats */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-xl space-y-4">
                <h3 className="text-lg font-semibold text-amber-300 font-mono">
                  // Engineering Philosophy
                </h3>
                {about.bio.map((para, i) => (
                  <p
                    key={i}
                    className="text-zinc-300 text-sm sm:text-base leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                {about.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/3 border border-white/8 hover:border-amber-400/30 transition-colors"
                  >
                    <div className="font-serif italic text-3xl sm:text-4xl text-amber-200">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 mt-1 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE STACK, LAYER BY LAYER
          ========================================================================= */}
      <section
        id="stack"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="space-y-12">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              03 // ARCHITECTURAL STACK
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-zinc-100">
              The Stack, layer by layer.
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              Every tool chosen for reliability, developer velocity, and
              maintainable production systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Layer 1: Client Layer */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b11]/80 border border-white/8 backdrop-blur-xl relative group hover:border-amber-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-amber-400">
                    LAYER 01
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Client & Interface
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                Responsive, accessible web interfaces engineered with
                component-first thinking and fluid animations.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js 15",
                  "React",
                  "TypeScript",
                  "Tailwind CSS",
                  "Shadcn UI",
                  "HTML5 / CSS3",
                  "Three.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/4 border border-white/10 text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 2: Backend & Microservices */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b11]/80 border border-emerald-500/20 backdrop-blur-xl relative group hover:border-emerald-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-emerald-400">
                    LAYER 02 // ACTIVE FOCUS
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    APIs & Microservices
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                Modular controllers, robust middleware, authentication, and
                secure request validation pipelines.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "Next.js API Routes",
                  "Node.js",
                  "REST APIs",
                  "JWT Auth",
                  "RBAC",
                  "Middleware",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-950/30 border border-emerald-500/30 text-emerald-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 3: Database & Models */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b11]/80 border border-white/8 backdrop-blur-xl relative group hover:border-sky-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-sky-400">LAYER 03</div>
                  <h3 className="text-lg font-semibold text-white">
                    Database & Modeling
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                Clean document schemas, indexing strategies, relationship
                references, and fast query execution.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "MongoDB",
                  "Mongoose",
                  "Schema Design",
                  "Aggregation Pipelines",
                  "Indexing",
                  "Data Integrity",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/4 border border-white/10 text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Layer 4: Tooling & AI */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#090b11]/80 border border-white/8 backdrop-blur-xl relative group hover:border-purple-400/40 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-purple-400">
                    LAYER 04
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    Ecosystem & AI
                  </h3>
                </div>
              </div>
              <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                Production deployment, AI integration via LLM APIs, version
                management, and automated workflows.
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Google Gemini API",
                  "Git & GitHub",
                  "Vercel",
                  "Postman",
                  "VS Code",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/4 border border-white/10 text-zinc-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: FLAGSHIP WORK (APTICORE)
          ========================================================================= */}
      <section
        id="work"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="space-y-10">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              04 // FLAGSHIP APPLICATION
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-zinc-100">
              AptiCore — Campus placement preparation engine.
            </h2>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#090b10]/85 border border-amber-500/30 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
            <div className="max-w-3xl space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                {projects.apticore.stack.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-mono bg-amber-400/10 border border-amber-400/20 text-amber-300"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="text-zinc-200 text-base sm:text-lg leading-relaxed">
                {projects.apticore.description}
              </p>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Architectural Highlights:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.apticore.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/8">
                <a
                  href={projects.apticore.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-amber-400 text-black font-semibold text-xs hover:bg-amber-300 transition-all duration-300 flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  <span>View AptiCore Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={projects.apticore.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-full bg-white/5 border border-white/15 text-zinc-200 font-mono text-xs hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live Platform Preview</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: OTHER PROJECTS & REPOSITORIES
          ========================================================================= */}
      <section
        id="projects"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="space-y-12">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              05 // REPOSITORIES & EXPERIMENTS
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-zinc-100">
              More software in production.
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              Explore specialized full-stack products spanning AI agents,
              financial trackers, and enterprise administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.uccops.extraProjects.map((p, i) => (
              <div
                key={i}
                className="p-6 sm:p-8 rounded-2xl bg-white/2 border border-white/8 backdrop-blur-xl hover:border-amber-400/40 hover:bg-white/4 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-500">
                      0{i + 1} // REPO
                    </span>
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg bg-white/5 text-zinc-400 group-hover:text-amber-300 group-hover:bg-amber-400/10 transition-colors"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-amber-200 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-6 mt-4 border-t border-white/6">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/4 text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: EXPERIENCE & CAREER
          ========================================================================= */}
      <section
        id="experience"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="space-y-12">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              06 // CAREER TIMELINE
            </div>
            <h2 className="font-serif italic font-normal text-3xl sm:text-5xl md:text-6xl text-zinc-100">
              Where I&apos;ve built and grown.
            </h2>
            <p className="text-zinc-400 max-w-2xl text-base">
              A chronological view of professional internships and educational
              foundation.
            </p>
          </div>

          <div className="space-y-6">
            {about.experience.map((exp, i) => {
              const isCurrent = exp.company === "Autowhat.ai";
              return (
                <div
                  key={i}
                  className={`p-6 sm:p-8 rounded-2xl backdrop-blur-xl border transition-all duration-300 ${
                    isCurrent
                      ? "bg-linear-to-r from-emerald-950/40 via-[#0b0e14]/90 to-[#0b0e14]/90 border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                      : "bg-white/2 border-white/8 hover:border-white/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      {isCurrent ? (
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <Briefcase className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                          {exp.role.includes("Graduation") ? (
                            <GraduationCap className="w-4 h-4" />
                          ) : (
                            <Briefcase className="w-4 h-4" />
                          )}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-white">
                          {exp.role}
                        </h3>
                        <div className="text-xs font-mono text-amber-300">
                          {exp.company}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCurrent && (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          CURRENT ROLE
                        </span>
                      )}
                      <span className="text-xs font-mono text-zinc-400">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 mt-3 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: CONTACT & FOOTER
          ========================================================================= */}
      <section
        id="contact"
        className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 py-24 max-w-7xl mx-auto"
      >
        <div className="p-8 sm:p-14 rounded-3xl bg-linear-to-b from-white/4 to-black/80 border border-white/10 backdrop-blur-2xl space-y-8">
          <div className="space-y-3">
            <div className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              07 // CONTACT & COLLABORATION
            </div>
            <h2 className="font-serif italic font-normal text-4xl sm:text-6xl md:text-7xl text-zinc-100">
              Let&apos;s build something enduring.
            </h2>
            <p className="text-zinc-300 max-w-xl text-base sm:text-lg">
              Open for full-stack software engineering discussions, team
              collaborations, and high-impact web products.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href={`mailto:${contact.email}`}
              className="px-8 py-4 rounded-full bg-amber-400 text-black font-semibold text-sm hover:bg-amber-300 transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(245,158,11,0.3)]"
            >
              <Mail className="w-4 h-4" />
              <span>{contact.email}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setTerminalOpen(true)}
              className="px-6 py-4 rounded-full bg-white/5 border border-white/15 text-zinc-200 font-mono text-xs hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-amber-400" />
              <span>Type &apos;hire&apos; in Terminal</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/8 text-xs font-mono text-zinc-400">
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub / Noman2604</span>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span>LinkedIn / Noman Patel</span>
            </a>
            <a
              href={contact.portfolio}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>nomanpatel.vercel.app</span>
            </a>
            <span className="ml-auto text-zinc-600">
              © {new Date().getFullYear()} Noman Patel · Crafted with Next.js &
              Three.js
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sections;
