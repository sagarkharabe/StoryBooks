const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  googleID: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },

  firstname: String,
  lastname: String,
  image: String
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
