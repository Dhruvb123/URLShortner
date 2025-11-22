const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  await mongoose.connect(url);
  console.log("DB Connected");
  return;
}

module.exports = { connectToMongoDB };
