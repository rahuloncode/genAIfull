import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interview.model.js";

const generateInterviewController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const { self_declaration, job_Description } = req.body;
    if (!self_declaration || !job_Description) {
      return res.status(400).json({
        message: "self_declaration and job_Description are required",
      });
    }

    const pdfData = new Uint8Array(req.file.buffer);
    const resumeContent = await new PDFParse(pdfData).getText();

    const reportgenerated = await generateInterviewReport({
      resume: resumeContent.text,
      self_declaration,
      job_Description,
    });
    console.log(reportgenerated);
    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resumeText: resumeContent.text,
      selfDeclartion: self_declaration,
      jobDescription: job_Description,
      ...reportgenerated,
    });

    return res.status(201).json({
      message: "Report generated successfully",
      reportgenerated,
    });
  } catch (error) {
    console.error("Interview Controller Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export default { generateInterviewController };
