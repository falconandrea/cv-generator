import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATS Score Simulator",
  description: "Test your resume against applicant tracking systems. Get actionable feedback and improve your keyword matching for better success.",
};

export default function AtsScoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
