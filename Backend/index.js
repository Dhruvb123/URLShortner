const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectToMongoDB } = require("./connection");
const { urlRouter } = require("./Router/urlRouter");

const app = express();
const PORT = 3000;

// DB Connection
//connectToMongoDB("mongodb://127.0.0.1:27017/urlShortner-app");
const uri = process.env.MONGO_URI;
connectToMongoDB(uri);

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/shortURL", urlRouter);

app.listen(PORT, () => console.log("App Running On Designated PORT"));
