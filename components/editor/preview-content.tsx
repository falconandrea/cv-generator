"use client";

/**
 * Preview Content Component
 *
 * Contains full-width CV preview for Preview mode.
 * Displays the CV preview centered with max-width constraint.
 */

import { CVPreview } from "@/components/preview/cv-preview";

export function PreviewContent() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[210mm]">
        <CVPreview />
      </div>
    </div>
  );
}
