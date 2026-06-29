import { body } from "express-validator";

export const updateProfileRules = [
  body("name").optional().trim().isLength({ min: 2, max: 80 }),
  body("targetRole").optional().trim().isLength({ min: 2, max: 120 }),
  body("bio").optional().trim().isLength({ max: 600 })
];

export async function updateProfile(req, res, next) {
  try {
    const allowed = ["name", "targetRole", "bio"];
    for (const key of allowed) {
      if (req.body[key] !== undefined) req.user[key] = req.body[key];
    }
    await req.user.save();
    res.json({ user: req.user.toSafeJSON() });
  } catch (error) {
    next(error);
  }
}
