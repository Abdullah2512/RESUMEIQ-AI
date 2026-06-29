import { body } from "express-validator";
import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { sendAuthResponse } from "../utils/tokens.js";

export const registerRules = [
  body("name").trim().isLength({ min: 2, max: 80 }),
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters")
];

export const loginRules = [
  body("email").isEmail().normalizeEmail(),
  body("password").notEmpty()
];

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) throw new ApiError(409, "An account already exists for this email");

    const user = new User({ name, email, provider: "local" });
    await user.setPassword(password);
    await user.save();

    sendAuthResponse(res, user, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid email or password");
    }

    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
}

export async function googleLogin(req, res, next) {
  try {
    const { credential } = req.body;
    if (!credential) throw new ApiError(400, "Google credential is required");

    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    if (!response.ok) throw new ApiError(401, "Invalid Google credential");
    const profile = await response.json();

    if (profile.aud !== process.env.GOOGLE_CLIENT_ID) {
      throw new ApiError(401, "Google client mismatch");
    }

    const update = {
      name: profile.name,
      email: profile.email,
      avatar: profile.picture,
      provider: "google"
    };
    const user = await User.findOneAndUpdate(
      { email: profile.email },
      { $set: update },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    sendAuthResponse(res, user);
  } catch (error) {
    next(error);
  }
}

export async function me(req, res) {
  res.json({ user: req.user.toSafeJSON() });
}
