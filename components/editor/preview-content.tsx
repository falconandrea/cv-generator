"use client";

/**
 * Preview Content Component
 *
 * Contains full-width Live PDF preview for Preview mode.
 * Displays the exact PDF output using @react-pdf/renderer dynamically.
 */

import { LivePDFPreview } from "@/components/preview/live-pdf-preview";

export function PreviewContent() {
  return (
    <div className="w-full h-[calc(100vh-200px)] min-h-[600px] bg-zinc-100 dark:bg-zinc-900">
      <LivePDFPreview />
    </div>
  );
}
