import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: {
      name: String,
      email: String,
      phone: String,
      address: String,
    },
    education: [
      {
        institution: String,
        degree: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    skills: [String],
    leetcodeStats: {
      username: String,
      totalSolved: Number,
      easySolved: Number,
      mediumSolved: Number,
      hardSolved: Number,
      ranking: Number,
    },
    codeforcesStats: {
      username: String,
      rating: Number,
      maxRating: Number,
      rank: String,
      solvedProblems: Number,
    },
  },
  { timestamps: true }
);

export const Resume = mongoose.model("Resume", resumeSchema);