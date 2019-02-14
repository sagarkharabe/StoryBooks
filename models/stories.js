const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storySchema = new mongoose.Schema({
  title: {
    type: String,
    require: String
  },
  body: {
    type: String,
    require: true
  },
  status: {
    type: String,
    require: true
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [
    {
      commentBody: {
        type: String,
        require: true
      },
      commentDate: {
        type: Date,
        default: Date.now
      },
      commentUser: {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    }
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const storyModel = mongoose.model("stories", storySchema);

module.exports = storyModel;
