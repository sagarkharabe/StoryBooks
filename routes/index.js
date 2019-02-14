const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
router.get("/", ensureGuest, (req, res) => {
  if (res.locals.user) console.log(res.locals.user);
  res.render("index/welcome");
});
router.get("/about", (req, res) => {
  res.render("index/about");
});
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("index/dashboard");
});
module.exports = router;
