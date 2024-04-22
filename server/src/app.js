import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import {Server} from 'socket.io'
import http from 'http'

const app=express()

const server=http.createServer(app)
const io=new Server(server,{
  cors:{
      origin:["http://localhost:5173"],
      methods:["GET","POST"]
  }
}) 

export const getReceiverSocketId=(receiverid)=>{
  return userSocketMap[receiverid]
}

const userSocketMap={}

io.on('connection',(socket)=>{
console.log("a user connected",socket.id)
const userId=socket.handshake.query.userId

if (userId!==undefined) {
  userSocketMap[userId]=socket.id;
}

io.emit("getOnlineUser",Object.keys(userSocketMap))

socket.on("disconnect",()=>{
  console.log("user disconnected",socket.id)
  delete userSocketMap[userId];
  io.emit("getOnlineUsers",Object.keys(userSocketMap))
})
})


app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'
import commentRouter from './routes/comment.routes.js'
import messageRouter from './routes/message.routes.js'


app.use("/api/v1/users",userRouter)
app.use("/api/v1/posts",postRouter)
app.use("/api/v1/comments",commentRouter)
app.use("/api/v1/messages",messageRouter)


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

export {app,server,io}