"use client";

import { useEffect, useState, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "@/components/pdf/cv-document";
import type { CVState } from "@/state/types";

export function PDFPreviewInner({ cv, isTyping }: { cv: CVState; isTyping: boolean }) {
    const [displayUrl, setDisplayUrl] = useState<string | null>(null);
    // isGenerating tracks whether the PDF is currently being built
    const [isGenerating, setIsGenerating] = useState(true);
    const prevUrlRef = useRef<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setIsGenerating(true);

        const generate = async () => {
            try {
                // pdf().toBlob() is identical to what the download button uses — we know it works
                const blob = await pdf(<CVDocument cv={cv} />).toBlob();
                if (cancelled) return;

                // Revoke old blob URL to free memory
                if (prevUrlRef.current) URL.revokeObjectURL(prevUrlRef.current);

                const url = URL.createObjectURL(blob);
                prevUrlRef.current = url;
                setDisplayUrl(url);
            } catch (err) {
                console.error("PDF preview error:", err);
            } finally {
                if (!cancelled) setIsGenerating(false);
            }
        };

        generate();
        return () => { cancelled = true; };
    }, [cv]);

    // Show overlay when: user is actively typing (parent controlled) OR PDF is regenerating
    const showOverlay = isTyping || isGenerating;

    return (
        <div className="w-full h-full relative bg-zinc-100 dark:bg-zinc-900">
            {/* Overlay — fully opaque on initial load, semi-transparent while updating */}
            <div
                className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-300 ${showOverlay ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    } ${displayUrl
                        ? "bg-white/80 dark:bg-black/80 backdrop-blur-sm"
                        : "bg-zinc-100 dark:bg-zinc-900"
                    }`}
            >
                <div className="w-8 h-8 border-4 border-zinc-300 border-t-zinc-700 dark:border-zinc-600 dark:border-t-zinc-200 rounded-full animate-spin mb-4" />
                <p className="font-medium text-zinc-700 dark:text-zinc-300">
                    {displayUrl ? "Updating preview..." : "Loading preview..."}
                </p>
            </div>

            {/* Iframe — src only updates when a new blob is FULLY ready, so no flash */}
            {displayUrl && (
                <iframe
                    src={displayUrl}
                    className="w-full h-full border-none"
                    title="CV PDF Preview"
                />
            )}
        </div>
    );
}
