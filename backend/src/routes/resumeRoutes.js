// src/routes/resumeRoutes.js
import express from "express";
import { createResume } from "../controllers/resumeController.js";
import { getResumes } from "../controllers/resumeController.js";
import { downloadResumePDF } from "../controllers/resumeController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect the route with authMiddleware
router.post("/", authMiddleware, createResume);

// src/routes/resumeRoutes.js
router.get("/", authMiddleware, getResumes);

// src/routes/resumeRoutes.js
router.get("/", authMiddleware, getResumes);

router.get("/:id/download", authMiddleware, downloadResumePDF);

export default router;