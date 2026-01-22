"use client";

/**
 * CV Preview Component
 *
 * Renders the CV using semantic HTML with ATS-safe formatting.
 * Matches the final PDF layout for accurate preview.
 *
 * ATS Rules (from ATS_RULES.md):
 * - No tables, columns, icons, images
 * - Clear section headers
 * - Consistent date formats
 * - Simple bullet points
 * - Left-aligned text
 */

import { useCVStore } from "@/state/store";

export function CVPreview() {
  const cv = useCVStore();

  /**
   * Format date for display
   * Returns "Present" if endDate is null
   */
  const formatDate = (date: string | null) => {
    if (!date) return "Present";
    return date;
  };

  return (
    <div className="w-full max-w-[210mm] mx-auto bg-white text-black p-8">
      {/* Personal Information Section */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-1">{cv.personalInfo.fullName}</h1>
        <div className="text-sm">
          {cv.personalInfo.location && (
            <span className="mr-3">{cv.personalInfo.location}</span>
          )}
          {cv.personalInfo.email && (
            <span className="mr-3">{cv.personalInfo.email}</span>
          )}
          {cv.personalInfo.links.map((link, index) => (
            <span key={index} className="mr-3">
              {link}
            </span>
          ))}
        </div>
      </header>

      {/* Summary Section */}
      {cv.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Professional Summary</h2>
          <p className="text-sm">{cv.summary}</p>
        </section>
      )}

      {/* Experience Section */}
      {cv.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Experience</h2>
          {cv.experience.map((entry, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-base font-semibold">
                  {entry.role} - {entry.company}
                </h3>
                <span className="text-sm">
                  {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                </span>
              </div>
              {entry.location && (
                <div className="text-sm mb-1">{entry.location}</div>
              )}
              <div className="text-sm">
                <p>{entry.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills Section */}
      {cv.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-2">Skills</h2>
          <ul className="text-sm list-disc list-inside">
            {cv.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Certifications Section */}
      {cv.certifications.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Certifications</h2>
          {cv.certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <div className="text-sm font-semibold">{cert.title}</div>
              <div className="text-sm">
                {cert.issuer}
                {cert.year && ` - ${cert.year}`}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Projects Section */}
      {cv.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Projects</h2>
          {cv.projects.map((project, index) => (
            <div key={index} className="mb-3">
              <div className="text-sm font-semibold">
                {project.name}
                {project.link && ` - ${project.link}`}
              </div>
              <div className="text-sm mb-1">{project.role}</div>
              <div className="text-sm">
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Education Section */}
      {cv.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-3">Education</h2>
          {cv.education.map((edu, index) => (
            <div key={index} className="mb-2">
              <div className="text-sm font-semibold">{edu.degree}</div>
              <div className="text-sm">
                {edu.institution} - {edu.location}
              </div>
              <div className="text-sm">{edu.year}</div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
