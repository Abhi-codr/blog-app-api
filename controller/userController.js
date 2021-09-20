const User = require("../models/user");
const {
  userRegisterationSchema,
  userLoginSchema,
} = require("../schemas/userSchema");
const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/CustomError");
const { generateToken } = require("../utils/jwt");

const loginUser = catchAsync(async (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new CustomError(400, "email or password incorrect"));
  }
  const isPasswordCorrect = await user.verifyPassword(password);
  if (!isPasswordCorrect) {
    return next(new CustomError(400, "email or password incorrect"));
  }
  const token = generateToken({ _id: user._id });
  res.status(200).json({
    status: "success",
    data: { name: user.name, _id: user._id, token },
  });
});

const registerUser = catchAsync(async (req, res, next) => {
  const { error } = userRegisterationSchema.validate(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  const userExist = await User.findOne({ email: req.body.email });
  if (userExist) {
    return new CustomError(409, "Email already registered");
  }
  const user = new User(req.body);
  await user.save();
  const token = generateToken({ _id: user._id });
  res.status(201).json({
    status: "success",
    data: { name: user.name, _id: user._id, token },
  });
});

const getUserInfo = catchAsync(async (req, res, next) => {
  const user = await User.findById(req._id).select(["name", "email"]);
  res.status(200).send({ status: "success", data: user });
});

module.exports = { loginUser, registerUser, getUserInfo };
