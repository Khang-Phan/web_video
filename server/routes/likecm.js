const express = require("express");
const router = express.Router();
const { LikeCm } = require("../models/LikeCm");
const { DislikeCm } = require("../models/DislikeCm");

const { auth } = require("../middleware/auth");

//             Likes vs DisLikes Comments
//Lay like trong 1 comment
router.post("/getLikesCm", (req, res) => {
  LikeCm.find({ commentId: req.body.commentId }).exec((err, likescm) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, likescm });
  });
});
//Lay dislike trong 1 comment

router.post("/getDislikesCm", (req, res) => {
  DislikeCm.find({ commentId: req.body.commentId }).exec((err, dislikescm) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, dislikescm });
  });
});
//Tang 1 like cho comment

router.post("/upLikeCm", (req, res) => {
  let variable = { commentId: req.body.commentId, userId: req.body.userId };

  const likecm = new LikeCm(variable);
  //Luu thong tin like vao csdl
  likecm.save((err, likecmResult) => {
    if (err) return res.json({ success: false, err });
    //Neu nut dislike da click, giam dislike di 1
    DislikeCm.findOneAndDelete(variable).exec((err, disLikecmResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});
//Bo like khoi comment
router.post("/unLikeCm", (req, res) => {
  let variable = { commentId: req.body.commentId, userId: req.body.userId };

  LikeCm.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
//Bo dislike khoi comment
router.post("/unDisLikeCm", (req, res) => {
  let variable = { commentId: req.body.commentId, userId: req.body.userId };

  DislikeCm.findOneAndDelete(variable).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});
//Tang 1 dislike cho comment

router.post("/upDisLikeCm", (req, res) => {
  let variable = { commentId: req.body.commentId, userId: req.body.userId };

  const disLikecm = new DislikeCm(variable);
  //Luu thong tin dislike vao csdl
  disLikecm.save((err, dislikecmResult) => {
    if (err) return res.json({ success: false, err });
    //Neu nut Like duoc click, phai giam like di 1
    LikeCm.findOneAndDelete(variable).exec((err, likecmResult) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

module.exports = router;
