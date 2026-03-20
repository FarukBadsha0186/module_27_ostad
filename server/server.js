// // import dotenv from "dotenv";
// // import express from "express";
// // import mongoose from "mongoose";
// // import cors from "cors";
// // import path from "path";

// // dotenv.config({
// //   path: path.resolve(".env")
// // });

// // import authRoutes from "./routes/authRoutes.js";
// // import newsRoutes from "./routes/newsRoutes.js";



// // const app = express();

// // app.use(cors());
// // app.use(express.json());

// // app.use("/api/auth", authRoutes);
// // app.use("/api/news", newsRoutes);

// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => {
// //     console.log("MongoDB Connected");
// //     app.listen(5000, () => console.log("Server running on port 5000"));
// //   })
// //   .catch(err => console.log(err));
  

// //   const mongoose = require('mongoose');
// // require('dotenv').config();

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/news", newsRoutes);

// // MongoDB Connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.log("MongoDB connection error:", err));

// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import path from "path";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// import authRoutes from "./routes/authRoutes.js";
// import newsRoutes from "./routes/newsRoutes.js";

// app.use("/api/auth", authRoutes);
// app.use("/api/news", newsRoutes);

// // MongoDB Connect
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB Connected");

//     // Serve frontend static files
//     const __dirname = path.resolve();
//     app.use(express.static(path.join(__dirname, "../client/dist")));

//     // Catch-all route for React Router
//     app.use((req, res) => {
//       res.sendFile(path.join(__dirname, "../client/dist/index.html"));
//     });

//     // Start server
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => console.log("MongoDB connection error:", err));

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const __dirname = path.resolve();
    const clientBuildPath = path.join(__dirname, "../client/dist");

    // Serve static files
    app.use(express.static(clientBuildPath));

    // ✅ FIXED Catch-all route (NO ERROR)
    app.get(/.*/, (req, res) => {
      res.sendFile(path.join(clientBuildPath, "index.html"));
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log("MongoDB connection error:", err));