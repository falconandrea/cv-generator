"use client";

/**
 * Editor Page
 *
 * Main editor page with integrated live preview and mode toggle.
 * Features a mode toggle to switch between Editor and Preview modes.
 */

import { useState } from "react";
import { ModeToggle } from "@/components/editor/mode-toggle";
import { EditorContent } from "@/components/editor/editor-content";
import { PreviewContent } from "@/components/editor/preview-content";

export default function EditorPage() {
  const [mode, setMode] = useState<"editor" | "preview">("editor");
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            CV Editor
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">
            Fill in your details to create your CV
          </p>
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
