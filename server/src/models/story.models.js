import mongoose,{Schema} from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const storySchema=new Schema(
{
  file:{
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
  }

},{timestamps:true})

export const Story=mongoose.model("Story",storySchema)