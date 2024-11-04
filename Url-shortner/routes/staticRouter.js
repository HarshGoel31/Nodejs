const express = require("express");
const Url = require("../models/url");
const { restrictTo } = require("../middlewares/auth");

const router = express.Router();

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const user = req.user;
  const allUrls = await Url.find({});
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, res) => {
  // if (!req.user) return res.redirect("/login");
  const user = req.user;
  const allUrls = await Url.find({ createdBy: user._id });
  return res.render("home", {
    urls: allUrls,
  });
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/login", async (req, res) => {
  return res.render("login");
});

module.exports = router;
