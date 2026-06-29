import { Router } from "express";
import { updateProfile, updateProfileRules } from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/error.middleware.js";

const router = Router();

router.use(protect);
router.patch("/me", updateProfileRules, validate, updateProfile);

export default router;
