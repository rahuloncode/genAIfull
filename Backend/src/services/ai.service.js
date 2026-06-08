import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import { json, z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
dotenv.config();

const interviewReportSchema = z.object({
  matchscore: z
    .number()
    .describe(
      "A score between 0 to 100 indicating how well the candidate perform",
    ),
  technicalQuestions: z.array(
    z
      .object({
        questions: z
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
        questions: z
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
  skillgap: z.array(
    z.object({
      skills: z.string().describe("the sj=kill which the candidate is lacking"),
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
  const prompt = `generate an interview reeport for a candidate with thhe folowing details: Resume :${resume} self_declaration :${self_declaration} and job description ${job_Description}`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    console.log(JSON.parse(response.text));
    // interviewReportSchema.parse(JSON.parse(response.text));
  } catch (error) {
    console.log("gemini Model caught on error");
  }
};

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

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
