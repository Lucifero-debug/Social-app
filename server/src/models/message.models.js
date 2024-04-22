import mongoose,{Schema} from 'mongoose'
import jwt from "jsonwebtoken"

const messageSchema=new Schema({
senderId:{
type:Schema.Types.ObjectId,
ref:"User",
required:true
},
receiverId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Message=mongoose.model("Message",messageSchema)