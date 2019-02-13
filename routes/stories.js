const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.route("/").get((req, res) => {
  res.render("stories/index");
});

router.route("/add").get((req, res) => {
  res.render("stories/add");
});
module.exports = router;
