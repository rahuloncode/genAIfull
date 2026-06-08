import { Router } from "express";
import authMidleware from "../middleware/auth.midleware.js";
import interviewController from "../controllers/interview.controller.js";

const interviewRouter = Router();
/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self descripotion and resume pdf and job description
 * @access private
 */
console.log("hello");
interviewRouter.post(
  "/",
  authMidleware.authMiddleware,
  interviewController.generateInterviewController,
);

export default interviewRouter;
