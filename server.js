const express = require("express");
const mongoose = require("mongoose");
var app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { mongoURI } = require("./config/keys");
const exphbs = require("express-handlebars");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
require("./config/passport")(passport);

const {
  truncate,
  formatDate,
  select,
  stripTags,
  editIcon,
  statusFunc
} = require("./helpers/hbs");
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
    console.log("in mongoose connect catch");
    console.log(err);
  });

app.engine(
  "handlebars",
  exphbs({
    helpers: {
      truncate: truncate,
      formatDate: formatDate,
      select: select,
      stripTags: stripTags,
      editIcon: editIcon,
      statusFunc: statusFunc
    },
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", auth);
app.use("/", index);
app.use("/stories", stories);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Port opened ${port}`);
});
