import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDb } from "./src/config/db.js";

dotenv.config({
  path: ".env",
});

connectDb();
app.listen(3000, () => {
  console.log("Sever running on port");
});
