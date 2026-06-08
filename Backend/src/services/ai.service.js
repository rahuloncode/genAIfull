import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { json, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
dotenv.config();
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});
const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "A score between 0 to 100 indicating how well the candidate perform",
    ),
  technicalQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe("The technical questions can be asked in the interviw"),
        intention: z
          .string()
          .describe("The intention of interview behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc",
          ),
      })
      .describe(
        "Behaioural questions that can be asked in the interview along with their intention ",
      ),
  ),
  behaviouralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical questions can be asked in the interviw"),
        intention: z
          .string()
          .describe("The intention of interview behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc",
          ),
      }),
    )
    .describe(
      "Behaioural questions that can be asked in the interview along with their intention ",
    ),
  skillGaps: z.array(
    z.object({
      skill: z.string().describe("the skill which the candidate is lacking"),
      severity: z
        .enum(["low", "medium", "high"])
        .describe("the severity of thsi skill gap i.e"),
      answer: z
        .string()
        .describe(
          "How to answer this question, what points to cover, what approach to take etc",
        ),
    }),
  ),
  preparationPlan: z.array(
    z.object({
      day: z
        .number()
        .describe("the day number in the preparation plan, starting from 1"),
      focus: z.string(),
      tasks: z.array(z.string().describe("list of the task to be done")),
    }),
  ),
});

const generateInterviewReport = async ({
  resume,
  self_declaration,
  job_Description,
}) => {
  //Here the best prompt to generate result
  const prompt = `
You are an expert technical interviewer.

CRITICAL INSTRUCTION:
Return ONLY valid JSON.

IMPORTANT:
- technicalQuestions MUST be an array of OBJECTS
- Each item MUST have:
  - question (string)
  - intention (string)
  - answer (string)

DO NOT return strings inside arrays.

Resume:
${resume}

Self Declaration:
${self_declaration}

Job Description:
${job_Description}

Requirements:

1. Give a matchScore between 0 and 100.
2. Generate 5 technical interview questions.
3. Generate 5 behavioural interview questions.
4. Identify skill gaps with severity (low, medium, high).
5. Create a 7-day preparation plan.
6. Return ONLY valid JSON matching the provided schema.
7. Do not include markdown, explanations, or extra text.
`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });
    const parsedData = JSON.parse(response.text);

    return parsedData;
  } catch (error) {
    console.log("gemini Model caught on error");
    console.error("FULL ERROR:", error);
  }
};

// async function main() {
//   try {
//     const response = await ai.models.generateContent({
//       model: "gemini-2.5-flash",
//       contents: "Explain how AI works in a few words",
//     });

//     console.log(response.text);
//   } catch (error) {
//     console.log("gemini Model caught on error");
//   }
// }

export default generateInterviewReport;
