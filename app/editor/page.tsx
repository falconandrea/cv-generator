"use client";

import { useState } from "react";
import { EditorContent } from "@/components/editor/editor-content";
import { PreviewContent } from "@/components/editor/preview-content";
import { Button } from "@/components/ui/button";
import { Download, FileDown, FileUp, Eye, EyeOff } from "lucide-react";
import { useCVStore } from "@/state/store";
import { generateAndDownloadPDF } from "@/lib/pdf-generator";
import { exportCVAsJSON, importCVFromJSON } from "@/lib/json-handler";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [showPreview, setShowPreview] = useState(false);
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
      toast.error("Failed to generate PDF. Please try again.");
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
      toast.error("Failed to export CV data. Please try again.");
    }
  };

  const handleImportJSONClick = () => {
    document.getElementById("json-import-input")?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importCVFromJSON(file, (data) => {
        cv.setPersonalInfo(data.personalInfo);
        cv.setSummary(data.summary);
        cv.setExperience(data.experience);
        cv.setSkills(data.skills);
        cv.setCertifications(data.certifications);
        cv.setProjects(data.projects);
        cv.setEducation(data.education);
        if (data.languages) cv.setLanguages(data.languages);
      });
      toast.success("CV data imported successfully!");
    } catch (error) {
      console.error("Failed to import JSON:", error);
      toast.error("Failed to import CV data.");
    }
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      <Header />

      {/* Hidden file input */}
      <input
        id="json-import-input"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* ── Sticky sub-header: action buttons only ── */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end gap-2 py-2">

            {/* Mobile: toggle form/preview */}
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden gap-1.5"
              onClick={() => setShowPreview(!showPreview)}
            >
              {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? "Edit" : "Preview"}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJSON}
              className="gap-1.5 hidden sm:flex"
            >
              <FileDown className="w-4 h-4" />
              <span className="hidden md:inline">Export</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleImportJSONClick}
              className="gap-1.5 hidden sm:flex"
            >
              <FileUp className="w-4 h-4" />
              <span className="hidden md:inline">Import</span>
            </Button>

            <Button
              size="sm"
              onClick={handleGeneratePDF}
              disabled={isGenerating}
              className="gap-1.5"
            >
              <Download className="w-4 h-4" />
              {isGenerating ? "Generating..." : "Download PDF"}
            </Button>
          </div>
        </div>
      </div>

      {/* ── Main 2-column split ── */}
      <div className="container mx-auto px-4 py-6 flex-1 flex gap-6">

        {/* Left: Form (55%) */}
        <main
          className={cn(
            "w-full lg:w-[55%] lg:flex-shrink-0",
            // Mobile: hide when preview is shown
            showPreview ? "hidden lg:block" : "block"
          )}
        >
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 min-h-[500px]">
            <EditorContent activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </main>

        {/* Right: PDF Preview (45%) */}
        <aside
          className={cn(
            "lg:flex-1 lg:block",
            // Mobile: only shown when toggled on
            showPreview ? "block w-full" : "hidden lg:block"
          )}
        >
          <div className="sticky top-[57px]">
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 h-[calc(100vh-120px)]">
              <PreviewContent />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
