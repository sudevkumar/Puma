const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Cart = require("../model/CartModel");
const router = express.Router();

// Create a cart post
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Cart(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get Cart

router.get("/get", verifyToken, async (req, res) => {
  const query = req.query;
  let filter = {};

  Object.keys(query).forEach((key) => {
    filter[key] = { $regex: new RegExp(query[key], "i") }; // 'i' makes it case-insensitive
  });
  try {
    const cart = await Cart.find(filter).sort({
      createdAt: -1,
    });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Delete Cart Item

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Mobile has been deleted!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
