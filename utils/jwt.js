const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRET);
  return token;
};

const verifyToken = (token) => {
  const isValidToken = jwt.verify(token, process.env.SECRET);
  return isValidToken;
};

module.exports = { generateToken, verifyToken };
