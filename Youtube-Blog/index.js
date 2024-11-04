const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./connection");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

const app = express();
const PORT = 8001;

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", { user: req.user, blogs: allBlogs });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT=${PORT} !!`);
});
