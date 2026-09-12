"use client";

import { useScrollStore } from "@/lib/scrollStore";

interface DotNavProps {
  onScrollTo: (id: string) => void;
}

const SECTIONS = [
  { id: "hero", label: "01 // Hero", index: 0 },
  { id: "about", label: "02 // Architecture & Role", index: 1 },
  { id: "stack", label: "03 // The Stack", index: 2 },
  { id: "work", label: "04 // AptiCore", index: 3 },
  { id: "projects", label: "05 // Projects", index: 4 },
  { id: "experience", label: "06 // Experience", index: 5 },
  { id: "contact", label: "07 // Contact", index: 6 },
];

export function DotNavigation({ onScrollTo }: DotNavProps) {
  const { activeSection } = useScrollStore();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-auto">
      {SECTIONS.map((sec) => {
        const isActive = activeSection === sec.index;
        return (
          <button
            key={sec.id}
            onClick={() => onScrollTo(sec.id)}
            className="group flex items-center gap-3 py-1 text-right focus:outline-none"
            aria-label={`Scroll to ${sec.label}`}
          >
            {/* Hover Tooltip */}
            <span
              className={`text-[11px] font-mono tracking-wider transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isActive ? "text-amber-300 opacity-90" : "text-zinc-400"
              }`}
            >
              {sec.label}
            </span>

            {/* Dot Indicator */}
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive
                  ? "w-6 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                  : "w-2 bg-zinc-600 group-hover:bg-zinc-300 group-hover:scale-125"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
