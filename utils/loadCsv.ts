import Papa from 'papaparse';

export async function loadPrograms(): Promise<any[]> {
  const res = await fetch('/programs_name.csv');
  const text = await res.text();

  const { data } = Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  });

  return data as any[];
}
