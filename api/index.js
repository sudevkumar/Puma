const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Routers
const authRouter = require("./routes/auth");
const shoeRouter = require("./routes/shoe");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

const app = express();
const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

// Connect to DB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database.");
  } catch (error) {
    console.log(error);
  }
};

// Middleware
dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/shoe", shoeRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

app.listen(process.env.PORT, () => {
  connectDb();
  console.log("App is running on port" + " " + process.env.PORT);
});
