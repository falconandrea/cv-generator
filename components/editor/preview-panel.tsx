"use client";

/**
 * Preview Panel Component
 *
 * Wrapper component for the CV preview on the right side of the editor.
 * Displays the live preview with sticky positioning and scrollable container.
 */

import { CVPreview } from "@/components/preview/cv-preview";

export function PreviewPanel() {
  return (
    <div className="sticky top-8">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Preview
        </h2>
      </div>
      <div className="overflow-auto max-h-[calc(100vh-200px)] bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
        <CVPreview />
      </div>
    </div>
  );
}
