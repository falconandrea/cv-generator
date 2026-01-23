"use client";

/**
 * Editor Page
 *
 * Main editor page with integrated live preview and mode toggle.
 * Features a mode toggle to switch between Editor and Preview modes.
 * Includes PDF generation and JSON import/export functionality.
 */

import { useState, useRef } from "react";
import { ModeToggle } from "@/components/editor/mode-toggle";
import { EditorContent } from "@/components/editor/editor-content";
import { PreviewContent } from "@/components/editor/preview-content";
import { Button } from "@/components/ui/button";
import { Download, FileDown, FileUp } from "lucide-react";
import { useCVStore } from "@/state/store";
import { generateAndDownloadPDF } from "@/lib/pdf-generator";
import { exportCVAsJSON, importCVFromJSON } from "@/lib/json-handler";

export default function EditorPage() {
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const cv = useCVStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleExportJSON = () => {
    try {
      const filename =
        `${cv.personalInfo.fullName.replace(/\s+/g, "-")}-cv-data.json` ||
        "cv-data.json";
      exportCVAsJSON(cv, filename);
    } catch (error) {
      console.error("Failed to export JSON:", error);
      alert("Failed to export CV data. Please try again.");
    }
  };

  const handleImportJSONClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await importCVFromJSON(file, (data) => {
        // Update all CV data
        cv.setPersonalInfo(data.personalInfo);
        cv.setSummary(data.summary);
        cv.setExperience(data.experience);
        cv.setSkills(data.skills);
        cv.setCertifications(data.certifications);
        cv.setProjects(data.projects);
        cv.setEducation(data.education);
      });
      alert("CV data imported successfully!");
    } catch (error) {
      console.error("Failed to import JSON:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to import CV data. Please try again.");
      }
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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
          <div className="flex gap-2">
            <Button
              onClick={handleExportJSON}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileDown className="w-4 h-4" />
              Export JSON
            </Button>
            <Button
              onClick={handleImportJSONClick}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileUp className="w-4 h-4" />
              Import JSON
            </Button>
            <Button
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Generate PDF"}
            </Button>
          </div>
        </div>

        {/* Hidden file input for JSON import */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

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
