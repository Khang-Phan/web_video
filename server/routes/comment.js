const express = require("express");
const router = express.Router();
const { Comment } = require("../models/Comment");

const { auth } = require("../middleware/auth");

//Tao moi va luu comment
router.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body);

  comment.save((err, comment) => {
    if (err) return res.json({ success: false, err });

    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, result });
      });
  });
});
//Lay comment dua theo video
router.post("/getComments", (req, res) => {
  Comment.find({ postId: req.body.videoId })
    .populate("writer")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});

//Lay toan bo comment
router.get("/getAllComments", (req, res) => {
  Comment.find()
    .populate("writer")
    .populate("postId")
    .exec((err, comments) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comments });
    });
});
//Xoa comment theo id
router.delete("/DeleteComments/:id", (req, res) => {
  Comment.findOneAndDelete({ _id: req.params.id }).exec((err, comment) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, comment });
  });
});

//Lay comment theo id
router.get("/getComments/:id", (req, res) => {
  Comment.findOne({ _id: req.params.id }).exec((err, comment) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, comment });
  });
});
//Chinh sua comment theo id
router.put("/EditComments/:id", (req, res) => {
  const emp = {
    content: req.body.content,
  };
  Comment.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }).exec(
    (err, comment) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comment });
    }
  );
});

module.exports = router;
