"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, X } from "lucide-react";

const STORAGE_KEY = "ai_privacy_dismissed";

export function PrivacyNotice() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const dismissed = localStorage.getItem(STORAGE_KEY);
        if (!dismissed) setVisible(true);
    }, []);

    const handleDismiss = () => {
        localStorage.setItem(STORAGE_KEY, "true");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40 px-4 py-3 text-sm text-blue-800 dark:text-blue-300">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
            <p className="flex-1">
                <span className="font-semibold">Privacy notice:</span> Your name, email, and links are
                automatically masked before being sent to the AI.
            </p>
            <button
                onClick={handleDismiss}
                className="shrink-0 rounded p-0.5 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                aria-label="Dismiss privacy notice"
            >
                <X className="h-3.5 w-3.5" />
            </button>
        </div>
    );
}
