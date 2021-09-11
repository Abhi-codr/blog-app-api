const express = require("express")
const { getAllPosts, insertPost, updatePost, deletePost } = require( "../controller/postContoller" )

const router = express.Router()

router.route("/").get(getAllPosts).post(insertPost)

router.route("/:id").put(updatePost).delete(deletePost)

module.exports = router