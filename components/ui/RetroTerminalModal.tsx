"use client";

import { useState, useRef, useEffect } from "react";
import { useExperience } from "@/lib/store";
import { about, projects, skills, contact } from "@/data/content";

interface LogEntry {
  type: "input" | "output" | "system" | "error";
  text: string;
}

export function RetroTerminalModal() {
  const { terminalOpen, setTerminalOpen, setChapter } = useExperience();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "system", text: "NOMAN-OS v4.2 // CYBERPUNK KERNEL INITIALIZED" },
    {
      type: "system",
      text: "Type 'help' to see available commands or click quick chips below.",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      inputRef.current?.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommand = (cmdText: string) => {
    const raw = cmdText.trim().toLowerCase();
    if (!raw) return;

    const newLogs: LogEntry[] = [
      ...history,
      { type: "input", text: `$ ${cmdText}` },
    ];

    switch (raw) {
      case "help":
        newLogs.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
• about       - View bio, role & Autowhat.ai intern background
• projects    - View AptiCore, Chatbot Nova & other repositories
• skills      - List tech stack (Next.js, MongoDB, Three.js)
• stats       - View verified impact metrics & graduation CGPI
• contact     - Display email, GitHub & LinkedIn links
• clear       - Wipe terminal screen
• sudo hire   - Initialize direct recruitment handshake`,
        });
        break;

      case "about":
      case "cat about":
        newLogs.push({
          type: "output",
          text: `${about.name.toUpperCase()} — ${about.title.toUpperCase()}
${about.tagline}

ROLE: Full-Stack   Intern @ Autowhat.ai (Aug 2026 - Present)
PREV: Full-Stack Developer @ Saiket Systems (May 2026 - June 2026)
EDU:  B.Sc IT (2023 - 2026) · CGPI: 8.23 / 10`,
        });
        setChapter(1);
        break;

      case "projects":
      case "ls projects":
        newLogs.push({
          type: "output",
          text: `FEATURED BUILDS:
1. AptiCore: Campus Placement Prep Platform (Next.js 15, TypeScript, MongoDB)
2. Chatbot Nova: Gemini AI Assistant (Next.js, API, Gemini)
3. Expense Tracker: Financial Dashboard (Next.js, TypeScript, Tailwind)
4. Hospital & Library Management Systems (Full-stack RBAC portals)

GitHub Profile: https://github.com/Noman2604`,
        });
        setChapter(2);
        break;

      case "skills":
        newLogs.push({
          type: "output",
          text: `CORE CAPABILITIES:
• Frontend: Next.js 15, React, TypeScript, Tailwind CSS, Shadcn UI, Three.js/R3F
• Backend:   , Node.js, REST APIs, Auth & RBAC, JWT Authentication
• Database: MongoDB, Mongoose, Schema Design, Aggregation Pipelines
• Tooling:  Git, GitHub, Vercel, Google Gemini API, Postman`,
        });
        setChapter(4);
        break;

      case "stats":
        newLogs.push({
          type: "output",
          text: `METRICS & ACADEMICS:
• Projects Completed: 10+
• Internships: 3 (Autowhat.ai, Saiket Systems, OctaNet)
• Technologies Mastered: 15+
• Degree CGPI: 8.23 / 10`,
        });
        break;

      case "contact":
        newLogs.push({
          type: "output",
          text: `CONTACT CHANNELS:
• Email:    ${contact.email}
• GitHub:   ${contact.github}
• LinkedIn: ${contact.linkedin}
• Live:     ${contact.portfolio}`,
        });
        setChapter(5);
        break;

      case "sudo hire":
      case "sudo hire noman":
        newLogs.push({
          type: "system",
          text: `ACCESS GRANTED: Excellent decision!
Routing recruitment handshake to nomanpatel07059@gmail.com...
Opening email client...`,
        });
        window.open(
          `mailto:${contact.email}?subject=Full-Stack%20Role%20Inquiry`,
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      default:
        newLogs.push({
          type: "error",
          text: `Command not found: '${raw}'. Type 'help' for command manual.`,
        });
        break;
    }

    setHistory(newLogs);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/85 p-4 backdrop-blur-md">
      <div className="relative flex h-[580px] w-full max-w-2xl flex-col rounded-2xl border border-[#38bdf8]/40 bg-[#090d16] p-5 shadow-[0_0_50px_rgba(56,189,248,0.2)] font-mono text-xs text-[#38bdf8]">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-[#1e293b] pb-3 text-[11px] text-[#64748b]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 text-[#94a3b8]">noman@cyber-station:~</span>
          </div>

          <button
            onClick={() => setTerminalOpen(false)}
            className="rounded px-2 py-0.5 text-xs text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#ffffff]"
          >
            ESC ✕
          </button>
        </div>

        {/* Quick Command Action Chips */}
        <div className="flex flex-wrap gap-2 py-3 border-b border-[#1e293b]">
          <span className="text-[10px] text-[#64748b] self-center">QUICK:</span>
          {[
            "help",
            "about",
            "projects",
            "skills",
            "stats",
            "contact",
            "sudo hire",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => handleCommand(chip)}
              className="rounded-lg border border-[#1e293b] bg-[#0f172a] px-2.5 py-1 text-[10px] text-[#38bdf8] transition hover:border-[#38bdf8] hover:bg-[#1e293b]"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Output Console Log Area */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 select-text leading-relaxed">
          {history.map((h, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${
                h.type === "input"
                  ? "text-[#ffffff] font-semibold"
                  : h.type === "system"
                    ? "text-[#a855f7]"
                    : h.type === "error"
                      ? "text-[#f87171]"
                      : "text-[#38bdf8]/90"
              }`}
            >
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Line */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-[#1e293b] pt-3"
        >
          <span className="text-emerald-400 font-bold">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a command (e.g. 'help', 'projects', 'sudo hire')..."
            className="flex-1 bg-transparent text-sm text-[#ffffff] outline-none placeholder-[#475569]"
          />
          <button
            type="submit"
            className="rounded bg-[#38bdf8]/20 px-3 py-1 text-xs text-[#38bdf8] hover:bg-[#38bdf8]/30 transition"
          >
            EXEC ↵
          </button>
        </form>
      </div>
    </div>
  );
}
