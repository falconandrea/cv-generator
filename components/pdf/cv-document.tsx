/**
 * CV Document Component
 *
 * Generates an ATS-optimized PDF from CV state using @react-pdf/renderer.
 * Matches the preview layout for consistency.
 *
 * ATS Rules (from ATS_RULES.md):
 * - No tables, columns, icons, images
 * - Clear section headers
 * - Consistent date formats
 * - Simple bullet points
 * - Left-aligned text
 *
 * PDF Requirements (from ROADMAP.md Phase 5):
 * - Standard fonts: Helvetica (primary), Arial (fallback)
 * - Automatic page breaks
 * - Section grouping
 * - Multi-page support
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
    padding: 32,
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
    color: "#000000",
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactInfo: {
    fontSize: 9,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  contactItem: {
    color: "#000000",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  entry: {
    marginBottom: 12,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  entryDate: {
    fontSize: 9,
  },
  entryLocation: {
    fontSize: 9,
    marginBottom: 2,
  },
  entryDescription: {
    fontSize: 9,
  },
  bulletList: {
    marginLeft: 16,
  },
  bulletItem: {
    marginBottom: 2,
  },
  link: {
    color: "#000000",
    textDecoration: "underline",
  },
});

interface CVDocumentProps {
  cv: CVState;
}

/**
 * Format date for display
 * Returns "Present" if endDate is null
 */
function formatDate(date: string | null): string {
  if (!date) return "Present";
  return date;
}

/**
 * CV Document Component
 *
 * Renders the complete CV as a PDF document.
 * Uses automatic page breaks and supports multi-page output.
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
            {cv.personalInfo.email && (
              <Text style={styles.contactItem}>{cv.personalInfo.email}</Text>
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
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text>{cv.summary}</Text>
          </View>
        )}

        {/* Experience Section */}
        {cv.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {cv.experience.map((entry, index) => (
              <View key={index} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {entry.role} - {entry.company}
                  </Text>
                  <Text style={styles.entryDate}>
                    {formatDate(entry.startDate)} - {formatDate(entry.endDate)}
                  </Text>
                </View>
                {entry.location && (
                  <Text style={styles.entryLocation}>{entry.location}</Text>
                )}
                <Text style={styles.entryDescription}>{entry.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills Section */}
        {cv.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.bulletList}>
              {cv.skills.map((skill, index) => (
                <Text key={index} style={styles.bulletItem}>
                  • {skill}
                </Text>
              ))}
            </View>
          </View>
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

        {/* Projects Section */}
        {cv.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {cv.projects.map((project, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>
                  {project.name}
                  {project.link && ` - ${project.link}`}
                </Text>
                <Text style={styles.entryLocation}>{project.role}</Text>
                <Text style={styles.entryDescription}>
                  {project.description}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education Section */}
        {cv.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {cv.education.map((edu, index) => (
              <View key={index} style={styles.entry}>
                <Text style={styles.entryTitle}>{edu.degree}</Text>
                <Text style={styles.entryDescription}>
                  {edu.institution} - {edu.location}
                </Text>
                <Text style={styles.entryDescription}>{edu.year}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
}
