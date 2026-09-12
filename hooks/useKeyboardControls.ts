import { useEffect, useRef } from "react";

export interface KeyState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  run: boolean;
}

const KEY_MAP: Record<string, keyof Omit<KeyState, "run">> = {
  KeyW: "forward",
  ArrowUp: "forward",
  KeyS: "backward",
  ArrowDown: "backward",
  KeyA: "left",
  ArrowLeft: "left",
  KeyD: "right",
  ArrowRight: "right",
};

export function useKeyboardControls() {
  const keys = useRef<KeyState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    run: false,
  });

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      const mapped = KEY_MAP[e.code];
      if (mapped) keys.current[mapped] = true;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") keys.current.run = true;
    };
    const handleUp = (e: KeyboardEvent) => {
      const mapped = KEY_MAP[e.code];
      if (mapped) keys.current[mapped] = false;
      if (e.code === "ShiftLeft" || e.code === "ShiftRight") keys.current.run = false;
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  return keys;
}
