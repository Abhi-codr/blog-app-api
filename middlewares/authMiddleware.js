const jwt = require("jsonwebtoken");
const CustomError = require("../utils/CustomError");

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
      req._id = token._id;
      next();
    } else {
      throw new CustomError(400, "Invalid Token");
    }
    if (!token) {
      throw new CustomError(400, "Invalid Token");
    }
  } catch (err) {
    res.status(400).json({ status: "failure", message: err });
  }
};

module.exports = { protect };
