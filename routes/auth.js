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

router.get("/add", (req, res) => {
  const newUser = {
    googleID: 23452,
    firstName: "sagar",
    lastName: "maal",
    email: "asdfas",
    image: "sadfa"
  };
  new User(newUser).save().then(user => res.json(user));
});
module.exports = router;
