"use client";

import { useState } from "react";
import { EditorSidebar } from "@/components/editor/EditorSidebar";
import { EditorContent } from "@/components/editor/editor-content";
import { PreviewContent } from "@/components/editor/preview-content";
import { Button } from "@/components/ui/button";
import { Download, FileDown, FileUp, Menu, Eye, EyeOff } from "lucide-react";
import { useCVStore } from "@/state/store";
import { generateAndDownloadPDF } from "@/lib/pdf-generator";
import { exportCVAsJSON, importCVFromJSON } from "@/lib/json-handler";
import { Header } from "@/components/layout/Header";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(true); // Toggle for desktop/mobile
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
    // ... same implementation ...
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
    // ... same implementation ...
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

      {/* Hidden Input */}
      <input
        id="json-import-input"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="container mx-auto py-6 px-4 flex-1 flex flex-col lg:flex-row gap-6">

        {/* Mobile Sidebar (Drawer) */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Menu className="w-4 h-4" /> Sections
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Select a section to edit</SheetDescription>
              <div className="mt-6">
                <EditorSidebar
                  activeTab={activeTab}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            className="gap-2"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPreview ? "Edit" : "Preview"}
          </Button>
        </div>

        {/* Desktop Sidebar (Left) */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <EditorSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6 flex flex-col gap-2">
              <Button onClick={handleExportJSON} variant="outline" className="w-full justify-start gap-2">
                <FileDown className="w-4 h-4" /> Export JSON
              </Button>
              <Button onClick={handleImportJSONClick} variant="outline" className="w-full justify-start gap-2">
                <FileUp className="w-4 h-4" /> Import JSON
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Editor (Center) */}
        <main className={cn(
          "flex-1 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm min-h-[500px]",
          // On mobile: hidden if preview is ON. On desktop: always visible.
          showPreview ? "hidden lg:block lg:max-w-xl xl:max-w-2xl" : "block w-full"
        )}>
          <div className="lg:hidden mb-4 font-semibold">Editing: {activeTab}</div>
          <EditorContent activeTab={activeTab} onTabChange={setActiveTab} />
        </main>

        {/* Live Preview (Right - Desktop) & Mobile Preview (Center - when toggled) */}
        {/* Mobile Preview Container */}
        <div className={cn(
          "flex-1 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-lg",
          showPreview ? "block lg:hidden" : "hidden"
        )}>
          <PreviewContent />
        </div>

        {/* Live Preview (Right) */}
        <aside className="hidden lg:block w-[450px] xl:w-[500px] flex-shrink-0">
          <div className="sticky top-24">
            <div className="mb-4 flex flex-col gap-2">
              <Button onClick={handleGeneratePDF} disabled={isGenerating} className="w-full gap-2" size="lg">
                <Download className="w-4 h-4" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
            <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-y-auto shadow-lg bg-white dark:bg-zinc-900 h-[800px]">
              <PreviewContent />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
