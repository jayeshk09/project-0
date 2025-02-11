// src/controllers/resumeController.js
import { Resume } from "../models/resume.models.js";
import { fetchLeetCodeStats, fetchCodeforcesStats } from "../utils/apiHelpers.js";
import { generateResumePDF } from "../utils/pdfGenerator.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
  try {
    const { personalDetails, education, experience, skills, leetcodeUsername, codeforcesUsername } = req.body;
    const userId = req.user.id; // Extracted from authMiddleware

    // Fetch LeetCode/Codeforces stats (if usernames are provided)
    const leetcodeStats = leetcodeUsername ? await fetchLeetCodeStats(leetcodeUsername) : null;
    const codeforcesStats = codeforcesUsername ? await fetchCodeforcesStats(codeforcesUsername) : null;

    // Create the resume
    const resume = await Resume.create({
      user: userId, // Assign the user ID
      personalDetails,
      education,
      experience,
      skills,
      leetcodeStats,
      codeforcesStats,
    });

    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getResumes = async (req, res) => {
    try {
      const userId = req.user.id;
      const resumes = await Resume.find({ user: userId });
      res.status(200).json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

  export const downloadResumePDF = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
  
      const resume = await Resume.findOne({ _id: id, user: userId });
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
  
      // Generate PDF
      const pdfBytes = await generateResumePDF(resume);
  
      // Define file path
      const filePath = path.join("public", "temp", `${resume.personalDetails.name}_Resume.pdf`);
  
      // Save PDF to the server
      fs.writeFileSync(filePath, pdfBytes);
  
      // Send response with file URL
      res.status(200).json({ downloadUrl: `/temp/${resume.personalDetails.name}_Resume.pdf` });
  
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };