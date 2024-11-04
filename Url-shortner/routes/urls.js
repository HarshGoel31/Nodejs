const express = require("express");
const {
  handleGenerateNewShortURL,
  handleRedirectShortURL,
  handleGetAnalytics,
  handleGetAndCreateUrl,
} = require("../controllers/url");
const router = express.Router();

router.get("/", handleGetAndCreateUrl);

router.post("/", handleGenerateNewShortURL);

router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
