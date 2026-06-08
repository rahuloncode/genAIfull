import express from "express";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import interviewRouter from "./routes/interview.route.js";
import authMidleware from "./middleware/auth.midleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// the router
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

export default app;
