"use client";

/**
 * Mode Toggle Component
 *
 * Toggle switch between Editor and Preview modes.
 * Allows users to focus on editing or previewing with full available space.
 */

import { cn } from "@/lib/utils";

interface ModeToggleProps {
  mode: "editor" | "preview";
  onModeChange: (mode: "editor" | "preview") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-zinc-200 dark:bg-zinc-800 p-1">
      <button
        onClick={() => onModeChange("editor")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          mode === "editor"
            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50",
        )}
      >
        Editor Mode
      </button>
      <button
        onClick={() => onModeChange("preview")}
        className={cn(
          "px-4 py-2 rounded-md text-sm font-medium transition-colors",
          mode === "preview"
            ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-50 shadow-sm"
            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50",
        )}
      >
        Preview Mode
      </button>
    </div>
  );
}
