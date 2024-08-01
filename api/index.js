const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

// Connect to DB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to Database.");
  } catch (error) {
    console.error("Database connection errors:", error);
  }
};

// Middleware
app.use(express.json());
app.use(cors(corsOptions));

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
});

// Import and use routers
const authRouter = require("./routes/auth");
const shoeRouter = require("./routes/shoe");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/shoe", shoeRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDb();
  console.log(`App is running on port ${PORT}`);
});
