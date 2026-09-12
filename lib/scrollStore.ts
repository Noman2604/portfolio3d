import { create } from "zustand";

interface ScrollState {
  scrollProgress: number; // 0 to 1
  setScrollProgress: (progress: number) => void;

  activeSection: number; // 0: Hero, 1: About/Working, 2: Stack, 3: AptiCore, 4: Projects, 5: Contact
  setActiveSection: (section: number) => void;

  terminalOpen: boolean;
  setTerminalOpen: (val: boolean) => void;

  mousePos: { x: number; y: number };
  setMousePos: (pos: { x: number; y: number }) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),

  activeSection: 0,
  setActiveSection: (activeSection) => set({ activeSection }),

  terminalOpen: false,
  setTerminalOpen: (terminalOpen) => set({ terminalOpen }),

  mousePos: { x: 0, y: 0 },
  setMousePos: (mousePos) => set({ mousePos }),
}));
