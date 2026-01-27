"use client";

/**
 * CV Preview Component
 *
 * Renders CV using semantic HTML with ATS-safe formatting.
 * Matches final PDF layout for accurate preview.
 *
 * ATS Rules (from ATS_RULES.md):
 * - No tables, columns, icons, images
 * - Clear section headers
 * - Consistent date formats
 * - Simple bullet points
 * - Left-aligned text
 *
 * Phase 10 Enhancements:
 * - Enhanced typography matching reference CV
 * - Improved spacing and layout
 * - Horizontal dividers between sections
 */

import { useCVStore } from "@/state/store";

export function CVPreview() {
  const cv = useCVStore();

  /**
   * Format date for display
   * Returns "Present" if endDate is null
   * Formats date as "Month Year" (e.g., "February 2020")
   */
  const formatDate = (date: string | null): string => {
    if (!date) return "Present";

    // Parse date in format YYYY-MM or YYYY-MM-DD
    const [year, month] = date.split("-");
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // Remove leading zero from month
    const monthIndex = parseInt(month, 10) - 1;
    const monthName = months[monthIndex] || month;

    return `${monthName} ${year}`;
  };

  /**
   * Clean description text by removing bullet points added by user
   * Removes "-", "•", "*" at the beginning of lines
   */
  const cleanDescription = (description: string): string => {
    return description
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .join("\n");
  };

  /**
   * Clean URL by removing http:// or https://
   */
  const cleanUrl = (url: string): string => {
    return url.replace(/^https?:\/\//, "");
  };

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-[40px]">
      {/* Personal Information Section */}
      <header className="mb-4 text-center">
        <h1 className="text-[24px] font-bold mb-2">
          {cv.personalInfo.fullName}
        </h1>
        <div className="text-[10px] flex flex-wrap justify-center gap-2">
          {cv.personalInfo.location && <span>{cv.personalInfo.location}</span>}
          {cv.personalInfo.location &&
            (cv.personalInfo.email || cv.personalInfo.links.length > 0) && (
              <span>•</span>
            )}
          {cv.personalInfo.email && <span>{cv.personalInfo.email}</span>}
          {cv.personalInfo.email && cv.personalInfo.links.length > 0 && (
            <span>•</span>
          )}
          {cv.personalInfo.links.map((link, index) => (
            <span key={index}>
              {link}
              {index < cv.personalInfo.links.length - 1 && <span>•</span>}
            </span>
          ))}
        </div>
      </header>

      {/* Summary Section */}
      {cv.summary && (
        <>
          <section className="mb-3">
            <h2 className="text-[14px] font-bold uppercase mb-2">Summary</h2>
            <p className="text-[12px] leading-[1.5]">{cv.summary}</p>
          </section>

          {/* Divider */}
          {cv.experience.length > 0 && (
            <div className="border-b border-gray-200 mb-3" />
          )}
        </>
      )}

      {/* Experience Section */}
      {cv.experience.length > 0 && (
        <>
          <section className="mb-3">
            <h2 className="text-[14px] font-bold uppercase mb-2">Experience</h2>
            {cv.experience.map((entry, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between items-baseline mb-0">
                  <h3 className="text-[14px] font-bold">{entry.role}</h3>
                  <span className="text-[10px] text-gray-600">
                    {formatDate(entry.startDate)} – {formatDate(entry.endDate)}
                    {entry.location && (
                      <span className="ml-1">• {entry.location}</span>
                    )}
                  </span>
                </div>
                <div className="text-[13px] italic mb-0">{entry.company}</div>
                <div className="text-[12px] leading-[1.5]">
                  <ul className="list-disc pl-4">
                    {cleanDescription(entry.description)
                      .split("\n")
                      .map((line, i) => (
                        <li key={i} className="mb-0">
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Divider */}
          {cv.projects.length > 0 && (
            <div className="border-b border-gray-200 mb-3" />
          )}
        </>
      )}

      {/* Projects Section */}
      {cv.projects.length > 0 && (
        <>
          <section className="mb-3">
            <h2 className="text-[14px] font-bold uppercase mb-2">Projects</h2>
            {cv.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-[14px] font-bold mb-1">{project.name}</h3>
                <div className="text-[10px] mb-1">
                  {project.role}
                  {project.link && <> • {cleanUrl(project.link)}</>}
                </div>
                <div className="text-[12px] leading-[1.5]">
                  <ul className="list-disc pl-4">
                    {cleanDescription(project.description)
                      .split("\n")
                      .map((line, i) => (
                        <li key={i} className="mb-0">
                          {line}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ))}
          </section>

          {/* Divider */}
          {cv.education.length > 0 && (
            <div className="border-b border-gray-200 mb-3" />
          )}
        </>
      )}

      {/* Education Section */}
      {cv.education.length > 0 && (
        <>
          <section className="mb-3">
            <h2 className="text-[14px] font-bold uppercase mb-2">Education</h2>
            {cv.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="text-[14px] font-bold mb-0">{edu.degree}</div>
                <div className="text-[12px] leading-[1.5]">
                  {edu.institution} • {edu.location} • {edu.year}
                </div>
              </div>
            ))}
          </section>

          {/* Divider */}
          {cv.skills.length > 0 && (
            <div className="border-b border-gray-200 mb-3" />
          )}
        </>
      )}

      {/* Skills Section */}
      {cv.skills.length > 0 && (
        <>
          <section className="mb-3">
            <h2 className="text-[14px] font-bold uppercase mb-2">Skills</h2>
            <p className="text-[12px] leading-[1.5]">{cv.skills.join(", ")}</p>
          </section>

          {/* Divider */}
          {cv.certifications.length > 0 && (
            <div className="border-b border-gray-200 mb-3" />
          )}
        </>
      )}

      {/* Certifications Section */}
      {cv.certifications.length > 0 && (
        <section className="mb-3">
          <h2 className="text-[14px] font-bold uppercase mb-2">
            Certifications
          </h2>
          {cv.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="text-[14px] font-bold">{cert.title}</div>
              <div className="text-[12px] leading-[1.5]">
                {cert.issuer}
                {cert.year && ` - ${cert.year}`}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
