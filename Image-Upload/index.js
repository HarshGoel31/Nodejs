const express = require("express");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = 8002;

// connectMongoDb("mongodb://127.0.0.1:27017/short-url");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    return cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.get("/", async (req, res) => {
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT=${PORT} !!`);
});
