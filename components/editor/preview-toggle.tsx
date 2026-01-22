"use client";

/**
 * Preview Toggle Component
 *
 * Button to show/hide the preview panel on tablet and mobile devices.
 * Provides a toggle switch for preview visibility.
 */

import { Button } from "@/components/ui/button";

interface PreviewToggleProps {
  showPreview: boolean;
  onToggle: () => void;
}

export function PreviewToggle({ showPreview, onToggle }: PreviewToggleProps) {
  return (
    <Button variant="outline" onClick={onToggle} className="w-full md:w-auto">
      {showPreview ? "Hide Preview" : "Show Preview"}
    </Button>
  );
}
