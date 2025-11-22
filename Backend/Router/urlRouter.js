const express = require("express");

const {
  createShortUrl,
  redirectShortURL,
  getAnalytics,
  getAllAnalytics,
} = require("../Controllers/urlController");

const urlRouter = express.Router();

urlRouter.route("/").post(createShortUrl);

urlRouter.route("/getAllAnalytics").get(getAllAnalytics);

urlRouter.route("/getAnalytics/:url").get(getAnalytics);

urlRouter.route("/:url").get(redirectShortURL);

module.exports = { urlRouter };
