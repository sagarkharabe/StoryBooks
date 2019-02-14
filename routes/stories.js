const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { ensureAuthenticated, ensureGuest } = require("../helpers/auth");
//require("../models/index");
const Story = mongoose.model("stories");
router
  .route("/")
  .get((req, res) => {
    Story.find({ status: "public" })
      .populate("user")
      .then(stories => {
        res.render("stories/index", {
          stories: stories
        });
      });
  })
  .post((req, res) => {
    let allowComments;
    if (req.body.allowComments) allowComments = true;
    else allowComments = false;

    const newStory = new Story({
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: allowComments,
      user: req.user.id
    });
    newStory.save().then(story => {
      res.redirect(`/stories/show/${story._id}`);
    });
  });
router.get("/show/:id", (req, res) => {
  Story.findById(req.params.id)
    .populate("user")
    .then(story => {
      res.render("stories/show", {
        story: story
      });
    });
});
router.route("/add").get(ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

module.exports = router;
