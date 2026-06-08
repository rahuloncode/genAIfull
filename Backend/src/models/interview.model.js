import mongoose, { Schema } from "mongoose";

/**
 * job descriptiom
 * resume text
 * self description
 *
 * matchScore:number
 *
 * -technical Questions :
 *          [{
 *          Question:"",
 *intention:"",
 answer:""
 *          }]

 */
const technicalSchema = new Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const behaviouralSchema = new Schema(
  {
    question: { type: String, required: true },
    intention: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false },
);

const skillGapSchema = new Schema(
  {
    skill: { type: String, required: true },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const preparatioPlanSchema = new Schema(
  {
    day: { type: Number, required: true },
    focus: {
      type: String,
      required: [true, "Focus is required"],
    },
    tasks: {
      type: String,
      required: [true, "task is required"],
    },
  },
  { _id: false },
);

// main Schema
const intervireReportSchema = Schema(
  {
    jobDescription: { type: String, required: true },
    resumeText: {
      type: String,
    },
    selfDeclartion: { type: String },
    matchScore: { type: Number, min: 0, max: 100 },
    technicalQuestions: [technicalSchema],
    behaviouralQuestions: [behaviouralSchema],
    SkillGaps: [skillGapSchema],
    preoarationPlan: [preparatioPlanSchema],
  },
  { timestamp: true },
);

const interviewReportModel = mongoose.model(
  "InterviewReport",
  intervireReportSchema,
);

export default interviewReportModel;
