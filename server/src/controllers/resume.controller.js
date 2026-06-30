import { body, query } from "express-validator";
import Resume from "../models/Resume.js";
import { ApiError } from "../utils/apiError.js";
import { extractPdfText } from "../services/pdf.service.js";
import { analyzeResumeWithGemini } from "../services/gemini.service.js";

export const uploadRules = [
  body("targetRole").trim().isLength({ min: 2, max: 120 }).withMessage("Target role is required")
];

export const listRules = [
  query("search")
    .optional()
    .trim()
    .isLength({ max: 80 }),

  query("minScore")
    .optional({ values: "falsy" })
    .isInt({ min: 0, max: 100 }),

  query("sort")
    .optional()
    .isIn(["newest", "oldest", "score"])
];

export async function uploadAndAnalyze(req, res, next) {
  try {
    if (!req.file) throw new ApiError(400, "Resume PDF is required");
    const { targetRole } = req.body;
    const text = await extractPdfText(req.file.path);
    const analysis = await analyzeResumeWithGemini({ resumeText: text, targetRole });

    const resume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      filePath: req.file.path,
      text,
      targetRole,
      ...analysis,
      rawAnalysis: analysis
    });

    res.status(201).json({ resume });
  } catch (error) {
    next(error);
  }
}

export async function listResumes(req, res, next) {
  try {
    const { search = "", minScore, sort = "newest" } = req.query;
    const filter = { user: req.user._id };

    if (search) {
      filter.$text = { $search: search };
    }

    if (minScore !== undefined && minScore !== "") {
      filter.atsScore = { $gte: Number(minScore) };
    }

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      score: { atsScore: -1 }
    };

    const resumes = await Resume.find(filter)
      .select("-text -filePath -rawAnalysis")
      .sort(sortMap[sort])
      .limit(50);

    res.json({ resumes });
  } catch (error) {
    next(error);
  }
}

export async function getResume(req, res, next) {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) throw new ApiError(404, "Resume not found");
    res.json({ resume });
  } catch (error) {
    next(error);
  }
}

export async function deleteResume(req, res, next) {
  try {
    const resume = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!resume) throw new ApiError(404, "Resume not found");
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}