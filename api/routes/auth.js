const express = require("express");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create router
const router = express.Router();

// Helper function for user creation
const createUser = async (
  { username, email, password, phone, userimg, type },
  res
) => {
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phone }],
    });
    if (existingUser) {
      return res.status(409).json({
        msg: "Username, email, or phone number already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      userimg,
      email,
      password: hashPassword,
      phone,
      type,
    });

    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};

// Register
router.post("/register", async (req, res) => {
  createUser({ ...req.body, type: false }, res);
});

// Register Puma user
router.post("/registerpuma", async (req, res) => {
  createUser({ ...req.body, type: true }, res);
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" } // Set token expiration
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// Login Puma user
router.post("/loginpuma", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.type !== true) {
      return res.status(403).json({ message: "Unauthorized access!" });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "1h" } // Set token expiration
    );

    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
