// authMiddleware.js
import jwt from "jsonwebtoken"; // ES Modules syntax
import { User } from "../models/user.models.js"; // Adjust the path as needed
export const authMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: Invalid header" });
      }
  
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Verify user exists in DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized: User not found" });
      }
  
      req.user = user; // Attach full user object
      next();
    } catch (error) {
      res.status(401).json({ message: `Unauthorized: ${error.message}` });
    }
  };