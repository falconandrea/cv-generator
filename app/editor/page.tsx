"use client";

import { useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { EditorContent } from "@/components/editor/editor-content";
import { PdfImportDialog } from "@/components/editor/pdf-import-dialog";
import { AiOptimizePanel, INITIAL_AI_MESSAGE } from "@/components/ai/AiOptimizePanel";
import type { AiMessage } from "@/state/types";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileDown,
  FileUp,
  FileJson,
  FileText,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCVStore } from "@/state/store";
import { generateAndDownloadPDF } from "@/lib/pdf-generator";
import { exportCVAsJSON, importCVFromJSON } from "@/lib/json-handler";
import { AppHeader } from "@/components/layout/AppHeader";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const PreviewContent = dynamic(
  () => import("@/components/editor/preview-content").then((mod) => mod.PreviewContent),
  {
    ssr: false,
    loading: () => (
      <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
        <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
        <span className="text-sm">Loading preview...</span>
      </div>
    )
  }
);

function PreviewLoader() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-zinc-400 gap-2">
      <div className="w-8 h-8 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin" />
      <span className="text-sm">Loading preview...</span>
    </div>
  );
}

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<AiMessage[]>([INITIAL_AI_MESSAGE]);
  const [importPopoverOpen, setImportPopoverOpen] = useState(false);
  const [pdfImportOpen, setPdfImportOpen] = useState(false);

  // Panel visibility
  const [showPreview, setShowPreview] = useState(true);
  const [previewSheetOpen, setPreviewSheetOpen] = useState(false);
  const [aiSheetOpen, setAiSheetOpen] = useState(false);

  // Selector slices for optimal re-renders (rerender-defer-reads)
  const personalInfo = useCVStore((state) => state.personalInfo);
  const summary = useCVStore((state) => state.summary);
  const experience = useCVStore((state) => state.experience);
  const skills = useCVStore((state) => state.skills);
  const education = useCVStore((state) => state.education);
  const certifications = useCVStore((state) => state.certifications);
  const projects = useCVStore((state) => state.projects);
  const languages = useCVStore((state) => state.languages);
  const customSection = useCVStore((state) => state.customSection);

  // Actions - only these trigger re-renders
  const setPersonalInfo = useCVStore((state) => state.setPersonalInfo);
  const setSummary = useCVStore((state) => state.setSummary);
  const setExperience = useCVStore((state) => state.setExperience);
  const setSkills = useCVStore((state) => state.setSkills);
  const setCertifications = useCVStore((state) => state.setCertifications);
  const setProjects = useCVStore((state) => state.setProjects);
  const setEducation = useCVStore((state) => state.setEducation);
  const setLanguages = useCVStore((state) => state.setLanguages);
  const setCustomSection = useCVStore((state) => state.setCustomSection);



  // AI Optimize is enabled when the user has at least some personal info filled in
  const isAiEnabled =
    personalInfo.fullName.trim().length > 0 ||
    personalInfo.email.trim().length > 0;

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const filename =
        `${personalInfo.fullName.replace(/\s+/g, "-")}-cv.pdf` || "cv.pdf";
      await generateAndDownloadPDF({ personalInfo, summary, experience, skills, certifications, projects, education, languages, customSection }, filename);
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
        `${personalInfo.fullName.replace(/\s+/g, "-")}-cv-data.json` ||
        "cv-data.json";
      exportCVAsJSON({ personalInfo, summary, experience, skills, certifications, projects, education, languages, customSection }, filename);
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
        setPersonalInfo(data.personalInfo);
        setSummary(data.summary);
        setExperience(data.experience);
        setSkills(data.skills);
        setCertifications(data.certifications);
        setProjects(data.projects);
        setEducation(data.education);
        if (data.languages) setLanguages(data.languages);
        if (data.customSection) setCustomSection(data.customSection);
      });
      toast.success("CV data imported successfully!");
    } catch (error) {
      console.error("Failed to import JSON:", error);
      toast.error("Failed to import CV data.");
    }
    e.target.value = "";
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      <AppHeader
        navLinks={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Editor", href: "/editor" },
          { label: "ATS Score", href: "#", disabled: true, badge: "Soon" },
        ]}
      />

      {/* Hidden file input */}
      <input
        id="json-import-input"
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* ── Sticky sub-header: action buttons + toggles ── */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-2 py-2">
            <div className="flex items-center gap-2">
              {/* Preview Toggle (Desktop) */}
              <Button
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="hidden lg:flex gap-1.5"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </Button>

              {/* Preview Toggle (Mobile) */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewSheetOpen(true)}
                className="lg:hidden gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleExportJSON}
                className="gap-1.5"
              >
                <FileDown className="w-4 h-4" />
                <span className="hidden md:inline">Save JSON</span>
              </Button>

              <Popover open={importPopoverOpen} onOpenChange={setImportPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5"
                  >
                    <FileUp className="w-4 h-4" />
                    <span className="hidden md:inline">Import</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-1" align="start">
                  <button
                    onClick={() => {
                      setImportPopoverOpen(false);
                      setPdfImportOpen(true);
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <FileText className="h-4 w-4" />
                    Import from PDF
                  </button>
                  <button
                    onClick={() => {
                      setImportPopoverOpen(false);
                      handleImportJSONClick();
                    }}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
                  >
                    <FileJson className="h-4 w-4" />
                    Import from JSON
                  </button>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-center gap-2">
              {/* AI Button - Opens Sheet */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAiSheetOpen(true)}
                disabled={!isAiEnabled}
                title={!isAiEnabled ? "Fill personal info first" : undefined}
                className={cn(
                  "gap-1.5 border-indigo-300 text-indigo-600 dark:border-indigo-700 dark:text-indigo-400",
                  "hover:bg-indigo-50 dark:hover:bg-indigo-950/40",
                  !isAiEnabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">AI Optimize</span>
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
      </div>

      {/* ── Main Layout ── */}
      <div className="container mx-auto px-4 py-4 flex-1 flex gap-4">
        {/* Left: Editor (Full width if no preview) */}
        <main
          className={cn(
            "flex-1 min-w-0",
            showPreview ? "lg:w-[55%]" : "w-full"
          )}
        >
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm min-h-[500px] h-[calc(100vh-180px)] flex flex-col">
            <div className="flex-1 overflow-y-auto p-6 pt-0">
              <EditorContent
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />
            </div>
          </div>
        </main>

        {/* Right: Preview Panel (Desktop) */}
        {showPreview && (
          <aside className="hidden lg:block w-[45%]">
            <div className="sticky top-20">
              <div className="border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-white dark:bg-zinc-900 h-[calc(100vh-180px)] flex flex-col">
                <div className="flex-1 overflow-y-auto">
                  <Suspense fallback={<PreviewLoader />}>
                    <PreviewContent />
                  </Suspense>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* ── Preview Sheet (Mobile) ── */}
      <Sheet open={previewSheetOpen} onOpenChange={setPreviewSheetOpen}>
        <SheetContent side="bottom" className="h-[85vh] flex flex-col p-4 pt-6 rounded-t-2xl mt-2 mx-1">
          <div className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-950 rounded-lg">
            <Suspense fallback={<PreviewLoader />}>
              <PreviewContent />
            </Suspense>
          </div>
        </SheetContent>
      </Sheet>

      {/* ── AI Chat Sheet ── */}
      <Sheet open={aiSheetOpen} onOpenChange={setAiSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[450px] p-0 flex flex-col">
          <SheetHeader className="px-4 py-3 border-b shrink-0 flex flex-row items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              AI Optimize
            </SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-hidden p-4 pt-0">
            <AiOptimizePanel
              messages={chatMessages}
              onMessagesChange={setChatMessages}
              onLoadingChange={setIsAiLoading}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Dialogs */}
      <PdfImportDialog open={pdfImportOpen} onOpenChange={setPdfImportOpen} />
    </div>
  );
}
