const fs = require("fs");

function logReqRes(filename) {
  return (req, res, next) => {
    fs.appendFile(
      filename,
      `${Date.now()}: ${req.method} ${req.path}\n`,
      (err, data) => {
        if (err) return res.end(err);
        next();
      }
    );
  };
}

module.exports = {
  logReqRes,
};
