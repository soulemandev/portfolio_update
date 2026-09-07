"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  // Start as dark on the server; corrected on mount from localStorage/system
  // so it always matches what the no-flash script in layout.tsx already set.
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains("light"));
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // localStorage unavailable — theme just won't persist across visits
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
      aria-pressed={isLight}
      className="group relative flex h-8 w-8 items-center justify-center border border-space-line text-ink-muted transition-colors hover:border-amber hover:text-amber"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-all duration-300 ${isLight ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        style={{ position: isLight ? "absolute" : "static" }}
      >
        <path
          fill="currentColor"
          d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm8 3a1 1 0 0 1 1 1v0a1 1 0 1 1-2 0v0a1 1 0 0 1 1-1ZM3 11a1 1 0 0 1 1 1v0a1 1 0 1 1-2 0v0a1 1 0 0 1 1-1Zm14.657-6.657a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414ZM5.222 16.536a1 1 0 0 1 1.414 0l.707.707a1 1 0 1 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414ZM18.778 16.536a1 1 0 0 1 0 1.414l-.707.707a1 1 0 1 1-1.414-1.414l.707-.707a1 1 0 0 1 1.414 0ZM6.636 4.929a1 1 0 0 1 0 1.414l-.707.707A1 1 0 1 1 4.515 5.636l.707-.707a1 1 0 0 1 1.414 0ZM12 19a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Z"
        />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className={`h-4 w-4 transition-all duration-300 ${isLight ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
        style={{ position: isLight ? "static" : "absolute" }}
      >
        <path
          fill="currentColor"
          d="M20.354 15.354A9 9 0 0 1 8.646 3.646a.5.5 0 0 0-.6-.732A10 10 0 1 0 21.086 15.954a.5.5 0 0 0-.732-.6Z"
        />
      </svg>
    </button>
  );
}
