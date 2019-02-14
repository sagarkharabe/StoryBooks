const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
router.route("/").get((req, res) => {
  res.render("stories/index");
});

router.route("/add").get(ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});
module.exports = router;
