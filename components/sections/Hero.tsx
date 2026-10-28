"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { content } from "@/lib/content";
import { useScrollStore } from "@/lib/scroll";

export function Hero() {
  const prefersReducedMotion = useScrollStore((s) => s.prefersReducedMotion);
  const scrollTo = useScrollStore((s) => s.scrollTo);

  return (
    <section
      id="hero"
      className="relative min-h-[75vh] flex flex-col justify-center pb-8 sm:py-6 border-b border-[#23262D]"
    >
      <div className="max-w-2xl lg:max-w-[580px]">
        {/* Subtle Eyebrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-6 flex items-center gap-3"
        >
          <span>{content.name}</span>
          <span className="text-[#383C46]">|</span>
          <span>{content.role}</span>
        </motion.div>

        {/* Clear, Editorial Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, delay: 0.1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-sans font-semibold tracking-tight text-[#EFEFF1] leading-[1.12] mb-6 [text-wrap:balance]"
        >
          {content.hero.headline}
        </motion.h1>

        {/* Grounded Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#8B8F9A] leading-relaxed max-w-[62ch] mb-6 font-normal"
        >
          {content.hero.sub}
        </motion.p>

        {/* Clean Functional Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <button
            onClick={() => scrollTo("#projects")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#EFEFF1] text-[#0C0D0E] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
          >
            <span>View Projects</span>
            <ArrowDownRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] border border-[#23262D] text-[#EFEFF1] font-mono text-xs uppercase tracking-wider hover:border-[#383C46] hover:bg-[#131518] transition-colors"
          >
            Contact
          </button>
        </motion.div>

        {/* Core Stack Pill-free Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5, delay: 0.4 }}
          className="flex flex-wrap items-center gap-2 pt-5 border-t border-[#1C1E23]"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-[#585C67] mr-2">
            Primary Stack:
          </span>
          {content.hero.chips.map((chip) => (
            <span
              key={chip}
              className="text-xs font-mono text-[#8B8F9A] px-2.5 py-1 bg-[#131518] border border-[#23262D] rounded-[4px]"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
