const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.end("This is Home page !!");
});

app.get("/about", (req, res) => {
  res.end("This is About page. Hey " + `${req.query.my_name}`);
});

app.listen(8000, () => {
  console.log("Server Started !!");
});

// function myHandler(req, res) {
//   console.log("New Req Rec.");

//   if (req.url === "/favicon.ico") return res.end();

//   const log = `${Date.now()}: ${req.url} New Request Received\n`;
//   const myUrl = url.parse(req.url, true);

//   fs.appendFile("./log.txt", log, (err, data) => {
//     switch (myUrl?.pathname) {
//       case "/":
//         res.end("Hello from server !!");
//         break;
//       case "/about":
//         const qp = myUrl.query.my_name;
//         res.end(`Hi ${qp}`);
//         break;
//       default:
//         res.end("404 page not found !!");
//     }
//   });
// }

// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//   console.log("Server Started !!");
// });
