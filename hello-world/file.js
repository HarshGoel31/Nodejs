const { error } = require("console");
const fs = require("fs");
const os = require("os");

//write or create file
//sync
// fs.writeFileSync("./test.txt", "Hey There");

// //async
// fs.writeFile("./test.txt", "Hello World !!", (err) => {});

//read files
//sync
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log("result:", result);

//async
// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log("Error:", error);
//   } else {
//     console.log("result:", result);
//   }
// });

//append data
//sync
// fs.appendFileSync("./test.txt", new Date().getDate().toString());

// fs.copyFileSync("./test.txt", "copy.txt");

// fs.unlinkSync("./copy.txt");

const result = fs.statSync("./test.txt");
console.log("resut:", result);

console.log(os.cpus().length);
