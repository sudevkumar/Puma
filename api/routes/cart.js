const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Cart = require("../model/CartModel");
const router = express.Router();

// Create a cart item
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newCartItem = new Cart(req.body);
    const savedCartItem = await newCartItem.save();
    res.status(201).json(savedCartItem);
  } catch (error) {
    console.error("Error creating cart item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get cart items
router.get("/get", verifyToken, async (req, res) => {
  const query = req.query;
  let filter = {};

  Object.keys(query).forEach((key) => {
    filter[key] = { $regex: new RegExp(query[key], "i") }; // 'i' makes it case-insensitive
  });

  try {
    const cartItems = await Cart.find(filter).sort({ createdAt: -1 });
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a cart item
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedCartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete all cart items by user ID
router.delete("/delete/:userId", verifyToken, async (req, res) => {
  try {
    await Cart.deleteMany({ userId: req.params.userId });
    res.status(200).json({ message: "All cart items have been deleted." });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
