const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    name: { type: String, require: true },
    total: { type: String, require: true },
    address: { type: String, require: true },
    phone: { type: String, require: true },
    mail: { type: String, require: true },
    prodArray: { type: Array, require: true },
    payment: { type: String, require: true },
    card: { type: String },
    cvv: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
