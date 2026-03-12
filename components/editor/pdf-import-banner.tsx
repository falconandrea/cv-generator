"use client";

import { useRef, useState, useCallback } from "react";
import { ChevronDown, ChevronUp, FileUp, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCVStore } from "@/state/store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { CVState } from "@/state/types";

export function PdfImportBanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cv = useCVStore();

  const processFile = useCallback(
    async (file: File) => {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File is too large. Maximum size is 5 MB.");
        return;
      }

      setIsLoading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/ai/import-pdf", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();

        if (!res.ok) {
          toast.error(json.error || "Failed to process PDF.");
          return;
        }

        const data = json.data as Partial<CVState>;

        // Populate the store
        if (data.personalInfo) cv.setPersonalInfo(data.personalInfo);
        if (data.summary) cv.setSummary(data.summary);
        if (data.experience) cv.setExperience(data.experience);
        if (data.skills) cv.setSkills(data.skills);
        if (data.certifications) cv.setCertifications(data.certifications);
        if (data.projects) cv.setProjects(data.projects);
        if (data.education) cv.setEducation(data.education);
        if (data.languages) cv.setLanguages(data.languages);

        toast.success(
          "CV imported successfully! Review the data and make any adjustments."
        );
        setIsCollapsed(true);
      } catch (error) {
        console.error("PDF import failed:", error);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    },
    [cv]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };


  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-import-input"
      />

      <div
        className={cn(
          "relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden",
          isCollapsed
            ? "border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/30"
            : isDragOver
              ? "border-indigo-400 bg-indigo-50/80 dark:border-indigo-500 dark:bg-indigo-950/30"
              : "border-zinc-300 bg-gradient-to-br from-indigo-50/50 to-violet-50/50 dark:border-zinc-700 dark:from-indigo-950/20 dark:to-violet-950/20",
          isLoading && "pointer-events-none opacity-60"
        )}
      >
        {/* Toggle header */}
        <button
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="flex w-full items-center justify-between px-4 py-2.5 text-left cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Upload className="h-4 w-4 text-indigo-500" />
            Import from PDF
          </span>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 text-zinc-400" />
          ) : (
            <ChevronUp className="h-4 w-4 text-zinc-400" />
          )}
        </button>

        {/* Collapsible content */}
        {!isCollapsed && (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="px-6 pb-5"
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-3 py-2">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Analyzing your CV...
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Extracting data with AI — this may take a few seconds
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <Upload className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    Auto-fill your CV by uploading an existing PDF
                  </p>
                  <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                    Drag & drop your PDF here, or click the button below
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2 border-indigo-300 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-400 dark:hover:bg-indigo-950/40"
                >
                  <FileUp className="h-4 w-4" />
                  Upload PDF
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
