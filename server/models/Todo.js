const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: String,
    isDone: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);