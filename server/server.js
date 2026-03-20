// server.js - Final Deploy Ready Version

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Routes =====
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

// API Routes must come BEFORE catch-all
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// ===== MongoDB Connect =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // ===== Serve React Build =====
    const __dirname = path.resolve();
    const clientBuildPath = path.join(__dirname, "../client/dist");
    app.use(express.static(clientBuildPath));

    // ===== Catch-all route for React Router =====
    // NOTE: Must be AFTER API routes!
    app.get("*", (req, res) => {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });

    // ===== Start Server =====
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

  })
  .catch(err => console.log("MongoDB connection error:", err));