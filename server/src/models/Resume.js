import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema(
  {
    title: String,
    detail: String,
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium"
    }
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    fileName: {
      type: String,
      required: true
    },
    filePath: String,
    text: {
      type: String,
      required: true
    },
    targetRole: {
      type: String,
      required: true
    },
    atsScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    summary: String,
    rewrite: String,
    skillsFound: [String],
    skillGaps: [String],
    missingKeywords: [String],
    grammarSuggestions: [suggestionSchema],
    strengths: [String],
    risks: [String],
    rawAnalysis: mongoose.Schema.Types.Mixed
  },
  { timestamps: true }
);

resumeSchema.index({ user: 1, createdAt: -1 });
resumeSchema.index({ fileName: "text", targetRole: "text", summary: "text" });

export default mongoose.model("Resume", resumeSchema);
