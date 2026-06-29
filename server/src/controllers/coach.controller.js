import { body } from "express-validator";
import CoachMessage from "../models/CoachMessage.js";
import Resume from "../models/Resume.js";
import { askCareerCoach } from "../services/gemini.service.js";

export const coachRules = [
  body("message").trim().isLength({ min: 2, max: 2000 })
];

export async function listMessages(req, res, next) {
  try {
    const messages = await CoachMessage.find({ user: req.user._id }).sort({ createdAt: 1 }).limit(80);
    res.json({ messages });
  } catch (error) {
    next(error);
  }
}

export async function sendMessage(req, res, next) {
  try {
    const { message } = req.body;
    const latestResume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 }).select("-text");
    const history = await CoachMessage.find({ user: req.user._id }).sort({ createdAt: 1 }).limit(20);

    const userMessage = await CoachMessage.create({
      user: req.user._id,
      role: "user",
      content: message
    });

    const answer = await askCareerCoach({
      history,
      message,
      profile: {
        user: req.user.toSafeJSON(),
        latestResume
      }
    });

    const assistantMessage = await CoachMessage.create({
      user: req.user._id,
      role: "assistant",
      content: answer
    });

    res.status(201).json({ messages: [userMessage, assistantMessage] });
  } catch (error) {
    next(error);
  }
}
