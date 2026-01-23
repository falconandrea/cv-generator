"use client";

/**
 * Editor Page
 *
 * Main editor page with integrated live preview and mode toggle.
 * Features a mode toggle to switch between Editor and Preview modes.
 * Includes PDF generation functionality.
 */

import { useState } from "react";
import { ModeToggle } from "@/components/editor/mode-toggle";
import { EditorContent } from "@/components/editor/editor-content";
import { PreviewContent } from "@/components/editor/preview-content";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useCVStore } from "@/state/store";
import { generateAndDownloadPDF } from "@/lib/pdf-generator";

export default function EditorPage() {
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const cv = useCVStore();

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const filename =
        `${cv.personalInfo.fullName.replace(/\s+/g, "-")}-cv.pdf` || "cv.pdf";
      await generateAndDownloadPDF(cv, filename);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              CV Editor
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Fill in your details to create your CV
            </p>
          </div>
          <Button
            onClick={handleGeneratePDF}
            disabled={isGenerating}
            className="flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isGenerating ? "Generating..." : "Generate PDF"}
          </Button>
        </div>

        {/* Mode Toggle */}
        <div className="mb-6">
          <ModeToggle mode={mode} onModeChange={setMode} />
        </div>

        {/* Content based on mode */}
        {mode === "editor" ? (
          <EditorContent activeTab={activeTab} onTabChange={setActiveTab} />
        ) : (
          <PreviewContent />
        )}
      </div>
    </div>
  );
}
