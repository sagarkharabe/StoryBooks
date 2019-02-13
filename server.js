const express = require("express");
const mongoose = require("mongoose");
var app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { mongoURI } = require("./config/keys");

const passport = require("passport");

require("./config/passport")(passport);

require("./models/index");

const auth = require("./routes/auth");
mongoose.Promise = global.Promise;
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

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use("/auth", auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Port opened ${port}`);
});