import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Message } from "../models/message.models.js"
import {Conversation} from "../models/conversation.models.js"
import { getReceiverSocketId,io } from "../app.js"

const sendMessage=asyncHandler(async(req,res)=>{
const {id}=req.params
const {message}=req.body
const sender=req.user._id
if (!message || message==="") {
    throw new ApiError(402,"Message cannot be empty")
}

let conversation=await Conversation.findOne({
    participants:{$all:[sender,id]},
});
if (!conversation) {
    conversation=await Conversation.create({
        participants:[sender,id],
    })
}

const sendedMessage=await Message.create({
senderId:sender,
message:message,
receiverId:id
})
if (!sendedMessage) {
    throw new ApiError(303,"Error while sending message")
}
console.log("conversation:",conversation)
await Conversation.findByIdAndUpdate(
    conversation._id,
    {
        $push:{
            messages:sendedMessage._id
        }
    }
)
const receiverSocketId=getReceiverSocketId(id)
if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage",sendedMessage)
}
return res
.status(200)
.json(
    new ApiResponse(200,sendedMessage,"Message Send Successfully")
)
})

const getMessages=asyncHandler(async(req,res)=>{
const {id}=req.params
const senderId=req.user._id
const messages=await Conversation.find({
    participants:{$all:[senderId,id]}, 
}).populate("messages")
if (!messages) {
    throw new ApiError(302,"Conversation doesn't exist")
}
return res
.status(200)
.json(
    new ApiResponse(200,messages,"Message fetched successfully")
)
})

const getUserConversation=asyncHandler(async(req,res)=>{
    const conversation=await Conversation.find({
        participants:{$all:req.user._id}
    })
    if (!conversation) {
        throw new ApiError(305,"No conversation here")
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200,conversation,"Conversation fetched successfully")
    )
})

const getMessage=asyncHandler(async(req,res)=>{
const {textId}=req.params
const text=await Message.findById(textId)
if (!text) {
    throw new ApiError(302,"No text exist")
}
return res
.status(200)
.json(
    new ApiResponse(200,text,"Text fetched successfully")
)
})
export {
    sendMessage,
    getMessages,
    getUserConversation,
    getMessage
}