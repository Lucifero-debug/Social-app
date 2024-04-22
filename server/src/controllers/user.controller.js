import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import { Post } from "../models/post.models.js"
import { Story } from "../models/story.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import { Notification } from "../models/notification.models.js"


const generateAccessAndRefreshTokens=async(userId)=>{
    try {
       const user=await User.findById(userId)
      const accessToken =user.generateAccessToken()
      const refreshToken=user.generateRefreshToken()

      user.refreshToken=refreshToken
      await user.save({validateBeforeSave : false})

      return {accessToken,refreshToken}

    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}

const registerUser= asyncHandler(async (req,res)=>{
    const {fullName,email,username,password}=req.body
    // get user details from frontend
     // validation - not empty
     // check if user already exists: username, email
     // check for images, check for avatar
     // upload them to cloudinary, avatar
     // create user object - create entry in db
     // remove password and refresh token field from response
     // check for user creation
     // return res
 if (fullName==="") {
     throw new ApiError(400,"fullName is required")
 }
 if (email==="") {
     throw new ApiError(400,"email is required")
 }
 if (username==="") {
     throw new ApiError(400,"username is required")
 }
 if (password==="") {
     throw new ApiError(400,"password is required")
 }
 
 const existedUser =await User.findOne({
     $or:[{ username },{ email }]
 })
 
 if (existedUser) {
     throw new ApiError(409,"User with email or username already exists")
 }
 console.log("Received request body:", req.body);
  console.log("Received files:", req.files);
 let avatarLocalPath= req.files.avatar[0]?.path
 // const coverImageLocalPath= req.files?.coverImage[0]?.path
 
 let coverImageLocalPath
 if (req.files&&Array.isArray(req.files.coverImage)&&req.files.coverImage.length > 0) {
     coverImageLocalPath=req.files.coverImage[0].path 
 }
 
 if (!avatarLocalPath) {
     avatarLocalPath="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?rs=1&pid=ImgDetMain"
 }
 
 const avatar=await uploadOnCloudinary(avatarLocalPath)
 const coverImage=await uploadOnCloudinary(coverImageLocalPath)
 if (!avatar) {
     throw new ApiError(400,"Avatar file is required")
 }
 console.log("Avatar is:",avatar)
 
 const user= await User.create({
     fullName,
     avatar: avatar.url,
     coverImage: coverImage?.url || "",
     email,
     password,
     username:username.toLowerCase()
 })
 
 const createdUser= await User.findById(user._id).select(
     "-password -refreshToken"
 )
 console.log(req.files)
 if (!createdUser) {
     throw new ApiError(500,"Something went wrong while registering the user")
 }
 
 return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully"),
 )
 
 })

 const loginUser=asyncHandler(async(req,res)=>{
    const {email,username,password}=req.body
    console.log("requested body:",req.body)
    if (!username && !email) {
       throw new ApiError(400,"username or email is required") 
    }
    const user= await User.findOne({
        $or: [{username},{email}]
    })
    
    if (!user) {
        throw new ApiError(404,"User does not exist")
    }
    
     const isPasswordValid = await user.isPasswordCorrect(password)
     if (!isPasswordValid) {
        throw new ApiError(401,"password incorrect")
    }
    
    const {accessToken,refreshToken} =await generateAccessAndRefreshTokens(user._id)
    
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    
    const options ={
        httpOnly:true,
        secure:true
    }
    console.log("logged in user:",loggedInUser)
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedInUser,accessToken,refreshToken
            },
            "User logged In Successfully"
        )
    )
    
})

const logoutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )
    
    const options={
        httpOnly:true,
        secure:true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged Out"))
})

const refreshAccessToken=asyncHandler(async(req,res)=>{
   const incominRefreshToken =req.cookies.refreshToken || req.body.refreshToken

if (!incominRefreshToken) {
    throw new ApiError(401,"unauthorised request")
}

try {
    const decodedToken= jwt.verify(
        incominRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    )
    
      const user= await User.findById(decodedToken?._id)
    
      if (!user) {
        throw new ApiError(401,"Invalid refresh token")
    }
    
    if (incominRefreshToken !==user?.refreshToken) {
        throw new ApiError(401,"Refresh token is expired or used")
    }
    
    const options={
        httpOnly:true,
        secure:true
    }
    
    const {accessToken,newRefreshToken}= await generateAccessAndRefreshTokens(user._id)
    
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponse(
            200,
            {accessToken,refreshToken:newRefreshToken},
            "Access token refreshed"
        )
    )
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token")
}

})

const updateUser=asyncHandler(async(req,res)=>{
})

const addLike=asyncHandler(async(req,res)=>{
    const {postId}=req.params
    console.log("user is:",req.user._id)
    const liked=await Post.findById(postId)
    if (!liked) {
        throw new ApiError(402,"Post does not exist")
    }
    console.log("liked is:",liked.owner)
    let action,response,notification
    if (liked.owner.toString()!==req.user._id.toString()) { 
        if (liked.likes.includes(req.user._id)) {
            const deleteLike=await Post.findByIdAndUpdate(
                postId,
                {
                    $pull:{
                        likes:req.user._id
                    }
                },
            {new:true}
            )
            if (!deleteLike) {
                throw new ApiError(403,"Error while removing like")
            }
            action=deleteLike
            response="Like deleted successfully"
        } else{
            const addLike=await Post.findByIdAndUpdate(
                postId,
                {
                    $push:{
                        likes:req.user._id
                    }
                },
                {new:true}
            )
            if (!addLike) {
                throw new ApiError(403,"Error while adding like")
            }
            action=addLike
            response="Like added successfully"
             notification= await Notification.create({
                  content:"Liked Your Reel",
                  sender:req.user._id,
                  receiver:liked.owner,
                  post:postId
              })
              await User.findByIdAndUpdate(
                  liked.owner,
                  {
                      $push:{
                          notification:notification._id
                      }
                  },
                  {new:true}
              )
        }
        const responseData = {
            action: action,
            message: response,
            notification: notification || null // Include notification if exists
        };
        return res
        .status(200)
        .json(
            new ApiResponse(200,responseData)
        )
    } else{
        throw new ApiError(303,"User is owner of this post")
    }
})

const toggleFollow=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    const find=await User.findById(userId)
    let response=""
    let action=""
    if (find.followers.includes(req.user._id)) {
        const unfollow=await User.findByIdAndUpdate(
            userId,
            {
                $pull:{
                    followers:req.user._id
                }
    },
    {new:true}
        )
        await User.findByIdAndUpdate(
            req.user._id,
            {
               $pull:{
                following:userId
               } 
            },{new:true}
        )
       response="User unfollowed Successfully"
       action=unfollow
       
const notification=await Notification.create({
    content:"Unfollowed You",
    receiver:userId,
    sender:req.user._id
})
await User.findByIdAndUpdate(
    userId,
    {
        $push:{
            notification:notification._id
        }
    },
    {new:true}
)

    } else{
        const follow=await User.findByIdAndUpdate(
            userId,
            {
                $push:{
                    followers:req.user._id
                },

            },
            {new:true}
        )
        await User.findByIdAndUpdate(
            req.user._id,
            {
                $push:{
                    following:userId
                }
            }
        )
        response="User followed Successfully"
        action=follow

       const notification= await Notification.create({
            content:"Started Following You",
            receiver:userId,
            sender:req.user._id
        })
        await User.findByIdAndUpdate(
            userId,
            {
                $push:{
                    notification:notification._id
                }
            },
            {new:true}
        )

    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,action,response)
    )
})

const addComment=asyncHandler(async(req,res)=>{    
})

const findUser=asyncHandler(async(req,res)=>{
    const {userId}=req.params
    const user=await User.findById(userId)
    if (!user) {
        throw new ApiError(402,"User does not exist")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,user,"Fetched User Successfully")
    )
})

const addBio=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    const bio=req.body.bio
    console.log("bio is:",bio)
    console.log("user is:",req.user)
    if (!bio || bio==="") {
        throw new ApiError(307,"Bio is required")
    }
    const addedBio=await User.findByIdAndUpdate(
        userId,
        {
            $set:{
                bio:bio
            }
        },
        {new:true}
    )
    if (!addedBio) {
        throw new ApiError(305,"Error while adding bio")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,addedBio,"Successfully added bio")
    )
})

const random= asyncHandler(async (req,res) =>{
    try {
      const user= await User.aggregate([{ $sample: {size:40} }])  
      return res
      .status(200)
      .json(
        new ApiResponse(200,user,"Random users fetched Successfully")
      )
    } catch (error) {
       throw new ApiError(403,"Cannot fetch random users") 
    }
})

const getUserForSidebar=asyncHandler(async(req,res)=>{
try {
    const loggedInUser=req.user._id
    const filteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password")
    return res
    .status(200)
    .json(
        new ApiResponse(200,filteredUser,"User fetched successfully")
    )
} catch (error) {
    throw new ApiError(304,"error fetching users")
}
})

const addStories=asyncHandler(async(req,res)=>{
    const userId=req.user._id
    let storyLocalPath=req.files.file[0].path
    if (!storyLocalPath) {
        throw new ApiError(304,"Story is required")
    }
    const storyFile=await uploadOnCloudinary(storyLocalPath)
    console.log("Story file:",storyFile)
  const story=await Story.create({
    file:storyFile.secure_url,
    owner:req.user._id
  })
  if (!story) {
    throw new ApiError(204,"Error while uploading stories")
  }
  
  await User.findByIdAndUpdate(
    userId,
    {
        $push:{
            stories:story._id
        }
    },
    {new:true}
  )
  scheduleStoryDeletion(story._id);
  return res
  .status(200)
  .json(
    new ApiResponse(200,story,"story added successfully")
  )
})

const getStories=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const story=await Story.findById(id)
    if (!story) {
        throw ApiError(402,"Story doesn't exist")
    }
    return res 
    .status(200)
    .json(
        new ApiResponse(200,story,"Story fetched successfully")
    )
})

function scheduleStoryDeletion(storyId) {
    const twentyFourHours = 24 * 60 * 60 * 1000;

    setTimeout(async () => {
        const deletedStory = await Story.findByIdAndDelete(storyId);
        console.log("Deleted story:", deletedStory);
    }, twentyFourHours);
}

const getNotification=asyncHandler(async(req,res)=>{
    const {id}=req.params

    const notification=await Notification.findById(id)
    if (!notification) {
        throw new ApiError(302,"error getting notification")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,notification,"Notification fetched successfully")
    )
})

const getUserNotification=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const allNoti=await Notification.find({
        receiver:{$all:id}
    })
    if (!allNoti) {
        throw new ApiError(305,"No Notification found")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,allNoti,"Notification fetched successfully")
    )
})

export {
        registerUser,
        loginUser,
        refreshAccessToken,
        generateAccessAndRefreshTokens,
        logoutUser,
        addLike,
        toggleFollow,
        findUser,
        addBio,
        random,
        getUserForSidebar,
        addStories,
        getStories,
        getNotification,
        getUserNotification
    }