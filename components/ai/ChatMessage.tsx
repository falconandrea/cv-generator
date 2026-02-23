"use client";

import { CheckCheck, X, Bot, User, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AiMessage, CVPatch } from "@/state/types";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
    message: AiMessage;
    onApply?: (changes: CVPatch) => void;
    onSkip?: (messageId: string) => void;
}

/** Generates a human-readable bullet list from a CVPatch */
function summarizeChanges(patch: CVPatch): string[] {
    const lines: string[] = [];

    if (patch.summary !== undefined) {
        lines.push("📝 Summary updated");
    }
    if (patch.skills !== undefined) {
        const count = patch.skills.length;
        lines.push(`🛠️ Skills: ${count} item${count !== 1 ? "s" : ""} (${patch.skills.slice(0, 3).join(", ")}${count > 3 ? "…" : ""})`);
    }
    if (patch.experience !== undefined) {
        patch.experience.forEach((e) => {
            lines.push(`💼 Experience: "${e.role}" at ${e.company}`);
        });
    }
    if (patch.education !== undefined) {
        patch.education.forEach((e) => {
            lines.push(`🎓 Education: "${e.degree}" – ${e.institution}`);
        });
    }
    if (patch.certifications !== undefined) {
        patch.certifications.forEach((c) => {
            lines.push(`🏅 Certification: "${c.title}" by ${c.issuer}`);
        });
    }
    if (patch.projects !== undefined) {
        patch.projects.forEach((p) => {
            lines.push(`🚀 Project: "${p.name}"`);
        });
    }
    if (patch.languages !== undefined) {
        const langs = patch.languages.map((l) => `${l.language} (${l.proficiency})`).join(", ");
        lines.push(`🌐 Languages: ${langs}`);
    }

    return lines;
}

export function ChatMessage({ message, onApply, onSkip }: ChatMessageProps) {
    const isUser = message.role === "user";
    const hasPendingChanges =
        message.proposedChanges && message.changeStatus === "pending";
    const changeSummary = hasPendingChanges
        ? summarizeChanges(message.proposedChanges as CVPatch)
        : [];

    return (
        <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
            {/* Avatar */}
            <div
                className={cn(
                    "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                    isUser
                        ? "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900"
                        : "bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                )}
            >
                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
            </div>

            {/* Bubble */}
            <div className={cn("flex max-w-[80%] flex-col gap-2", isUser ? "items-end" : "items-start")}>
                <div
                    className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap",
                        isUser
                            ? "bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-tr-sm"
                            : "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-100 rounded-tl-sm"
                    )}
                >
                    {message.content}
                </div>

                {/* Proposed changes: summary + actions */}
                {hasPendingChanges && (
                    <div className="w-full rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 overflow-hidden">
                        {/* Change summary list */}
                        {changeSummary.length > 0 && (
                            <div className="px-3 pt-2.5 pb-1.5 border-b border-indigo-200 dark:border-indigo-800">
                                <p className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 mb-1.5">
                                    <Pencil className="h-3 w-3" />
                                    Proposed changes
                                </p>
                                <ul className="space-y-0.5">
                                    {changeSummary.map((line, i) => (
                                        <li key={i} className="text-xs text-indigo-800 dark:text-indigo-200">
                                            {line}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex gap-2 px-3 py-2">
                            <Button
                                size="sm"
                                variant="default"
                                className="h-7 gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3"
                                onClick={() => onApply?.(message.proposedChanges!)}
                            >
                                <CheckCheck className="h-3.5 w-3.5" />
                                Apply
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1.5 text-xs px-3"
                                onClick={() => onSkip?.(message.id)}
                            >
                                <X className="h-3.5 w-3.5" />
                                Skip
                            </Button>
                        </div>
                    </div>
                )}

                {/* Applied / Skipped badge */}
                {message.changeStatus === "applied" && (
                    <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                        <CheckCheck className="h-3 w-3" /> Changes applied
                    </span>
                )}
                {message.changeStatus === "skipped" && (
                    <span className="text-xs text-zinc-400">Changes skipped</span>
                )}
            </div>
        </div>
    );
}
