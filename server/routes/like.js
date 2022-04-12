const express = require("express");
const router = express.Router();
const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const { auth } = require("../middleware/auth");

//             Likes  vs DisLikes Video
//Lay like trong 1 video
router.post("/getLikes", (req, res) => {
  Like.find({ videoId: req.body.videoId }).exec((err, likes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likes });
  });
});
//Lay dislike trong 1 video
router.post("/getDislikes", (req, res) => {
  Dislike.find({ videoId: req.body.videoId }).exec((err, dislikes) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikes });
  });
});
//Tang 1 like cho video
router.post("/upLike", (req, res) => {
  let variable = { videoId: req.body.videoId, userId: req.body.userId };

  const like = new Like(variable);
  //Luu thong tin like vao csdl
  like.save((err, likeResult) => {
    if (err) return res.json({ success: false, err });
    //Neu nut dislike da click, giam dislike di 1
    Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});
//Bo like khoi video
router.post("/unLike", (req, res) => {
  let variable = { videoId: req.body.videoId, userId: req.body.userId };

  Like.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
//Bo dislike khoi video
router.post("/unDisLike", (req, res) => {
  let variable = { videoId: req.body.videoId, userId: req.body.userId };

  Dislike.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
//Tang 1 dislike cho video
router.post("/upDisLike", (req, res) => {
  let variable = { videoId: req.body.videoId, userId: req.body.userId };

  const disLike = new Dislike(variable);
  //Luu thong tin dislike vao csdl
  disLike.save((err, dislikeResult) => {
    if (err) return res.json({ success: false, err });
    //Neu nut Like duoc click, phai giam like di 1
    Like.findOneAndDelete(variable).exec((err, likeResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

module.exports = router;
