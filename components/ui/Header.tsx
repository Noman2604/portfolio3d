"use client";

import { useState, useEffect } from "react";
import { useScrollStore } from "@/lib/scroll";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const scrollTo = useScrollStore((s) => s.scrollTo);
  const activeSection = useScrollStore((s) => s.activeSection);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    scrollTo(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isScrolled
          ? "bg-[#0C0D0E]/95 border-b border-[#23262D] backdrop-blur-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        {/* Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick("#hero")}
            className="text-left font-sans font-semibold text-sm text-[#EFEFF1] hover:text-white transition-colors"
          >
           Noman{/*  */}.
          </button>
          
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              activeSection === link.href.replace("#", "") ||
              (link.href === "#projects" && (activeSection === "featured" || activeSection === "projects"));

            return (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.href)}
                className={`text-xs font-mono uppercase tracking-wider transition-colors py-1 ${
                  isActive
                    ? "text-[#EFEFF1] border-b border-[#EFEFF1]"
                    : "text-[#8B8F9A] hover:text-[#EFEFF1]"
                }`}
              >
                {link.label}
              </button>
            );
          })}

          <button
            onClick={() => handleLinkClick("#contact")}
            className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-[4px] border border-[#23262D] bg-[#131518] text-[#EFEFF1] hover:border-[#383C46] transition-colors ml-2"
          >
            Hire Me
          </button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#8B8F9A] hover:text-[#EFEFF1] font-mono text-xs border border-[#23262D] rounded-[4px]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C0D0E] border-b border-[#23262D] px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-left text-xs font-mono uppercase tracking-wider text-[#8B8F9A] hover:text-[#EFEFF1] py-2 border-b border-[#1C1E23]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
