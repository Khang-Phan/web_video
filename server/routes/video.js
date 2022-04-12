const express = require("express");
const router = express.Router();
const multer = require("multer");
var ffmpeg = require("fluent-ffmpeg");
const { Comment } = require("../models/Comment");
const { Video } = require("../models/Video");
const { Subscriber } = require("../models/Subscriber");
const { auth } = require("../middleware/auth");
//Chi dinh duong dan folder chua video, ten file, loai file la mp4
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("file");

//upload video voi duong dan va ten file
router.post("/uploadfiles", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

router.post("/thumbnail", (req, res) => {
  let thumbsFilePath = "";
  let fileDuration = "";

  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  ffmpeg(req.body.filePath)
    .on("filenames", function (filenames) {
      console.log("Will generate " + filenames.join(", "));
      thumbsFilePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      // Will take screens at 25%, 50% and 75% of the video
      count: 3,
      folder: "uploads/thumbnails",
      size: "320x240",
      // %b input basename ( filename w/o extension )
      filename: "thumbnail-%b.png",
    });
});
//Lay toan bo video
router.get("/getVideos", (req, res) => {
  Video.find()
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});
//Tao moi va luu video vao csdl
router.post("/uploadVideo", (req, res) => {
  const video = new Video(req.body);

  video.save((err, video) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
//Xem chi tiet 1 video, dong thoi tang views len 1
router.post("/getVideo", (req, res) => {
  Video.findOneAndUpdate(
    { _id: req.body.videoId },
    { $inc: { views: 1 } },
    { new: true }
  )
    .populate("writer")
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});
//Hien thi danh sach video theo tu khoa da search
router.post("/list", (req, res) => {
  let skip = req.body.skip;
  let limit = req.body.limit;
  let keyword = req.body.searchKeyword
    ? {
        title: {
          $regex: req.body.searchKeyword,
          $options: "i",
        },
      }
    : {};

  Video.find({ ...keyword })
    .populate("writer")
    .skip(skip)
    .limit(limit)
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ videos });
    });
});
//Tim toan bo nhung user da duoc dang ky, luu thanh 1 mang
router.post("/getSubscriptionVideos", (req, res) => {
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscribers) => {
    if (err) return res.status(400).send(err);

    let subscribedUser = [];

    subscribers.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });

    //Lay ra cac video cua mang user do
    Video.find({ writer: { $in: subscribedUser } })
      .populate("writer")
      .exec((err, videos) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos });
      });
  });
});
//Xoa video theo id
// router.delete("/DeleteVideo/:id", (req, res) => {
//   Video.findOneAndDelete({ _id: req.params.id })
//     .populate("writer")
//     .exec((err, video) => {
//       if (err) return res.status(400).send(err);
//       res.status(200).json({ success: true, video });
//     });
// });

router.delete("/DeleteVideo/:id", (req, res) => {
  Comment.deleteMany({ postId: req.params.id }).exec((err, comments) => {
    Video.findOneAndDelete({ _id: req.params.id }).exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
  });
});

//Chinh sua video theo id
router.put("/EditVideo/:id", (req, res) => {
  const emp = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    privacy: req.body.privacy,
  };
  Video.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }).exec(
    (err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    }
  );
});
//Lay video theo id
router.get("/getVideos/:id", (req, res) => {
  Video.findOne({ _id: req.params.id }).exec((err, video) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, video });
  });
});
//Lay toan bo video theo user
router.get("/getMyVideos/:id", (req, res) => {
  Video.find({ writer: req.params.id })
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});
//Lay video theo category
router.get("/getVideosCategory/:category", (req, res) => {
  Video.find({ category: req.params.category })
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});
//Diem so luong video theo category
router.get("/VideoNumber/:category", (req, res) => {
  Video.find({ category: req.params.category }).exec((err, video) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, videoNumber: video.length });
  });
});
//Diem tong so video
router.get("/VideoNumberAll", (req, res) => {
  Video.find().exec((err, video) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({ success: true, videoNumber: video.length });
  });
});
//Update video moi
router.post("/UpdateVideo/:id", upload, (req, res) => {
  const emp = {
    filePath: req.body.filePath,
    duration: req.body.duration,
    thumbnail: req.body.thumbnail,
  };
  Video.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }).exec(
    (err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    }
  );
});

module.exports = router;
