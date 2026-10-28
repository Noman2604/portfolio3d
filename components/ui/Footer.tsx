"use client";

import { ArrowUp } from "lucide-react";
import { content } from "@/lib/content";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full border-t border-[#23262D] bg-[#0C0D0E] pt-12 pb-6 z-10 overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8B8F9A]">
          {/* Brand & Rights */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <span className="font-sans font-semibold text-[#EFEFF1]">
             Noman.
            </span>
            <span>© {new Date().getFullYear()}. Built with Next.js & TypeScript.</span>
          </div>

          {/* Links & Back to top */}
          <div className="flex items-center gap-4">
            <a
              href={content.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EFEFF1] transition-colors"
              aria-label="GitHub Profile"
            >
              GitHub
            </a>
            <span className="text-[#383C46]">•</span>
            <a
              href={content.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#EFEFF1] transition-colors"
              aria-label="LinkedIn Profile"
            >
              LinkedIn
            </a>
            <span className="text-[#383C46]">•</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 hover:text-[#EFEFF1] transition-colors"
              aria-label="Scroll back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Centered Metallic Gradient Wordmark */}
        <div className="mt-10 sm:mt-14 flex justify-center select-none pointer-events-none">
          <span
            aria-hidden="true"
            className="text-[clamp(4.5rem,16vw,13rem)] font-sans font-bold tracking-tight leading-[0.88] bg-gradient-to-b from-[#E4E6EC] via-[#6E727D] to-[#0C0D0E] bg-clip-text text-transparent"
          >
            {content.shortName}.
          </span>
              
        </div>
      </div>
    </footer>
  );
}
