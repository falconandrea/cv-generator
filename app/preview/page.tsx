"use client";

/**
 * Preview Page
 *
 * Displays a live preview of the CV that mirrors the final PDF layout.
 * Updates instantly when data changes in the editor.
 */

import { LivePDFPreview } from "@/components/preview/live-pdf-preview";

export default function PreviewPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8 px-4 h-full flex flex-col">
        <div className="mb-8 flex-none">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            CV Preview
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Live preview of your CV. This matches the final PDF layout.
          </p>
        </div>

        <div className="flex-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
          <LivePDFPreview />
        </div>
      </div>
    </div>
  );
}
