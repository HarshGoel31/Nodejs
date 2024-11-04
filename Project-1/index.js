const express = require("express");
const app = express();
const fs = require("fs");
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const PORT = 8001;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/node-mongo-app-1");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at Port:${PORT}`);
});
