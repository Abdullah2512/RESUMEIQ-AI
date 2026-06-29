import dotenv from "dotenv";
dotenv.config();
console.log("Gemini Key:", process.env.GEMINI_API_KEY?.slice(0, 10));

import app from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 8080;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`ResumeIQ API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
