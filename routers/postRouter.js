const express = require("express");
const {
  getAllPosts,
  insertPost,
  updatePost,
  deletePost,
  getPost,
} = require("../controller/postContoller");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(getAllPosts).post(protect, insertPost);

router
  .route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost)
  .get(getPost);

module.exports = router;
