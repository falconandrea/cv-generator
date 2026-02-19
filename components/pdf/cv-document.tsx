/**
 * CV Document Component
 *
 * Generates an ATS-optimized PDF from CV state using @react-pdf/renderer.
 * Matches preview layout for consistency.
 *
 * ATS Rules (from ATS_RULES.md):
 * - No tables, columns, icons, images
 * - Clear section headers
 * - Consistent date formats
 * - Simple bullet points
 * - Left-aligned text
 *
 * PDF Requirements (from ROADMAP.md Phase 5 & Phase 10):
 * - Standard fonts: Helvetica (primary), Arial (fallback)
 * - Automatic page breaks
 * - Section grouping
 * - Multi-page support
 * - Enhanced typography and spacing (Phase 10)
 */

import {
  Document,
  Page,
  Text,
  View,
  Font,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { CVState } from "@/state/types";

// Register standard fonts
Font.register({
  family: "Helvetica",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@0.0.4/dist/Roboto-Regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@0.0.4/dist/Roboto-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40, // Reduced margins (was 96px, now ~40px)
    fontFamily: "Helvetica",
    fontSize: 10, // Reduced from 12 to 10
    lineHeight: 1.5,
    color: "#000000",
  },
  header: {
    marginBottom: 12,
    textAlign: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  contactInfo: {
    fontSize: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 2,
  },
  contactItem: {
    color: "#000000",
  },
  section: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 12,
  },
  entry: {
    marginBottom: 8,
  },
  entryHeader: {
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 1,
  },
  entryCompany: {
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 1,
  },
  entryHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 1,
  },
  entryDate: {
    fontSize: 10,
    color: "#666666",
  },
  entryLocation: {
    fontSize: 10,
    marginBottom: 3,
    color: "#666666",
  },
  entryDescription: {
    fontSize: 10,
    lineHeight: 1.3,
    textAlign: "justify",
  },
  bulletList: {
    marginLeft: 0,
  },
  bulletItem: {
    fontSize: 10,
    marginBottom: 1,
    lineHeight: 1.3,
  },
  skillsList: {
    fontSize: 10,
    lineHeight: 1.3,
  },
  link: {
    color: "#000000",
    textDecoration: "none",
  },
});

interface CVDocumentProps {
  cv: CVState;
}

/**
 * Format date for display
 * Returns "Present" if endDate is null
 * Formats date as "Month Year" (e.g., "February 2020")
 */
function formatDate(date: string | null): string {
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
}

/**
 * Clean description text by removing bullet points added by user
 * Removes "-", "•", "*" at the beginning of lines
 */
function cleanDescription(description: string): string {
  return description
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .join("\n");
}

/**
 * Clean URL by removing http:// or https://
 */
function cleanUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

/**
 * CV Document Component
 *
 * Renders complete CV as a PDF document.
 * Uses automatic page breaks and supports multi-page output.
 * Enhanced layout with improved typography and spacing (Phase 10).
 */
export function CVDocument({ cv }: CVDocumentProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Personal Information Section */}
        <View style={styles.header}>
          <Text style={styles.name}>{cv.personalInfo.fullName}</Text>
          <View style={styles.contactInfo}>
            {cv.personalInfo.location && (
              <Text style={styles.contactItem}>{cv.personalInfo.location}</Text>
            )}
            {cv.personalInfo.location &&
              (cv.personalInfo.email || cv.personalInfo.links.length > 0) && (
                <Text style={styles.contactItem}>•</Text>
              )}
            {cv.personalInfo.email && (
              <Text style={styles.contactItem}>{cv.personalInfo.email}</Text>
            )}
            {cv.personalInfo.email && cv.personalInfo.links.length > 0 && (
              <Text style={styles.contactItem}>•</Text>
            )}
            {cv.personalInfo.links.map((link, index) => (
              <Link key={index} src={link} style={styles.contactItem}>
                {link}
              </Link>
            ))}
          </View>
        </View>

        {/* Summary Section */}
        {cv.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.entryDescription}>{cv.summary}</Text>
          </View>
        )}

        {/* Divider */}
        {cv.summary && cv.experience.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Experience Section */}
        {cv.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {cv.experience.map((entry, index) => (
              <View key={index} style={styles.entry}>
                <View style={styles.entryHeaderRow}>
                  <Text style={styles.entryTitle}>{entry.role}</Text>
                  <View
                    style={{ flexDirection: "row", alignItems: "baseline" }}
                  >
                    <Text style={styles.entryDate}>
                      {formatDate(entry.startDate)} –{" "}
                      {formatDate(entry.endDate)}
                    </Text>
                    {entry.location && (
                      <Text style={styles.entryLocation}>
                        {" "}
                        • {entry.location}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={styles.entryCompany}>{entry.company}</Text>
                <View style={styles.bulletList}>
                  {cleanDescription(entry.description)
                    .split("\n")
                    .map((line, i) => (
                      <Text key={i} style={styles.bulletItem}>
                        • {line}
                      </Text>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Divider */}
        {cv.experience.length > 0 && cv.projects.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Projects Section */}
        {cv.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {cv.projects.map((project, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>{project.name}</Text>
                <Text style={styles.entryLocation}>
                  {project.role}
                  {project.link && <Text> • {cleanUrl(project.link)}</Text>}
                </Text>
                <View style={styles.bulletList}>
                  {cleanDescription(project.description)
                    .split("\n")
                    .map((line, i) => (
                      <Text key={i} style={styles.bulletItem}>
                        • {line}
                      </Text>
                    ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Divider */}
        {cv.projects.length > 0 && cv.education.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Education Section */}
        {cv.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {cv.education.map((edu, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entryDescription}>
                  {edu.institution} • {edu.location} • {edu.year}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Divider */}
        {cv.education.length > 0 && cv.languages.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Languages Section */}
        {cv.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {cv.languages.map((lang, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>
                  {lang.language}
                  <Text style={{ fontWeight: "normal" }}> — {lang.proficiency}</Text>
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Divider */}
        {cv.languages.length > 0 && cv.skills.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Skills Section */}
        {cv.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.skillsList}>{cv.skills.join(", ")}</Text>
          </View>
        )}

        {/* Divider */}
        {(cv.skills.length > 0 || cv.languages.length > 0) && cv.certifications.length > 0 && (
          <View style={styles.divider} />
        )}

        {/* Certifications Section */}
        {cv.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {cv.certifications.map((cert, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>{cert.title}</Text>
                <Text style={styles.entryDescription}>
                  {cert.issuer}
                  {cert.year && ` - ${cert.year}`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
