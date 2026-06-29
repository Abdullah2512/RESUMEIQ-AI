import { Router } from "express";
import { googleLogin, login, loginRules, me, register, registerRules } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/error.middleware.js";

const router = Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post("/google", googleLogin);
router.get("/me", protect, me);

export default router;
