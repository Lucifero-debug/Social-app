import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"

const commentSchema=new Schema(
    {
        content:{
            type:String,
            required:true
        },
        likes:{
            type:[String],
            default:[]
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        post:{
            type:Schema.Types.ObjectId,
            ref:"Post"
        },
    },{timestamps:true})

    export const Comment=mongoose.model("Comment",commentSchema)