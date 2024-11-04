// const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "Harsh123";

const setUser = (user) => {
  console.log("user", user);
  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret
  );
  // sessionIdToUserMap.set(id, user);
};

const getUser = (token) => {
  if (!token) return null;
  try {
    // Decode and verify the JWT using the secret
    return jwt.verify(token, secret);
  } catch (error) {
    // Log the error for debugging
    console.error("Token verification failed:", error.message);
    return null; // Return null if the token is invalid or malformed
  }
  // return sessionIdToUserMap.get(id);
};

module.exports = {
  setUser,
  getUser,
};
