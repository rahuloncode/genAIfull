import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.midleware.js";

const authRouter = Router();

/**
 * @route POST api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.loginUser);
authRouter.get("/logout", authController.logout);
authRouter.get("/getme", authMiddleware.authMiddleware, authController.getMe);

export default authRouter;
