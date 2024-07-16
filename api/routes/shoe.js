const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Shoe = require("../model/ShoneModel");
const router = express.Router();

// Create a show post
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Shoe(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
