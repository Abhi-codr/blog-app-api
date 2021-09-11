const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

const verifyToken = (token) => {
  const isValidToken = jwt.verify(token, process.env.JWT_SECRET);
  return isValidToken;
};

module.exports = { generateToken, verifyToken };
