import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Post } from "../models/post.models.js"
import { User } from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const publishPost=asyncHandler(async(req,res)=>{
    const {caption}=req.body
    if (caption==="") {
        caption=""
    }
    console.log("requested body:",req.body)
    console.log("requested files:",req.files)

const postLocalPath=req.files.file[0].path
if (!postLocalPath) {
    throw new ApiError(403,"Post file is required")
}
const postFile=await uploadOnCloudinary(postLocalPath)
if (!postFile) {
    throw new ApiError(402,"Error while uploading on cloudinary")
}
    const post=await Post.create({
    file:postFile.secure_url,
    owner:req.user._id,
    caption:caption
    })
    if (!Post) {
        throw new ApiError(404,"Error while posting")
    }
    console.log("post is:",post)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $push:{
                posts:post._id
            }
        }
    )
    return res
    .status(200)
    .json(
        new ApiResponse(200,post,"Successfully posted")
    )
})

const deletePost=asyncHandler(async(req,res)=>{
    const {postId}=req.body
    const Delete=await Post.findByIdAndDelete(postId)
    if (!Delete) {
        throw new ApiError(403,"Error while deleting the post")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,Delete,"Successfully Deleted post")
    )
})

const updatePost=asyncHandler(async(req,res)=>{
})

const findPost=asyncHandler(async(req,res)=>{
    const {postId}=req.params

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        throw new ApiError(400, "Invalid postId format");
    }

    const post=await Post.findById(postId)
    if (!post) {
        throw new ApiError(405,"Post does not exist")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,post,"Fetched post Successfully")
    )
})

const random= asyncHandler(async (req,res) =>{
    try {
      const post= await Post.aggregate([{ $sample: {size:40} }])  
      return res
      .status(200)
      .json(
        new ApiResponse(200,post,"Random posts fetched Successfully")
      )
    } catch (error) {
       throw new ApiError(403,"Cannot fetch random posts") 
    }
})

export{
    publishPost,
    deletePost,
    findPost,
    random
}