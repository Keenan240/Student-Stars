import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from '@langchain/openai';
import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';

// Load CSV once at startup
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

// Better matching
function searchPrograms(query: string, limit = 3): string {
  const queryWords = query.toLowerCase().split(/\s+/).filter(Boolean);

  const matches = programs.filter((p) => {
    const combined =
      `${p["Program Name"]} ${p.School} ${p.Description} ${p.Tuition} ${p["Predicted Grade Cutoff"]} ${p["Admission Range"]}`
        .toLowerCase();

    return queryWords.every((word) => combined.includes(word));
  }).slice(0, limit);

  console.log('🔎 Matched programs:', matches.length);

  if (matches.length === 0) return 'No relevant programs found.';

  return matches.map((p) =>
    `• **${p["Program Name"]}** at ${p.School}\n` +
    `  Tuition: ${p.Tuition}, Cutoff: ${p["Predicted Grade Cutoff"]}, Co-Op: ${p["Co-Op status"]}, Supp App: ${p["Supp app requirement status"]}\n` +
    `  ${p.Description}`
  ).join('\n\n');
}

// Memory
const memory = new BufferMemory();

// Free LLM Model
const model = new ChatOpenAI({
  temperature: 0.7,
  modelName: 'deepseek/deepseek-chat:free',
  openAIApiKey: process.env.OPENROUTER_API_KEY!,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
  },
});

// Conversation Chain
const chain = new ConversationChain({
  llm: model,
  memory,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: 'Missing question' });
  }

  try {
    const context = searchPrograms(question);

    const prompt = `
You are a helpful Canadian university admissions advisor so all context should be under this assumption.
When asked about schools mention what they are known for and good at
When asked about specific prograsm mention what they are known for and good at
When asked about requirements for any application or any serious question that could affect
an application you should always mention that the student should check the official website of the school and
to understand you can make mistakes or that the information may change or be outdated.
Try and be concise with your answers and provide only key information.

You are an assistant that helps Grade11 and Grade 12 students navigate their university applications.
You should answer the question based on the provided data.
You should add a very small note at the end of your answer if you used the data or not to answer, with a "beta v1.0 response" tag in lower case on a new line with a empty space above it (italics underline).


PROGRAM DATA:
${context}

STUDENT QUESTION:
"${question}"

ANSWER:
`.trim();

    const result = await chain.call({ input: prompt });
    const answer = result.response;

    res.status(200).json({ answer, debug: context });
  } catch (err: any) {
    console.error('❌ Chat error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong' });
  }
}
