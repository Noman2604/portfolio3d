"use client";

import { ArrowUpRight } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { content } from "@/lib/content";

export function Featured() {
  const featured = content.featured;

  return (
    <section
      id="work"
      className="py-20 sm:py-28 border-b border-[#23262D]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Case Study Narrative */}
        <div className="lg:col-span-7">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
            04 / Featured Project
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] mb-5 [text-wrap:balance]">
            {featured.title}
          </h2>

          <p className="text-sm sm:text-base text-[#8B8F9A] leading-relaxed mb-8 max-w-[56ch]">
            {featured.desc}
          </p>

          {/* Key Deliverables & Features */}
          <div className="space-y-3 mb-8">
            <div className="text-xs font-mono uppercase tracking-wider text-[#585C67] mb-2">
              Key Capabilities:
            </div>
            {featured.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-xs sm:text-sm text-[#A2A6B2]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EFEFF1] mt-2 shrink-0" />
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {/* Repository Link */}
          <div className="flex items-center gap-3 pt-4">
            <a
              href={featured.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-[#EFEFF1] text-[#0C0D0E] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Spec Card */}
        <div className="lg:col-span-5">
          <div className="bg-[#131518] border border-[#23262D] rounded-[4px] p-5 sm:p-6 space-y-5">
            <div className="pb-4 border-b border-[#23262D]">
              <div className="text-xs font-mono uppercase tracking-wider text-[#585C67] mb-1">
                Project Classification
              </div>
              <div className="text-sm font-semibold text-[#EFEFF1]">
                Full-Stack Examination Engine
              </div>
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#585C67] mb-2.5">
                Technical Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {featured.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-[#8B8F9A] bg-[#0C0D0E] border border-[#23262D] px-2.5 py-1 rounded-[4px]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#23262D] text-xs font-mono text-[#8B8F9A] space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3">
                <span className="text-[#585C67] uppercase tracking-wider shrink-0">Architecture:</span>
                <span className="text-[#EFEFF1] text-left sm:text-right">Next.js App Router + MongoDB</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3">
                <span className="text-[#585C67] uppercase tracking-wider shrink-0">Auth:</span>
                <span className="text-[#EFEFF1] text-left sm:text-right">JWT + Role-Based Access</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-3">
                <span className="text-[#585C67] uppercase tracking-wider shrink-0">Testing:</span>
                <span className="text-[#EFEFF1] text-left sm:text-right">Anti-cheat visibility detection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
