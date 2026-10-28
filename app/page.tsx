"use client";

import dynamic from "next/dynamic";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Header } from "@/components/ui/Header";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Architecture } from "@/components/sections/Architecture";
import { Featured } from "@/components/sections/Featured";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/ui/Footer";

const CanvasContainer = dynamic(
  () =>
    import("@/components/canvas/CanvasContainer").then(
      (mod) => mod.CanvasContainer
    ),
  { ssr: false }
);

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen w-full bg-[#0C0D0E] text-[#EFEFF1] selection:bg-[#262930] selection:text-white">
        {/* Clean Fixed Top Header */}
        <Header />

        {/* Quiet Background 3D Architectural Form */}
        <CanvasContainer />

        {/* Primary Content Container */}
        <main
          suppressHydrationWarning
          className="relative z-10 w-full max-w-8xl mx-auto px-6 sm:px-8 pt-20 pb-24"
        >
          {/* Section: Hero */}
          <Hero />

          {/* Section: About */}
          <About />

          {/* Section: Skills */}
          <Skills />

          {/* Section: System Architecture & Data Flow */}
          <Architecture />

          {/* Section: Featured Project (AptiCore) */}
          <Featured />

          {/* Section: Other Projects */}
          <Projects />

          {/* Section: Experience & Education */}
          <Experience />

          {/* Section: Resume & Credentials */}
          <Resume />

          {/* Section: Contact Form */}
          <Contact />
        </main>

        {/* Structured Editorial Footer */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
