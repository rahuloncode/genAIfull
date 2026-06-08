import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";
// import generateInterviewReport from "./src/services/ai.service.js";
// import {
//   resume,
//   self_declaration,
//   job_Description,
// } from "./src/services/temp.js";

dotenv.config({
  path: ".env",
});

connectDb();
// generateInterviewReport({ resume, self_declaration, job_Description });

app.listen(3000, () => {
  console.log("Sever running on port");
});
