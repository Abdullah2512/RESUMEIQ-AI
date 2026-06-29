import fs from "fs/promises";
import { createRequire } from "module";
import { ApiError } from "../utils/apiError.js";

const require = createRequire(import.meta.url);
const pdf = require("pdf-parse");

export async function extractPdfText(filePath) {
  const buffer = await fs.readFile(filePath);
  const parsed = await pdf(buffer);
  const text = parsed.text?.replace(/\s+/g, " ").trim();

  if (!text || text.length < 150) {
    throw new ApiError(400, "The PDF does not contain enough readable resume text");
  }

  return text.slice(0, 30000);
}
