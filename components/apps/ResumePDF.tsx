/**
 * PDF version of the resume, rendered with @react-pdf/renderer from the
 * same content/resume.ts data as the on-screen viewer — editing the content
 * file updates both. Imported dynamically only when Download is clicked.
 */
import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { resume } from "@/content/resume";

const styles = StyleSheet.create({
  page: {
    paddingVertical: 42,
    paddingHorizontal: 48,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e1c17",
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: 0.5 },
  headline: { fontSize: 11, color: "#c05f16", marginTop: 2 },
  contact: { fontSize: 9, color: "#5c5749", marginTop: 6 },
  section: { marginTop: 16 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#c05f16",
    borderBottomWidth: 1,
    borderBottomColor: "#d8d4c8",
    paddingBottom: 3,
    marginBottom: 6,
  },
  item: { marginBottom: 3 },
  bold: { fontFamily: "Helvetica-Bold" },
});

export function ResumeDocument() {
  return (
    <Document
      title={`${resume.name} — Resume`}
      author={resume.name}
    >
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{resume.name}</Text>
        <Text style={styles.headline}>{resume.headline}</Text>
        <Text style={styles.contact}>{resume.contactLine.join("   ·   ")}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {resume.education.map((e) => (
            <Text key={e} style={styles.item}>
              •  {e}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          {resume.skills.map((s) => (
            <Text key={s.label} style={styles.item}>
              <Text style={styles.bold}>{s.label}: </Text>
              {s.value}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {resume.projects.map((p) => (
            <Text key={p.name} style={styles.item}>
              <Text style={styles.bold}>{p.name}</Text> — {p.detail}
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Freelance Client Work</Text>
          {resume.freelance.map((f) => (
            <Text key={f.name} style={styles.item}>
              <Text style={styles.bold}>{f.name}</Text> — {f.detail}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}
