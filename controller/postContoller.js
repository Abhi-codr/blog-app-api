const mongoose = require("mongoose");
const Post = require("../models/post");
const { postInsertSchema, postUpdateSchema } = require("../schemas/postSchema");
const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/CustomError");

const insertPost = catchAsync(async (req, res, next) => {
  const { error } = postInsertSchema.validate(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  const { title, content, createdBy } = req.body;
  const post = Post({ title, content, createdBy });
  await post.save();
  res.status(201).json({ status: "success", data: { _id: post._id } });
});

const getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find()
    .select(["-__v"])
    .populate("createdBy", "name");
  res.status(201).json({ status: "success", data: posts });
});

const getPost = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError(400, "Invalid Id"));
  }
  const posts = await Post.findById(req.params.id)
    .select(["-__v"])
    .populate("createdBy", "name");
  res.status(201).json({ status: "success", data: posts });
});

const updatePost = catchAsync(async (req, res, next) => {
  const { error } = postUpdateSchema.validate(req.body);
  if (error) {
    return next(new CustomError(400, error.details[0].message));
  }
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError(400, "Invalid Id"));
  }
  const post = await Post.updateOne({ _id: req.params.id }, req.body);
  res.status(201).json({ status: "success", data: post });
});

const deletePost = catchAsync(async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new CustomError(400, "Invalid Id"));
  }
  const post = await Post.deleteOne({ _id: req.params.id });
  res.status(201).json({ status: "success", data: post });
});

module.exports = { insertPost, getAllPosts, deletePost, updatePost, getPost };
