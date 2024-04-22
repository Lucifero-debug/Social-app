import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {Comment} from "../models/comment.models.js"
import { Post } from "../models/post.models.js"
import { Notification } from "../models/notification.models.js"
import { User } from "../models/user.models.js"

const addComment=asyncHandler(async(req,res)=>{
  const {content}=req.body
  const {postId}=req.params
  if (!content || content==="") {
    throw new ApiError(305,"Content is required")
  }
  const comment=await Comment.create({
    content:content,
    owner:req.user._id,
    post:postId
  })  
  
  if (!comment) {
      throw new ApiError(302,"Error while posting comment")
    }

   const post= await Post.findByIdAndUpdate(
      postId,
      {
          $push:{
              comments:comment
          }
      },
      {new:true}
    )
 const notification=  await Notification.create({
        content:"Commented To Your Post",
        sender:req.user._id,
        receiver:post.owner,
        post:postId
    })
    await User.findByIdAndUpdate(
        post.owner,
        {
            $push:{
             notification:notification._id
            }
        },
        {new:true}
    )
    const responseData = {
        action: comment,
        message: "Com,ment added successfully",
        notification: notification || null // Include notification if exists
    };
  return res
  .status(200)
  .json(
    new ApiResponse(200,responseData)
  )
})

const likeComment=asyncHandler(async(req,res)=>{
const {commentId}=req.params
const comment=await Comment.findById(commentId)
if (!comment) {
    throw new ApiError(402,"Comment doesn't exist")
}
let action=""
let response=""
if (comment.likes.includes(req.user._id)) {
    const deleteLike=await Comment.findByIdAndUpdate(
        commentId,
        {
            $pull:{
                likes:req.user._id
            }
        },
     {new:true}
    )
    if (!deleteLike) {
        throw new ApiError(402,"Error while Deleting like from comment")
    }
    action=deleteLike
    response="Like On Comment Deleted Successfully"
} else{
    const addLike=await Comment.findByIdAndUpdate(
        commentId,
        {
            $push:{
                likes:req.user._id
            }
        },
        {new:true}
    )
    if (!addLike) {
        throw new ApiError(402,"Error while adding like on comment")
    }
    action=addLike
    response="Like On Comment Added Successfully"
}
return res
.status(200)
.json(
    new ApiResponse(200,action,response)
)
})

const getComments=asyncHandler(async(req,res)=>{

})
const find=asyncHandler(async(req,res)=>{
    const {commentId}=req.params
    const comment=await Comment.findById(commentId)
    if (!comment) {
        throw new ApiError(303,"Comment does not exist")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,comment,"requested comment fetched successfully")
    )
})

export{
addComment,
likeComment,
getComments,
find
}