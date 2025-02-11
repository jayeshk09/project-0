import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Signup controller
export const signup = async (req, res) => {
    try {
      const { username, email, fullName, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Create new user
      const user = await User.create({
        username,
        email,
        fullName,
        password,
      });
  
      // Generate JWT token
   // In authController.js (signup/login)
   const token = jwt.sign(
    { id: user._id.toString() }, // Convert _id to string
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // Use variable
  );
  
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };

// Login controller
export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Compare passwords
      const isMatch = await user.isPasswordCorrect(password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  };
