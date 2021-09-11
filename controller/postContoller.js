const Post = require( "../models/Post" )
const catchAsync = require("../utils/catchAsync")

const insertPost = catchAsync(async(req,res,next)=>{
    const {title,content} = req.body;
    const post = Post({title,content});
    await post.save()
    res.status(201).json({status:"success",data:{_id:post._id}})
})

const getAllPosts = catchAsync(async(req,res,next)=>{
    const posts =await Post.find().select(["-__v"])
    res.status(201).json({status:"success",data:posts})
})

const updatePost = catchAsync(async(req,res,next)=>{
    const post =await Post.updateOne({_id:req.params.id},req.body)
    res.status(201).json({status:"success",data:post})
})

const deletePost = catchAsync(async(req,res,next)=>{
    const post =await Post.deleteOne({_id:req.params.id})
    res.status(201).json({status:"success",data:post})
})

module.exports = {insertPost,getAllPosts,deletePost,updatePost}