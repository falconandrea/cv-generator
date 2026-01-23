"use client";

/**
 * PDF Generator Utility
 *
 * Handles PDF generation and download functionality.
 * Uses @react-pdf/renderer to create ATS-optimized PDFs.
 */

import { pdf } from "@react-pdf/renderer";
import { CVDocument } from "@/components/pdf/cv-document";
import type { CVState } from "@/state/types";

/**
 * Generate and download the CV as a PDF file
 *
 * @param cv - The CV state to generate the PDF from
 * @param filename - Optional filename (defaults to "cv.pdf")
 */
export async function generateAndDownloadPDF(
  cv: CVState,
  filename: string = "cv.pdf",
): Promise<void> {
  try {
    // Create the PDF document
    const doc = <CVDocument cv={cv} />;

    // Generate the PDF blob
    const blob = await pdf(doc).toBlob();

    // Create a download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;

    // Trigger download
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}
