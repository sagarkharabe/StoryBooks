const express = require("express");
const router = express.Router();

router
  .route("/google")
  .get((req, res) => {
    res.send("Google");
  })
  .post((req, res) => {
    res.send("posted");
  });

module.exports = router;
