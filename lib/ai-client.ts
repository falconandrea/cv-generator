import type { CVState } from "@/state/types";
import { maskPii } from "@/lib/pii-masker";

export interface ApiMessage {
    role: "user" | "assistant";
    content: string;
}

export interface AiOptimizeResponse {
    content: string;
    proposedChanges?: object;
    error?: string;
}

/**
 * Sends a message to the AI Optimize API route.
 * Applies PII masking to cvData before sending.
 */
export async function sendAiMessage(
    messages: ApiMessage[],
    cvData: CVState
): Promise<AiOptimizeResponse> {
    const maskedCv = maskPii(cvData);

    const res = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, cvData: maskedCv }),
    });

    const data = await res.json();

    if (!res.ok) {
        return { content: "", error: data.error ?? "Unknown error from AI provider." };
    }

    return data as AiOptimizeResponse;
}
