"use client";

/**
 * Summary Form Component
 *
 * Form for editing the professional summary section of the CV.
 * Uses controlled textarea connected to Zustand store.
 */

import { useCVStore } from "@/state/store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SummaryForm() {
  const { summary, setSummary } = useCVStore();

  return (
    <div>
      <Label htmlFor="summary">Intro</Label>
      <Textarea
        id="summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Brief professional summary highlighting your key qualifications and career goals..."
        rows={8}
        className="mt-1"
      />
    </div>
  );
}
