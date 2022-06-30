const jwt = require("jsonwebtoken");

function generateToken(payload) {
  return jwt.sign(payload, "JWT_SECRET_KEY", { expiresIn: "1d" });
}

function verifyToken(token) {
  return jwt.verify(token, "JWT_SECRET_KEY");
}

module.exports = {
  generateToken,
  verifyToken,
};
