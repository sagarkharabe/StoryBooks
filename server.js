const express = require("express");
const mongoose = require("mongoose");
var app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { mongoURI } = require("./config/keys");
const exphbs = require("express-handlebars");
const passport = require("passport");
const path = require("path");
require("./config/passport")(passport);

require("./models/index");
const index = require("./routes/index");
const auth = require("./routes/auth");
const stories = require("./routes/stories");
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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth);
app.use("/", index);
app.use("/stories", stories);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Port opened ${port}`);
});
