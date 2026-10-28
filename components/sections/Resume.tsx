"use client";

import { Download, Check, Copy } from "lucide-react";
import { useState } from "react";
import { content } from "@/lib/content";

export function Resume() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(content.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="resume"
      className="py-20 sm:py-28 border-b border-[#23262D]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Heading & Download */}
        <div className="lg:col-span-5">
          <div className="text-xs font-mono uppercase tracking-wider text-[#8B8F9A] mb-3">
            07 / Credentials
          </div>
          <h2 className="text-2xl sm:text-3xl font-sans font-semibold tracking-tight text-[#EFEFF1] mb-4 [text-wrap:balance]">
            Resume & Verification
          </h2>
          <p className="text-sm text-[#8B8F9A] leading-relaxed mb-8 max-w-[48ch]">
            Overview of academic credentials, internship track record, and technical competencies.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#EFEFF1] text-[#0C0D0E] font-mono text-xs uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[4px] border border-[#23262D] text-[#8B8F9A] hover:text-[#EFEFF1] hover:border-[#383C46] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Email Copied" : "Copy Email"}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Structured Fact Sheet */}
        <div className="lg:col-span-7">
          <div className="bg-[#131518] border border-[#23262D] rounded-[4px] p-5 sm:p-6 space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3 border-b border-[#23262D] text-xs font-mono">
              <span className="text-[#585C67] uppercase tracking-wider shrink-0">Candidate</span>
              <span className="text-[#EFEFF1] text-left sm:text-right">{content.name}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3 border-b border-[#23262D] text-xs font-mono">
              <span className="text-[#585C67] uppercase tracking-wider shrink-0">Education</span>
              <span className="text-[#EFEFF1] text-left sm:text-right">B.Sc Information Technology (8.23 / 10 CGPI)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3 border-b border-[#23262D] text-xs font-mono">
              <span className="text-[#585C67] uppercase tracking-wider shrink-0">Active Internship</span>
              <span className="text-[#EFEFF1] text-left sm:text-right">Autowhat.ai (Next.js & Backend)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pb-3 border-b border-[#23262D] text-xs font-mono">
              <span className="text-[#585C67] uppercase tracking-wider shrink-0">Location / Timezone</span>
              <span className="text-[#EFEFF1] text-left sm:text-right">India (IST / UTC+5:30)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 pt-1 text-xs font-mono">
              <span className="text-[#585C67] uppercase tracking-wider shrink-0">Availability</span>
              <span className="text-[#EFEFF1] text-left sm:text-right">{content.status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
