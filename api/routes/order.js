const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Order = require("../model/OrderModel");
const router = express.Router();

// Create a cart post
router.post("/create", async (req, res) => {
  try {
    const newPost = new Order(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

router.get("/get", async (req, res) => {
  const query = req.query;
  let filter = {};

  Object.keys(query).forEach((key) => {
    filter[key] = { $regex: new RegExp(query[key], "i") }; // 'i' makes it case-insensitive
  });
  try {
    const cart = await Order.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
