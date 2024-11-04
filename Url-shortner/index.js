const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDb } = require("./connection");
const { restrictTo, checkForAuthentication } = require("./middlewares/auth");
const Url = require("./models/url");

const app = express();
const PORT = 8002;

connectMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

const urlRoute = require("./routes/urls");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

// app.get("/test", async (req, res) => {
//   const allUrls = await Url.find({});
//   return res.render("home", {
//     urls: allUrls,
//   });
// });

app.use("/", staticRoute);

app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRoute);

app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId)
    return res.status(400).json({
      err: "Short id is required",
    });
  const entry = await Url.findOneAndUpdate(
    { shortId: shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry?.redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT=${PORT} !!`);
});
