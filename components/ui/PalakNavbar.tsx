"use client";

import { useScrollStore } from "@/lib/scrollStore";
import { Terminal, ArrowUpRight, Sparkles } from "@/components/ui/Icons";

interface NavProps {
  onScrollTo: (id: string) => void;
}

export function PalakNavbar({ onScrollTo }: NavProps) {
  const { terminalOpen, setTerminalOpen, activeSection } = useScrollStore();

  const navItems = [
    { label: "About", id: "about", index: 1 },
    { label: "Stack", id: "stack", index: 2 },
    { label: "Work", id: "work", index: 3 },
    { label: "Experience", id: "experience", index: 4 },
    { label: "Contact", id: "contact", index: 5 },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 backdrop-blur-md bg-[#07090e]/70 border-b border-white/[0.07] transition-all duration-300">
      {/* Brand Monogram */}
      <button
        onClick={() => onScrollTo("hero")}
        className="group flex items-center gap-3 text-left focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full border border-amber-400/40 bg-amber-500/10 flex items-center justify-center font-mono text-xs font-semibold text-amber-300 tracking-wider transition-all duration-300 group-hover:scale-105 group-hover:border-amber-400 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)]">
          NP
        </div>
        <div>
          <span className="block text-sm font-medium tracking-wide text-zinc-100 group-hover:text-amber-300 transition-colors">
            Noman Patel
          </span>
          <span className="block text-[10px] uppercase font-mono tracking-widest text-zinc-400">
            Full-Stack Developer
          </span>
        </div>
      </button>

      {/* Center Nav Links (Desktop) */}
      <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 rounded-full shadow-inner">
        {navItems.map((item) => {
          const isActive = activeSection === item.index;
          return (
            <button
              key={item.id}
              onClick={() => onScrollTo(item.id)}
              className={`px-3 py-1 text-xs font-mono tracking-wider rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-amber-400/20 text-amber-300 border border-amber-400/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Right Controls: Currently Working Badge & Terminal Toggle */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Live Working Status Pill */}
        <button
          onClick={() => onScrollTo("experience")}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 transition-all hover:scale-[1.02]"
          title="Currently working as Full-Stack Next.js Intern at Autowhat.ai"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden lg:inline text-zinc-400 font-sans">Working @</span>
          <span className="font-semibold text-emerald-400">Autowhat.ai</span>
        </button>

        {/* Interactive Terminal Button */}
        <button
          onClick={() => setTerminalOpen(!terminalOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border ${
            terminalOpen
              ? "bg-amber-400 text-black border-amber-400 font-semibold shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              : "bg-white/[0.05] border-white/15 text-zinc-300 hover:text-white hover:border-amber-400/50 hover:bg-amber-500/10"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">CLI</span>
          <span className="text-[10px] text-zinc-400 font-mono tracking-tighter">[&gt;_]</span>
        </button>
      </div>
    </header>
  );
}
