const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = jwt.verify(
        req.headers.authorization.split(" ")[1],
        process.env.JWT_KEY
      );
      req.id = token.id;

      next();
    } else {
      throw "Invalid auth token";
    }
    if (!token) {
      throw "Invalid token";
    }
  } catch (err) {
    res.status(400).json({ status: "failure", message: err });
  }
};

module.exports = { protect };
