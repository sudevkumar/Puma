const express = require("express");
const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create router
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, phone, userimg } = req.body;
    const userName = await User.findOne({ username: req.body.username });
    if (userName) {
      return res.status(401).json({
        msg: "Username already exist!",
      });
    }

    const eMail = await User.findOne({ email: req.body.email });
    if (eMail) {
      return res.status(401).json({
        msg: "Email already exist!",
      });
    }

    const phoneNumber = await User.findOne({ phone: req.body.phone });
    if (phoneNumber) {
      return res.status(401).json({
        msg: "Phone number already exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      userimg,
      email,
      password: hashPassword,
      phone,
      type: false,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/registerpuma", async (req, res) => {
  try {
    const { username, email, password, phone, userimg } = req.body;
    const userName = await User.findOne({ username: req.body.username });
    if (userName) {
      return res.status(401).json({
        msg: "Username already exist!",
      });
    }

    const eMail = await User.findOne({ email: req.body.email });
    if (eMail) {
      return res.status(401).json({
        msg: "Email already exist!",
      });
    }

    const phoneNumber = await User.findOne({ phone: req.body.phone });
    if (phoneNumber) {
      return res.status(401).json({
        msg: "Phone number already exist!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      userimg,
      email,
      password: hashPassword,
      phone,
      type: true,
    });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Finding User
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    // Compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    // Creating token
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET
    );
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

router.post("/loginpuma", async (req, res) => {
  try {
    // Finding User
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(404).json("User not found!");
    }

    if (user.type !== true) {
      return res.status(404).json("You are not authozied to login!");
    }

    // Compare password
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Wrong credentials!");
    }

    // Creating token
    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET
    );
    res.status(200).send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(err);
  }
});

module.exports = router;
