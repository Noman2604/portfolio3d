"use client";

import { content } from "@/lib/content";

export function About() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 border-b border-[#23262D]"
    >
      {/* 12-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Heading */}
        <div className="lg:col-span-6">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-4">
            01 / Background
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] leading-snug [text-wrap:balance]">
            {content.about.title}
          </h2>
        </div>

        {/* Right Column: Narrative Body */}
        <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-[#8B8F9A] leading-relaxed max-w-[65ch]">
          {content.about.body.map((paragraph, index) => (
            <p key={index} className="text-[#A2A6B2]">
              {paragraph}
            </p>
          ))}

          {/* Clean Tabular Stats */}
          <div className="pt-8 mt-10 border-t border-[#23262D]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {content.about.stats.map((stat) => (
                <div key={stat.label} className="border-l border-[#23262D] pl-4">
                  <div className="text-2xl sm:text-3xl font-semibold text-[#EFEFF1] tabular-nums tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-[#585C67] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
