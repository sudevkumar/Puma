const express = require("express");
const verifyToken = require("../middleware/verifyToken");
const Shoe = require("../model/ShoeModel");
const router = express.Router();

// Create a shoe post
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newShoe = new Shoe(req.body);
    const savedShoe = await newShoe.save();
    res.status(201).json(savedShoe);
  } catch (error) {
    console.error("Error creating shoe:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all shoes
router.get("/", async (req, res) => {
  try {
    const shoes = await Shoe.find().sort({ createdAt: -1 });
    res.status(200).json(shoes);
  } catch (error) {
    console.error("Error fetching shoes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Filter shoes
router.get("/searchs", async (req, res) => {
  const query = req.query;
  let filter = {};

  Object.keys(query).forEach((key) => {
    filter[key] = { $regex: new RegExp(query[key], "i") };
  });

  try {
    const shoes = await Shoe.find(filter);
    res.status(200).json(shoes);
  } catch (error) {
    console.error("Error filtering shoes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Filter with infinite scroll
router.get("/search", async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;
  let filter = {};

  Object.keys(query).forEach((key) => {
    filter[key] = { $regex: new RegExp(query[key], "i") };
  });

  try {
    console.time("queryExecution");
    const shoes = await Shoe.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalItems = await Shoe.countDocuments(filter);
    console.timeEnd("queryExecution");

    res.status(200).json({
      shoes,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: parseInt(page),
    });
  } catch (error) {
    console.error("Error fetching shoes with infinite scroll:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get all new shoes
router.get("/recent", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentProducts = await Shoe.find({
      createdAt: { $gte: sevenDaysAgo },
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalItems = await Shoe.countDocuments({
      createdAt: { $gte: sevenDaysAgo },
    });

    res.status(200).json({
      recentProducts,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching recent shoes:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Get shoe by ID
router.get("/:id", async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    if (!shoe) return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json(shoe);
  } catch (error) {
    console.error("Error fetching shoe by ID:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Update a shoe
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedShoe)
      return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json(updatedShoe);
  } catch (error) {
    console.error("Error updating shoe:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Delete a shoe
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);
    if (!deletedShoe)
      return res.status(404).json({ message: "Shoe not found" });
    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    console.error("Error deleting shoe:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
