import { Router } from "express";
import { coachRules, listMessages, sendMessage } from "../controllers/coach.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/error.middleware.js";

const router = Router();

router.use(protect);
router.get("/messages", listMessages);
router.post("/messages", coachRules, validate, sendMessage);

export default router;
