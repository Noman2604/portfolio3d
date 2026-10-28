import { create } from "zustand";

export type SectionId =
  | "hero"
  | "about"
  | "skills"
  | "featured"
  | "projects"
  | "experience"
  | "resume"
  | "contact";

export interface SectionRange {
  id: SectionId;
  label: string;
  start: number;
  end: number;
}

export const SECTION_RANGES: SectionRange[] = [
  { id: "hero", label: "Hero", start: 0.0, end: 0.12 },
  { id: "about", label: "About", start: 0.12, end: 0.26 },
  { id: "skills", label: "Skills", start: 0.26, end: 0.40 },
  { id: "featured", label: "Featured", start: 0.40, end: 0.54 },
  { id: "projects", label: "Projects", start: 0.54, end: 0.68 },
  { id: "experience", label: "Experience", start: 0.68, end: 0.82 },
  { id: "resume", label: "Resume", start: 0.82, end: 0.92 },
  { id: "contact", label: "Contact", start: 0.92, end: 1.0 },
];

export interface ScrollState {
  // Normalized 0 to 1 scroll progress
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Real-time scroll velocity for velocity-driven chromatic aberration & particle stretch
  velocity: number;
  setVelocity: (v: number) => void;

  // Active section tracking
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;

  // Mouse coordinate state normalized (-1 to 1) and raw viewport px
  mouse: {
    x: number;
    y: number;
    targetX: number;
    targetY: number;
  };
  setMouse: (coords: { x: number; y: number; targetX?: number; targetY?: number }) => void;

  // Accessibility & performance flags
  prefersReducedMotion: boolean;
  setPrefersReducedMotion: (reduced: boolean) => void;

  quality: "high" | "low";
  setQuality: (quality: "high" | "low") => void;

  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;

  // Hero object custom controls
  isHeroHovered: boolean;
  setIsHeroHovered: (hovered: boolean) => void;

  // Intro / Loader state
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
  introScale: number;
  setIntroScale: (scale: number) => void;

  // Global smooth scroll trigger
  scrollTo: (target: string) => void;
  setScrollTo: (fn: (target: string) => void) => void;

  skillsInView: boolean;
  setSkillsInView: (v: boolean) => void;
  activeSkillCategory: string | null;
  setActiveSkillCategory: (c: string | null) => void;

  // Contact form focus & confetti trigger
  isContactFocused: boolean;
  setIsContactFocused: (focused: boolean) => void;
  confettiTrigger: number;
  triggerConfetti: () => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  velocity: 0,
  setVelocity: (velocity) => set({ velocity }),

  activeSection: "hero",
  setActiveSection: (activeSection) => set({ activeSection }),

  mouse: {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  },
  setMouse: (coords) =>
    set((state) => ({
      mouse: {
        ...state.mouse,
        ...coords,
      },
    })),

  prefersReducedMotion: false,
  setPrefersReducedMotion: (prefersReducedMotion) => set({ prefersReducedMotion }),

  quality: "low",
  setQuality: (quality) => set({ quality }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),

  isHeroHovered: false,
  setIsHeroHovered: (isHeroHovered) => set({ isHeroHovered }),

  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),

  introScale: 0,
  setIntroScale: (introScale) => set({ introScale }),

  scrollTo: (target: string) => {
    if (typeof window !== "undefined") {
      const el = document.querySelector(target);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  },
  setScrollTo: (fn) => set({ scrollTo: fn }),

  skillsInView: false,
  setSkillsInView: (skillsInView) => set({ skillsInView }),
  activeSkillCategory: null,
  setActiveSkillCategory: (activeSkillCategory) => set({ activeSkillCategory }),

  isContactFocused: false,
  setIsContactFocused: (isContactFocused) => set({ isContactFocused }),
  confettiTrigger: 0,
  triggerConfetti: () => set((state) => ({ confettiTrigger: state.confettiTrigger + 1 })),
}));
