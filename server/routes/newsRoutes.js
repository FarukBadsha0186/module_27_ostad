import express from "express";
import {
  getAllNews,
  getSingleNews,
  createNews,
  updateNews,
  deleteNews,
  getMyNews,
  getTopNews,

  
  

} from "../controllers/newsController.js";

import protect from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getAllNews);
router.get("/top", getTopNews);
router.get("/my-news", protect, getMyNews);
router.post("/", protect, createNews);
router.get("/:id", getSingleNews);
router.put("/:id", protect, updateNews);
router.delete("/:id", protect, deleteNews);




export default router;