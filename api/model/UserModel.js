const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true, unique: true },
    userimg: { type: String },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: String, require: true, unique: true },
    type: { type: Boolean, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
