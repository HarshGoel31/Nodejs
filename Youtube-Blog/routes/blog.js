const express = require("express");
const Blog = require("../models/blog");
const multer = require("multer");
const path = require("path");
const Comment = require("../models/comment");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById({ _id: blogId }).populate("createdBy");
  const allComments = await Comment.find({ blogId }).populate("createdBy");
  console.log("all", allComments);
  return res.render("blog", { user: req.user, blog, comments: allComments });
});

router.post("/", upload.single("coverImageURL"), async (req, res) => {
  const { title, body } = req.body;

  console.log("file", req.file);
  const blog = await Blog.create({
    body,
    title,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.post("/comment/:id", async (req, res) => {
  const blogId = req.params.id;
  await Comment.create({
    content: req.body.content,
    blogId: blogId,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${blogId}`);
});

module.exports = router;
