import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const postSchema=new Schema(
{
  file:{
    type:String,
    required:true
  },
  likes:{
    type:[String],
    default:[]
  },
  comments:[
{
  type:Schema.Types.ObjectId,
  ref:"Comment"
}
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  caption:{
    type:String
  }

},{timestamps:true})

export const Post=mongoose.model("Post",postSchema)