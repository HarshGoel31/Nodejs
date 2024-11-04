const path = require("path");
const express = require("express");
const { connectMongoDb } = require("./connection");

const app = express();
const PORT = 8000;

connectMongoDb("mongodb://127.0.0.1:27017/blogify");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

const userRoute = require("./routes/user");

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Server is up and running at PORT=${PORT} !!`);
});
