const { getUser } = require("../service/auth");

const checkForAuthentication = (req, res, next) => {
  const userUuid = req.cookies?.uuid;
  req.user = null;
  if (!userUuid) return next();
  const user = getUser(userUuid);
  if (!user) return next();
  req.user = user;
  next();
};

function restrictTo(roles) {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    console.log("role", roles, req.user);
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");

    next();
  };
}

// const restrictToLoggedInUserOnly = async (req, res, next) => {
//   const userUuid = req.cookies?.uuid;

//   if (!userUuid) return res.redirect("/login");

//   const user = getUser(userUuid);
//   if (!user) return res.redirect("/login");

//   req.user = user;
//   next();
// };

// const checkAuth = async (req, res, next) => {
//   const userUuid = req.cookies?.uuid;

//   const user = getUser(userUuid);

//   req.user = user;
//   next();
// };

module.exports = { checkForAuthentication, restrictTo };
