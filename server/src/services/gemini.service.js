import { GoogleGenerativeAI } from "@google/generative-ai";

const fallbackAnalysis = {
  atsScore: 78,
  summary: "This resume shows a solid professional foundation. Add clearer measurable impact, role-specific keywords, and a tighter summary to improve ATS performance.",
  rewrite: "Rewrite the resume with a concise summary, quantified achievements, action verbs, and role-aligned skills grouped by relevance.",
  skillsFound: ["Leadership", "Communication", "Project delivery"],
  skillGaps: ["Role-specific tooling", "Quantified business outcomes", "Recent industry keywords"],
  missingKeywords: ["cross-functional", "metrics", "automation", "stakeholder management"],
  grammarSuggestions: [
    {
      title: "Tighten bullet phrasing",
      detail: "Start bullets with strong action verbs and remove repeated passive phrasing.",
      severity: "medium"
    }
  ],
  strengths: ["Clear experience history", "Relevant transferable skills"],
  risks: ["Limited measurable outcomes", "Keyword coverage could be stronger"]
};

function getModel() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const genAI = new GoogleGenerativeAI(key);

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });
}

function extractJson(text) {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) return null;

  try {
    return JSON.parse(match[0]);
  } catch {
    return null;
  }
}

export async function analyzeResumeWithGemini({ resumeText, targetRole }) {
  const model = getModel();
  if (!model) return fallbackAnalysis;

  const prompt = `
You are ResumeIQ AI, an expert ATS resume analyst and career coach.

Analyze the resume for target role: "${targetRole}".

Return ONLY valid JSON with:
{
  "atsScore": number,
  "summary": string,
  "rewrite": string,
  "skillsFound": string[],
  "skillGaps": string[],
  "missingKeywords": string[],
  "grammarSuggestions": [
    {
      "title": string,
      "detail": string,
      "severity": "low" | "medium" | "high"
    }
  ],
  "strengths": string[],
  "risks": string[]
}

Resume:
${resumeText}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return extractJson(text) || fallbackAnalysis;
}

export async function askCareerCoach({ history, message, profile }) {
  const model = getModel();

  if (!model) {
    return "Focus on one target role, tailor your resume keywords to that role, and convert responsibilities into measurable achievements. Share a job description for more specific coaching.";
  }

  const prompt = `
You are ResumeIQ AI Career Coach.

Be concise, specific, and encouraging.

User profile:
${JSON.stringify(profile)}

Recent chat:
${JSON.stringify(history.slice(-8))}

User asks:
${message}
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}