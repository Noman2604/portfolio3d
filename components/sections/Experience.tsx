"use client";

import { useState } from "react";
import { content } from "@/lib/content";

export function Experience() {
  const experiences = content.experience;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section
      id="experience"
      className="py-20 sm:py-28 border-b border-[#23262D]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Header & Structured Overview */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
              06 / Career & Education
            </div>
            <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] [text-wrap:balance]">
              Experience & Background
            </h2>
            <p className="text-sm sm:text-base text-[#8B8F9A] mt-3 leading-relaxed max-w-[46ch]">
              Professional internships, client deliverables, and formal computer science education.
            </p>
          </div>

          {/* Structured Left-Column Stats & Live Indicator */}
          <div className="pt-8 mt-8 border-t border-[#23262D] space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[4px] bg-[#131518] border border-[#23262D]">
                <div className="text-xl sm:text-2xl font-mono font-semibold text-[#EFEFF1] tabular-nums">
                  2
                </div>
                <div className="text-[11px] font-mono text-[#585C67] uppercase tracking-wider mt-0.5">
                  Industry Roles
                </div>
              </div>

              <div className="p-3.5 rounded-[4px] bg-[#131518] border border-[#23262D]">
                <div className="text-xl sm:text-2xl font-mono font-semibold text-[#EFEFF1] tabular-nums">
                  8.23
                </div>
                <div className="text-[11px] font-mono text-[#585C67] uppercase tracking-wider mt-0.5">
                  B.Sc IT CGPI
                </div>
              </div>
            </div>

            {/* Active Status Callout */}
            <div className="p-3 rounded-[4px] bg-[#131518] border border-[#23262D] flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-[#8B8F9A]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#EFEFF1]">Active Internship</span>
              </div>
              <span className="text-[11px] text-[#585C67]">@ Autowhat.ai</span>
            </div>
          </div>
        </div>

        {/* Right Column: Aligned Timeline Ledger */}
        <div className="lg:col-span-7">
          <div className="relative space-y-4">
            {/* 1px Vertical Axis (Centered with nodes at x = 7.5px) */}
            <div
              aria-hidden="true"
              className="absolute left-[7px] top-7 bottom-15 w-px bg-gradient-to-b from-[#383C46] via-[#23262D] to-transparent"
            />

            {experiences.map((item, idx) => {
              const isCurrent = item.period.toLowerCase().includes("present");
              const isEducation =
                item.title.toLowerCase().includes("b.sc") ||
                item.org.toLowerCase().includes("university");
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={item.org + item.period}
                  className="relative pl-8 sm:pl-10 group"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* 15px Timeline Node */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-7 -translate-y-1/2 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#0C0D0E] border transition-all duration-200 ${
                      isCurrent
                        ? "border-emerald-500/50"
                        : isHovered
                        ? "border-[#EFEFF1] scale-110"
                        : "border-[#383C46] group-hover:border-[#8B8F9A]"
                    }`}
                  >
                    <span
                      className={`h-[5px] w-[5px] rounded-full transition-colors duration-200 ${
                        isCurrent
                          ? "bg-emerald-400"
                          : isHovered
                          ? "bg-[#EFEFF1]"
                          : "bg-[#585C67] group-hover:bg-[#EFEFF1]"
                      }`}
                    />
                  </span>

                  {/* Timeline Entry Card */}
                  <div
                    className={`bg-[#131518] border rounded-[4px] p-5 sm:p-6 transition-colors duration-200 ${
                      isHovered
                        ? "border-[#383C46]"
                        : "border-[#23262D] hover:border-[#383C46]"
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1C1E23]">
                      <div className="flex items-center gap-2 text-xs font-mono">
                        <span className="text-[#EFEFF1] font-medium">
                          {item.org}
                        </span>
                        <span className="text-[#383C46]">/</span>
                        <span className="text-[#585C67] uppercase tracking-wider">
                          {isEducation ? "Education" : "Experience"}
                        </span>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-[3px] border ${
                          isCurrent
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-[#0C0D0E] text-[#8B8F9A] border-[#23262D]"
                        }`}
                      >
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        )}
                        {item.period}
                      </span>
                    </div>

                    {/* Role Title */}
                    <h3 className="text-base sm:text-lg font-sans font-semibold text-[#EFEFF1] mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#8B8F9A] leading-relaxed max-w-[62ch]">
                      {item.desc}
                    </p>

                    {/* Tech & Skill Tags */}
                    {item.skills && item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-3.5 mt-3.5 border-t border-[#1C1E23]">
                        {item.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-[11px] font-mono text-[#8B8F9A] bg-[#0C0D0E] border border-[#23262D] px-2 py-0.5 rounded-[3px]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
