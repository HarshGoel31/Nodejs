// const sessionIdToUserMap = new Map();
const JWT = require("jsonwebtoken");
const secret = "$uperMan@123";

const createTokenForUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    fullName: user.fullName,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };

  const token = JWT.sign(payload, secret);
  return token;
};

const validateToken = (token) => {
  if (!token) return null;
  try {
    // Decode and verify the JWT using the secret
    return JWT.verify(token, secret);
  } catch (error) {
    // Log the error for debugging
    console.error("Token verification failed:", error.message);
    return null; // Return null if the token is invalid or malformed
  }
  // return sessionIdToUserMap.get(id);
};

module.exports = {
  createTokenForUser,
  validateToken,
};
