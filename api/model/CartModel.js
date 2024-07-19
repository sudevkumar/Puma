const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, require: true },
    prodId: { type: String, require: true },
    title: { type: String, require: true },
    mainImg: { type: String },
    subOneImg: { type: String, require: true },
    subTwoImg: { type: String, require: true },
    subThreeImg: { type: String, require: true },
    subFourImg: { type: String, require: true },
    price: { type: String, require: true },
    discount: { type: String, require: true },
    type: { type: String, require: true },
    desc: { type: String, require: true },
    productStory: { type: String, require: true },
    countryOfOrigin: { type: String, require: true },
    style: { type: String, require: true },
    color: { type: String, require: true },
    qty: { type: String, require: true },
    size: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
