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

// ✅ API আগে
app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// ===== MongoDB Connect =====
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const __dirname = path.resolve();
    const clientBuildPath = path.join(__dirname, "../client/dist");

    // Static React files
    app.use(express.static(clientBuildPath));

    // ✅ FINAL FIX (catch-all)
    app.use((req, res) => {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.log("MongoDB connection error:", err));