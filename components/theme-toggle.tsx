"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-gold"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
