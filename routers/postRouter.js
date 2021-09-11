const express = require("express")
const { getAllPosts, insertPost, updatePost, deletePost, getPost } = require( "../controller/postContoller" )

const router = express.Router()

router.route("/").get(getAllPosts).post(insertPost)

router.route("/:id").put(updatePost).delete(deletePost).get(getPost)

module.exports = router