const express = require("express");
const mongoose = require("mongoose");
var app = express();
const { mongoURI } = require("./config/keys");
const port = process.env.PORT || 5000;

const auth = require("./routes/auth");

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("OK");
});

app.use("/auth", auth);
app.listen(port, () => {
  console.log(`Port opened ${port}`);
});
