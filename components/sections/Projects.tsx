"use client";

import { ArrowUpRight } from "lucide-react";
import { content } from "@/lib/content";

export function Projects() {
  const projects = content.projects;

  return (
    <section
      id="projects"
      className="py-20 sm:py-28 border-b border-[#23262D]"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
        <div>
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
            05 / Applications
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] [text-wrap:balance]">
            Selected Projects
          </h2>
        </div>
        <div className="text-xs font-mono text-[#585C67]">
          {projects.length} Repositories
        </div>
      </div>

      {/* Clean 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, idx) => (
          <a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-[#131518] border border-[#23262D] rounded-[4px] p-6 hover:border-[#383C46] transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#585C67]">
                  0{idx + 1}
                </span>
                <h3 className="font-sans font-medium text-base text-[#EFEFF1] group-hover:text-white transition-colors">
                  {project.name}
                </h3>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#585C67] group-hover:text-[#EFEFF1] transition-colors shrink-0" />
            </div>

            <p className="text-xs sm:text-sm text-[#8B8F9A] leading-relaxed mb-6 font-normal">
              {project.desc}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#1C1E23]">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono text-[#8B8F9A] bg-[#0C0D0E] border border-[#23262D] px-2 py-0.5 rounded-[3px]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
