import { create } from "zustand";
import { sounds } from "@/lib/audio";
import type { StationId } from "@/data/content";

export interface ExperienceState {
  // Current storytelling chapter (0 = Hero, 1 = About/Exp, 2 = AptiCore, 3 = Repos, 4 = Skills, 5 = Contact)
  chapter: number;
  setChapter: (chapter: number) => void;

  // Orbit mode toggle: true = free 360 mouse orbit, false = cinematic scroll storytelling
  isFreeOrbit: boolean;
  setFreeOrbit: (val: boolean) => void;

  // Retro Cyberpunk CLI Terminal Modal
  terminalOpen: boolean;
  setTerminalOpen: (val: boolean) => void;

  // 2D Recruiter Quick View Mode
  viewMode: "3d" | "quick-view";
  setViewMode: (mode: "3d" | "quick-view") => void;

  // Sound effects
  soundEnabled: boolean;
  toggleSound: () => void;

  // Active modal inspection
  activeStation: StationId | null;
  openStation: (id: StationId) => void;
  closeStation: () => void;
}

export const useExperience = create<ExperienceState>((set, get) => ({
  chapter: 0,
  setChapter: (chapter) => {
    if (chapter !== get().chapter) {
      sounds.playClick();
    }
    set({ chapter, isFreeOrbit: false });
  },

  isFreeOrbit: false,
  setFreeOrbit: (val) => {
    sounds.playClick();
    set({ isFreeOrbit: val });
  },

  terminalOpen: false,
  setTerminalOpen: (val) => {
    sounds.playClick();
    set({ terminalOpen: val });
  },

  viewMode: "3d",
  setViewMode: (mode) => {
    sounds.playClick();
    set({ viewMode: mode });
  },

  soundEnabled: false,
  toggleSound: () => {
    const next = !get().soundEnabled;
    sounds.setEnabled(next);
    if (next) sounds.playClick();
    set({ soundEnabled: next });
  },

  activeStation: null,
  openStation: (id) => {
    sounds.playClick();
    set({ activeStation: id });
  },
  closeStation: () => {
    sounds.playClick();
    set({ activeStation: null });
  },
}));
