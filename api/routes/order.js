const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Order = require("../model/OrderModel");
const router = express.Router();

// Create a new order
router.post("/create", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get orders based on query
router.get("/get", verifyToken, async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    Object.keys(query).forEach((key) => {
      filter[key] = { $regex: new RegExp(query[key], "i") }; // Case-insensitive search
    });

    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all orders
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Update an order
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
