const express = require("express");
const router = express.Router();
const passport = require("passport");

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
module.exports = router;
