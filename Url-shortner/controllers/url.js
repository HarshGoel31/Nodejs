const { nanoid } = require("nanoid");
const Url = require("../models/url");

const handleGenerateNewShortURL = async (req, res) => {
  const body = req.body;
  const allUrls = await Url.find({});
  if (!body.url)
    return res.status(400).json({
      err: "Please enter a url",
    });
  const shortId = nanoid(8);
  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", {
    id: shortId,
    // urls: allUrls,
  });
  // return res.status(200).json({
  //   id: shortId,
  // });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory?.length,
    analytics: result.visitHistory,
  });
};

const handleGetAndCreateUrl = async (req, res) => {
  const allUrls = await Url.find({});
  return res.render("home", {
    urls: allUrls,
  });
};

module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
  handleGetAndCreateUrl,
};
