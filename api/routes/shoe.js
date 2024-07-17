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

// Get All Shoes

router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = {
      title: { $regex: query.search, $options: "i" },
    };
    const shoe = await Shoe.find(query.search ? searchFilter : null).sort({
      createdAt: -1,
    });
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Get Shoe By Id

router.get("/:id", async (req, res) => {
  try {
    const shoe = await Shoe.findById(req.params.id);
    res.status(200).json(shoe);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Update A Shoe

router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const updatedShoe = await Shoe.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedShoe);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

// Delete A Shoe
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Shoe.findByIdAndDelete(req.params.id);

    res.status(200).json("Product has been deleted!");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
});

module.exports = router;
