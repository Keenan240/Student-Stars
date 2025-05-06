import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';

// 🔁 Load CSV only once
const programs = (() => {
  const filePath = path.join(process.cwd(), 'public', 'programs_name.csv');
  const file = fs.readFileSync(filePath, 'utf8');
  const { data } = Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
  });
  console.log('✅ CSV loaded with rows:', data.length);
  return data as any[];
})();

// 🔤 Normalize a string
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

// 🔍 Exported search function
export function searchPrograms(query: string, limit = 3): string {
  console.log('🔎 searchPrograms CALLED');
  console.log('🔎 Query:', query);

  const queryWords = normalize(query).split(/\s+/).filter(Boolean);

  const matches = programs
    .map((p) => {
      const combined = normalize(
        `${p["Program Name"]} ${p.School} ${p.Description} ${p.Tuition} ${p["Predicted Grade Cutoff"]} ${p["Admission Range"]}`
      );
      const score = queryWords.reduce((acc, word) => acc + (combined.includes(word) ? 1 : 0), 0);
      return { program: p, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (matches.length === 0) {
    console.log('❗ No matches found for:', queryWords);
    return 'No relevant programs found.';
  }

  console.log('✅ Matched programs:', matches.map((m) => m.program["Program Name"]));

  return matches.map(({ program: p }) =>
    `• **${p["Program Name"]}** at ${p.School}\n` +
    `  Tuition: ${p.Tuition}, Cutoff: ${p["Predicted Grade Cutoff"]}, Co-Op: ${p["Co-Op status"]}, Supp App: ${p["Supp app requirement status"]}\n` +
    `  ${p.Description}`
  ).join('\n\n');
}
