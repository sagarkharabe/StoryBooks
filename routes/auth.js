const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport");
require("../models/index");
const User = mongoose.model("Users");
router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }))
  .post((req, res) => {
    res.send("posted");
  });

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect dashboard.
    res.redirect("/dashboard");
  }
);

router.route("login").get((req, res) => {
  res.send("Login");
});
router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged Out");
});
router.get("/verify", (req, res) => {
  if (req.user) {
    console.log(req.user);
  } else console.log("not auth");
});

module.exports = router;
