const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res) => {
  if (res.locals.user) console.log(res.locals.user);
  res.render("index/welcome");
});
// router.get('/welcome',(req , res)=> {
//   res.
// })
router.get("/dashboard", (req, res) => {
  res.send("dashboard");
});
module.exports = router;
