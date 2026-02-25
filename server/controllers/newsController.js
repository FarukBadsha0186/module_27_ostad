import News from "../models/News.js";

// GET ALL NEWS

export const getAllNews = async (req, res) => {
    try {

        const news = await News.find().populate("author", "name email");

        res.json(news);

    } catch (error) {
        res.status(500).json(error.message);
    }
};

// GET SINGLE NEWS
export const getSingleNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news)
      return res.status(404).json({ message: "News not found" });

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE NEWS
export const createNews = async (req, res) => {
  try {
    const { title, description, content, image, category } = req.body;

    const news = await News.create({
      title,
      description,
      content,
      image,
      category,
      author: req.user,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE NEWS
export const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news)
      return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user)
      return res.status(401).json({ message: "Not Authorized" });

    const updated = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE NEWS
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news)
      return res.status(404).json({ message: "News not found" });

    if (news.author.toString() !== req.user)
      return res.status(401).json({ message: "Not Authorized" });

    await news.deleteOne();

    res.json({ message: "News deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


export const getMyNews = async (req, res) => {
  try {

    console.log("USER ID:", req.user); // Debug check

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized User" });
    }

    const news = await News.find({
      author: req.user
    });

    res.json(news);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get Top 6 News
export const getTopNews = async (req, res) => {
  try {
    const topNews = await News.find()
      .sort({ createdAt: -1 }) 
      .limit(6); 

    res.status(200).json(topNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};