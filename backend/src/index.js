import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/resumes", resumeRoutes);

app.get("/api/v1/test-auth", authMiddleware, (req, res) => {
    res.json({ message: "Authenticated!", user: req.user });
  });

// Start server
const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

start();