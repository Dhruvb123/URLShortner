const mongoose = require("mongoose");

const urlSchema = mongoose.Schema(
  {
    originalURL: { type: String, require: true, unique: true },
    shortURL: { type: String, require: true, unique: true },
    visited: [],
  },
  { timestamps: true }
);

const urlModel = mongoose.model("urls", urlSchema);

module.exports = urlModel;
