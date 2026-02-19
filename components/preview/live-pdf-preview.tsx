"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useCVStore } from "@/state/store";
import { useShallow } from "zustand/react/shallow";
import type { CVState } from "@/state/types";

// Selector: pick ONLY the data fields, not actions
const selectCVData = (s: CVState): CVState => ({
  personalInfo: s.personalInfo,
  summary: s.summary,
  experience: s.experience,
  skills: s.skills,
  certifications: s.certifications,
  projects: s.projects,
  education: s.education,
  languages: s.languages,
});

// Dynamically import PDFPreviewInner to avoid SSR errors with @react-pdf/renderer
const PDFPreviewInner = dynamic(
  () => import("./pdf-preview-inner").then((mod) => mod.PDFPreviewInner),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 text-zinc-500">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
          <p>Loading PDF Generator...</p>
        </div>
      </div>
    ),
  }
);

export function LivePDFPreview() {
  // Use a selector + shallow comparison so that switching tabs (which doesn't
  // change CV data) does NOT trigger a re-render or PDF regeneration.
  const cvData = useCVStore(useShallow(selectCVData));

  const [debouncedCV, setDebouncedCV] = useState<CVState>(cvData);
  const [showOverlay, setShowOverlay] = useState(false);
  // Use a ref to track the hide-overlay timeout so we can cancel it if needed
  const hideOverlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Show overlay after 400ms of continuous typing (not on quick single keystrokes)
    const overlayTimer = setTimeout(() => {
      setShowOverlay(true);
    }, 400);

    // Regenerate PDF 1000ms after the user stops typing
    const renderTimer = setTimeout(() => {
      setDebouncedCV(cvData);
      // Give the PDF viewer ~600ms to render before hiding the overlay
      if (hideOverlayRef.current) clearTimeout(hideOverlayRef.current);
      hideOverlayRef.current = setTimeout(() => setShowOverlay(false), 600);
    }, 1000);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(renderTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(cvData)]); // compare by serialized value, not reference

  return (
    <div className="w-full h-full min-h-[500px] relative overflow-hidden">
      <PDFPreviewInner cv={debouncedCV} isTyping={showOverlay} />
    </div>
  );
}
