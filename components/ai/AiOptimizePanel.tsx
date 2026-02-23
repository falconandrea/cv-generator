"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PrivacyNotice } from "./PrivacyNotice";
import { ChatMessage } from "./ChatMessage";
import type { AiMessage, CVPatch } from "@/state/types";
import type { CVState } from "@/state/types";
import { sendAiMessage, type ApiMessage } from "@/lib/ai-client";
import { useCVStore } from "@/state/store";

export const INITIAL_AI_MESSAGE: AiMessage = {
    id: "initial",
    role: "assistant",
    content:
        "Hi! Paste the job description you're targeting, or just tell me what you'd like to improve in your CV.",
};

interface AiOptimizePanelProps {
    messages: AiMessage[];
    onMessagesChange: (messages: AiMessage[]) => void;
    onLoadingChange?: (loading: boolean) => void;
}

export function AiOptimizePanel({ messages, onMessagesChange, onLoadingChange }: AiOptimizePanelProps) {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const cv = useCVStore();

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]);

    const buildApiHistory = useCallback((msgs: AiMessage[]): ApiMessage[] => {
        return msgs
            .filter((m) => m.id !== "initial")
            .map((m) => ({ role: m.role, content: m.content }));
    }, []);

    const handleSend = useCallback(async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMessage: AiMessage = {
            id: `user-${Date.now()}`,
            role: "user",
            content: trimmed,
        };

        const updatedMessages = [...messages, userMessage];
        onMessagesChange(updatedMessages);
        setInput("");
        setIsLoading(true);
        onLoadingChange?.(true);

        try {
            const history = buildApiHistory(updatedMessages);
            const cvSnapshot: CVState = {
                personalInfo: cv.personalInfo,
                summary: cv.summary,
                experience: cv.experience,
                skills: cv.skills,
                certifications: cv.certifications,
                projects: cv.projects,
                education: cv.education,
                languages: cv.languages,
            };

            const response = await sendAiMessage(history, cvSnapshot);

            const assistantMessage: AiMessage = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: response.error ? `⚠️ ${response.error}` : response.content,
                proposedChanges: response.error ? undefined : (response.proposedChanges as CVPatch | undefined),
                changeStatus: response.proposedChanges && !response.error ? "pending" : undefined,
            };

            onMessagesChange([...updatedMessages, assistantMessage]);
        } catch {
            onMessagesChange([
                ...updatedMessages,
                {
                    id: `error-${Date.now()}`,
                    role: "assistant",
                    content: "⚠️ Something went wrong. Please check your AI provider configuration and try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
            onLoadingChange?.(false);
        }
    }, [input, isLoading, messages, buildApiHistory, cv, onMessagesChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleApply = useCallback((changes: CVPatch, messageId: string) => {
        cv.applyAiPatch(changes);
        onMessagesChange(
            messages.map((m) => (m.id === messageId ? { ...m, changeStatus: "applied" } : m))
        );
    }, [cv, messages, onMessagesChange]);

    const handleSkip = useCallback((messageId: string) => {
        onMessagesChange(
            messages.map((m) => (m.id === messageId ? { ...m, changeStatus: "skipped" } : m))
        );
    }, [messages, onMessagesChange]);

    return (
        <div className="flex flex-col h-full">
            {/* Privacy notice */}
            <div className="mb-3">
                <PrivacyNotice />
            </div>

            {/* Message list */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-2 min-h-0">
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                        onApply={(changes) => handleApply(changes, msg.id)}
                        onSkip={handleSkip}
                    />
                ))}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>AI is thinking…</span>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 mt-2">
                <div className="flex gap-2 items-end">
                    <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask the AI or paste a job description…"
                        className="min-h-[60px] max-h-[160px] resize-none text-sm"
                        disabled={isLoading}
                    />
                    <Button
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isLoading}
                        className="shrink-0 h-10 w-10"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Send className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <p className="mt-1.5 text-xs text-zinc-400">
                    Press <kbd className="px-1 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-mono">Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-mono">Shift+Enter</kbd> for new line
                </p>
            </div>
        </div>
    );
}
