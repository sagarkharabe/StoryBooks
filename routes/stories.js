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
      .sort({ date: "desc" })
      .then(stories => {
        res.render("stories/index", {
          stories: stories
        });
      });
  })
  .post(ensureAuthenticated, (req, res) => {
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
    .populate("comments.commentUser")
    .then(story => {
      if (story.status == "public") {
        res.render("stories/show", {
          story: story
        });
      } else {
        if (req.user) {
          if (story.user._id == req.user.id)
            res.render("stories/show", {
              story: story
            });
          else res.redirect("/stories");
        } else res.redirect("/");
      }
    });
});

router.get("/user/:userId", (req, res) => {
  Story.find({ user: req.params.userId, status: "public" })
    .populate("user")
    .then(stories => {
      res.render("stories/index", {
        stories: stories
      });
    });
});

router.get("/my", ensureAuthenticated, (req, res) => {
  Story.find({ user: req.user.id })
    .populate("user")
    .then(stories => {
      res.render("stories/index", {
        stories: stories
      });
    });
});

router.route("/add").get(ensureAuthenticated, (req, res) => {
  res.render("stories/add");
});

router.get("/edit/:id", ensureAuthenticated, (req, res) => {
  Story.findById({ _id: req.params.id }).then(story => {
    if (story.user != req.user.id) {
      res.redirect("/stories");
    } else {
      res.render("stories/edit", {
        story: story
      });
    }
  });
});
//edit form process
router
  .route("/:id")
  .put(ensureAuthenticated, (req, res) => {
    Story.findById(req.params.id).then(story => {
      let allowComments;
      if (req.body.allowComments) allowComments = true;
      else allowComments = false;

      story.title = req.body.title;
      story.body = req.body.body;
      story.status = req.body.status;
      story.allowComments = allowComments;

      story.save().then(story => {
        res.redirect("/dashboard");
      });
    });
  })
  .delete(ensureAuthenticated, (req, res) => {
    Story.remove({ _id: req.params.id }).then(() => {
      res.redirect("/dashboard");
    });
  });

router.route("/comment/:id").post(ensureAuthenticated, (req, res) => {
  Story.findById(req.params.id).then(story => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    };

    story.comments.unshift(newComment);
    story.save();
    res.redirect(`/stories/show/${req.params.id}`);
  });
});
module.exports = router;
