const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { Comment } = require("../models/Comment");
const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");

//dung multer xu ly avatar can truyen
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg") {
      return cb(res.status(400).end("only jpg is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage: storage }).single("image");

//Thong tin cua user da login
router.get("/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    fullname: req.user.fullname,
    phone: req.user.phone,
    role: req.user.role,
    image: req.user.image,
  });
});
//Dang ky user
router.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});
//Thuc hien xac thuc login
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found",
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_authExp", user.tokenExp);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});
//Dang xuat user = cach lam rong token
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, doc) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});
//Lay toan bo user
router.get("/getAllUsers", (req, res) => {
  User.find().exec((err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, users });
  });
});
//Chinh sua user theo id
router.put("/EditUsers/:id", (req, res) => {
  const emp = {
    email: req.body.email,
    name: req.body.name,
    phone: req.body.phone,
    fullname: req.body.fullname,
  };
  User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }).exec(
    (err, user) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, user });
    }
  );
});

//post 1 mimage lam avatar cho user
router.post("/UpdateImage/:id", upload, (req, res) => {
  const emp = {
    image: "uploads/" + req.file.filename,
  };
  User.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }).exec(
    (err, user) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, user });
    }
  );
});

//Lay 1 user theo id
router.get("/getUsers/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).exec((err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, user });
  });
});
//Xoa bo 1 user theo id
router.delete("/DeleteUser/:id", (req, res) => {
  Comment.deleteMany({ writer: req.params.id }).exec((err, comments) => {
    Video.deleteMany({ writer: req.params.id }).exec((err, videos) => {
      User.findOneAndDelete({ _id: req.params.id }).exec((err, user) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, user });
      });
    });
  });
});
// router.delete("/DeleteUser/:id", (req, res) => {
//   User.findOneAndDelete({ _id: req.params.id }).exec((err, video) => {
//     if (err) return res.status(400).send(err);
//     res.status(200).json({ success: true, video });
//   });
// });
//Tim kiem user theo ten
router.post("/listUser", (req, res) => {
  let skip = req.body.skip;
  let limit = req.body.limit;
  let keyword = req.body.searchKeyword
    ? {
        name: {
          $regex: req.body.searchKeyword,
          $options: "i",
        },
      }
    : {};

  User.find({ ...keyword })
    .skip(skip)
    .limit(limit)
    .exec((err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ users });
    });
});

module.exports = router;
