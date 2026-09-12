"use client";

import { useState, useRef, useEffect } from "react";
import { useScrollStore } from "@/lib/scrollStore";
import {
  X,
  Terminal as TerminalIcon,
  CornerDownLeft,
  Sparkles,
  Briefcase,
} from "@/components/ui/Icons";
import { about, projects, skills, contact } from "@/data/content";

interface CommandLog {
  id: string;
  command?: string;
  output: React.ReactNode;
}

export function Terminal() {
  const { terminalOpen, setTerminalOpen } = useScrollStore();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "init-1",
      output: (
        <div className="space-y-1 text-zinc-400 font-mono text-xs">
          <div className="text-amber-400 font-semibold tracking-wider">
            ⚡ NOMAN PATEL CLI v2.4.0 [x86_64-portfolio-core]
          </div>
          <div>
            Type <span className="text-emerald-400 font-bold">working</span> to
            view current role, or{" "}
            <span className="text-amber-300 font-bold">help</span> for all
            commands.
          </div>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [terminalOpen]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const runCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode;

    switch (cmd) {
      case "help":
        output = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="text-amber-400 font-semibold">
              Available Commands:
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 pl-2">
              <div>
                <span className="text-emerald-400 font-bold">working</span> -
                Current job & active projects
              </div>
              <div>
                <span className="text-amber-300 font-bold">about</span> - Bio &
                background
              </div>
              <div>
                <span className="text-sky-400 font-bold">projects</span> -
                Flagship and side repositories
              </div>
              <div>
                <span className="text-purple-400 font-bold">skills</span> - Full
                technology stack
              </div>
              <div>
                <span className="text-rose-400 font-bold">contact</span> -
                Email, LinkedIn, GitHub
              </div>
              <div>
                <span className="text-amber-400 font-bold">hire</span> - Quick
                contact trigger
              </div>
              <div>
                <span className="text-zinc-500 font-bold">clear</span> - Clear
                console output
              </div>
              <div>
                <span className="text-zinc-500 font-bold">exit</span> - Close
                terminal
              </div>
            </div>
          </div>
        );
        break;

      case "working":
      case "current":
      case "status":
      case "now":
        output = (
          <div className="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg text-xs font-mono space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold tracking-wide">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              CURRENT ACTIVE ROLE
            </div>
            <div className="text-zinc-200">
              <span className="text-amber-400 font-bold">Position:</span>{" "}
              Full-Stack Next.js Intern
            </div>
            <div className="text-zinc-200">
              <span className="text-amber-400 font-bold">Company:</span>{" "}
              Autowhat.ai
            </div>
            <div className="text-zinc-200">
              <span className="text-amber-400 font-bold">Timeline:</span> August
              2026 – Present
            </div>
            <div className="text-zinc-300 leading-relaxed border-t border-emerald-500/20 pt-2">
              <span className="text-zinc-400">Description: </span>
              Developing scalable backend microservices, robust REST APIs, and
              full-stack integrations utilizing Next.js, Node.js, and TypeScript
              architecture.
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono">
              Key Focus: Microservices Architecture · REST APIs ·
              High-Throughput Handlers · Next.js
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="text-amber-400 font-semibold">
              {about.name} — {about.title}
            </div>
            <p className="text-zinc-400 leading-relaxed">{about.tagline}</p>
            <div className="space-y-1 text-zinc-300 pt-1">
              {about.bio.map((b, i) => (
                <p key={i}>&gt; {b}</p>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              {about.stats.map((s, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-white/[0.04] border border-white/10"
                >
                  <div className="text-amber-300 font-bold">{s.value}</div>
                  <div className="text-[10px] text-zinc-400">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-3 text-xs font-mono">
            <div className="text-amber-400 font-semibold">Featured Work:</div>
            <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
              <div className="text-amber-300 font-bold">
                {projects.apticore.name} — {projects.apticore.subtitle}
              </div>
              <p className="text-zinc-300 text-[11px] mt-1">
                {projects.apticore.description}
              </p>
              <div className="text-zinc-400 mt-1">
                Stack: {projects.apticore.stack.join(", ")}
              </div>
              <a
                href={projects.apticore.github}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 underline hover:text-amber-300 text-[11px] inline-block mt-1"
              >
                View Repository →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {projects.uccops.extraProjects.map((p, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-white/[0.03] border border-white/10"
                >
                  <div className="text-zinc-200 font-bold">{p.name}</div>
                  <div className="text-zinc-400 text-[11px]">{p.desc}</div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-400 underline text-[10px] inline-block mt-1"
                  >
                    GitHub →
                  </a>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-2 text-xs font-mono">
            <div className="text-amber-400 font-semibold">Technical Stack:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {skills.categories.map((c, i) => (
                <div
                  key={i}
                  className="p-2 rounded bg-white/[0.03] border border-white/10"
                >
                  <div className="text-amber-300 font-semibold text-[11px]">
                    {c.label}
                  </div>
                  <div className="text-zinc-300 text-[11px] mt-1">
                    {c.items.join(" · ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-2 text-xs font-mono text-zinc-300">
            <div className="text-amber-400 font-semibold">Get In Touch:</div>
            <div>
              Email:{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-emerald-400 underline"
              >
                {contact.email}
              </a>
            </div>
            <div>
              GitHub:{" "}
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-sky-400 underline"
              >
                {contact.github}
              </a>
            </div>
            <div>
              LinkedIn:{" "}
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                {contact.linkedin}
              </a>
            </div>
            <div>
              Live Web:{" "}
              <a
                href={contact.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-amber-400 underline"
              >
                {contact.portfolio}
              </a>
            </div>
          </div>
        );
        break;

      case "hire":
      case "sudo hire":
        output = (
          <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-lg text-xs font-mono space-y-2">
            <div className="text-amber-300 font-bold">
              🚀 ACCESS GRANTED — LET&apos;S CONNECT!
            </div>
            <div className="text-zinc-300">
              Opening your mail client to reach Noman Patel...
            </div>
            <a
              href={`mailto:${contact.email}?subject=Opportunity%20Discussion%20with%20Noman%20Patel`}
              className="inline-block px-3 py-1.5 rounded bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors"
            >
              Send Email ({contact.email})
            </a>
          </div>
        );
        break;

      case "clear":
      case "cls":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        setTerminalOpen(false);
        return;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            zsh: command not found: {rawCmd}. Type{" "}
            <span
              className="text-amber-300 font-bold underline cursor-pointer"
              onClick={() => runCommand("help")}
            >
              help
            </span>{" "}
            or{" "}
            <span
              className="text-emerald-400 font-bold underline cursor-pointer"
              onClick={() => runCommand("working")}
            >
              working
            </span>
            .
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: rawCmd,
        output,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
    }
  };

  if (!terminalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#090b10] border border-amber-500/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(245,158,11,0.15)] flex flex-col h-[520px] max-h-[85vh] overflow-hidden">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0d1017] border-b border-white/[0.08] select-none">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer hover:opacity-100"
              onClick={() => setTerminalOpen(false)}
            />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-amber-400" />
              noman@portfolio: ~ (interactive shell)
            </span>
          </div>

          <button
            onClick={() => setTerminalOpen(false)}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console History Output */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs text-zinc-300 scrollbar-thin scrollbar-thumb-zinc-700"
        >
          {history.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-emerald-400 font-bold">
                    noman@dev:~$
                  </span>
                  <span className="text-zinc-100 font-semibold">
                    {item.command}
                  </span>
                </div>
              )}
              <div className="pl-0">{item.output}</div>
            </div>
          ))}
        </div>

        {/* Quick Command Chips */}
        <div className="px-4 py-2 bg-[#0c0f16] border-t border-white/[0.06] flex items-center gap-2 overflow-x-auto text-[11px] font-mono select-none">
          <span className="text-zinc-500 text-[10px] uppercase font-bold shrink-0">
            Suggestions:
          </span>
          {[
            { label: "⚡ working", cmd: "working" },
            { label: "projects", cmd: "projects" },
            { label: "skills", cmd: "skills" },
            { label: "about", cmd: "about" },
            { label: "contact", cmd: "contact" },
            { label: "hire", cmd: "hire" },
            { label: "clear", cmd: "clear" },
          ].map((chip) => (
            <button
              key={chip.cmd}
              onClick={() => runCommand(chip.cmd)}
              className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-amber-300 hover:border-amber-400/40 hover:bg-amber-500/10 transition-colors shrink-0"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Input Prompt */}
        <div className="px-4 py-3 bg-[#080a0f] border-t border-white/[0.08] flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs font-bold shrink-0">
            noman@dev:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'working', 'help', 'projects'..."
            className="flex-1 bg-transparent text-zinc-100 font-mono text-xs focus:outline-none placeholder:text-zinc-600"
          />
          <button
            onClick={() => runCommand(input)}
            className="p-1 rounded text-zinc-400 hover:text-amber-300 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export const PalakTerminal = Terminal;
export default Terminal;
