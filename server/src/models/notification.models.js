import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"

const notificationSchema=new Schema(
    {
       content:{
        type:String,
        required:true
       },
       receiver:{
        type:Schema.Types.ObjectId,
        ref:"User"
       },
       sender:{
        type:Schema.Types.ObjectId,
            ref:"User"
       },
       post:{
        type:Schema.Types.ObjectId,
        ref:"Post"
       }
    },{timestamps:true})

    export const Notification=mongoose.model("Notification",notificationSchema)