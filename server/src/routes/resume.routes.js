import { Router } from "express";
import { deleteResume, getResume, listResumes, listRules, uploadAndAnalyze, uploadRules } from "../controllers/resume.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/error.middleware.js";
import { uploadResume } from "../middleware/upload.middleware.js";

const router = Router();

router.use(protect);
router.get("/", listRules, validate, listResumes);
router.post("/", uploadResume.single("resume"), uploadRules, validate, uploadAndAnalyze);
router.get("/:id", getResume);
router.delete("/:id", deleteResume);

export default router;
