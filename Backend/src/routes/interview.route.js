import { Router } from "express";
import authMidleware from "../middleware/auth.midleware.js";
import interviewController from "../controllers/interview.controller.js";
import upload from "../middleware/file.middleware.js";

const interviewRouter = Router();
/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self descripotion and resume pdf and job description
 * @access private
 */

interviewRouter.post(
  "/",
  authMidleware.authMiddleware,
  upload.single("resume"),
  interviewController.generateInterviewController,
);

export default interviewRouter;
