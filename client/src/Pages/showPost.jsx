import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Comment from '../components/Comment';
import { comments,fetchSuccess } from '../redux/postSlice';
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import {format} from "timeago.js"
import { likes } from '../redux/postSlice';
import { fetchNoti,notification } from '../redux/notificationSlice';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow-y: auto;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
  }
`;
const Img = styled.img`
  width: 30%;
  height: 90%;
  position: relative;
  right: 5%;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    right: 0;
    margin-bottom: 15px;
  }
`;
const Video = styled.video`
  width: 30%;
  height: 90%;
  position: relative;
  right: 5%;

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
    right: 0;
    margin-bottom: 15px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 90%;
  position: relative;
  background-color: black;
  right: 4.7%;
  gap: 15px;
  @media (max-width: 768px) {
    width: 96vw;
    height: auto;
    margin-left: 26px;
  }
`;
const Head=styled.div`
display: flex;
align-items: center;
gap: 10px;
margin-left: 2%;
`
const Close=styled.div`
position: absolute;
font-size:26px;
color: white;
top: 2%;
right: 2%;
cursor: pointer;
`
const Avatar=styled.img `
width: 45px;
height: 45px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Username=styled.h1`
  font-size: 16px;

@media (max-width: 768px) {
  font-size: 18px;
}
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 500;
  font-size: large;
  position: absolute;
  right: 1%;
  &:hover{
    color: gray;
}
&:active{
  transform: scale(1.05);
}
`;
const Hr=styled.hr`
color: #202020;
`
const Caption=styled.p`
  font-size: 14px;

@media (max-width: 768px) {
  font-size: 12px;
}
`
const Comments=styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: scroll;
  height: 60%;
  @media (max-width: 768px) {
    display: none;
  }
&::-webkit-scrollbar{
  display: none;
}
`
const Misc=styled.div`
display: flex;
flex-direction: column;
@media (max-width: 768px) {
  gap: 7px;
}
`
const Icon=styled.div`
display: flex;
gap: 15px;
margin-left: 2%;
`
const IconWrapper=styled.div`
 cursor: pointer;
  font-size: 24px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
&:hover{
  color: gray;
}
&:active{
  transform: scale(1.07);
}`
const Iconsend=styled.div`
position: absolute;
right: 3%;
cursor: pointer;
&:hover{
  color: gray;
}
&:active{
  transform: scale(1.07);
}
`
const Like=styled.div`
 display: flex;
  gap: 5px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 7px;
  }
`
const Pic=styled.img`
width: 25px;
height: 25px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Timestamp=styled.div`
`
const P=styled.p`
color: gray;
`
const Add=styled.div`
display: flex;
align-items: center;
gap: 12px;
`
const Input=styled.input`
background-color: black;
border: none;
outline: none;
color: white;
`
const Button=styled.button`
color: blue;
border: none;
outline: none;
background: none;
cursor: pointer;
position: absolute;
right: 3%;
`

function ShowPost({setOpens}) {
  const {currentPost}=useSelector(state => state.post);
  const {currentUser}=useSelector(state => state.user);
  const {currentNotificationUser}=useSelector(state => state.notification);
  const [postUser,setPostUser]=useState("")
  const [comment,setComment]=useState([])
  const [inputComment,setInputComment]=useState("")
  const [isPlaying,setIsPlaying]=useState(false)
  const dispatch=useDispatch()
 
const handleCommentPost=async()=>{
  try {
    const res=await axios.post(`/api/v1/comments/${currentPost._id}/add`,{content:inputComment})
    setInputComment("")
  dispatch(fetchSuccess(currentPost))
  console.log("lowest csore",res.data.data.notification)
    dispatch(comments(res.data.data.action._id))
    dispatch(fetchNoti(postUser))
    const id=res.data.data.notification._id
    const updatedNotification = [
      ...(currentNotificationUser?.notification || []),
      id,
      // console.log("id ius here")
    ];
    dispatch(notification(updatedNotification))
  } catch (error) {
    console.log("Error while Adding comment",error)
  }
}
  useEffect(()=>{
    const fetchOwner=async()=>{
try {
  const res=await axios.get(`/api/v1/users/${currentPost.owner}/find`)
  setPostUser(res.data.data)
  setComment(currentPost?.comments)
  const id=res.data.data.notification
      dispatch(fetchNoti(postUser))
      const updatedNotification = [
        ...(currentNotificationUser?.notification || []),
        id,
      ];
      
      dispatch(notification(updatedNotification));
    } catch (error) {
      console.log("Error while fetching post owner",error)
    }
  }
  fetchOwner()
},[currentPost,currentNotificationUser?.notification])

const handleClick=()=>{
  const video=document.getElementById("video")
  if (isPlaying) {
    video.pause()
    setIsPlaying(false)
  } else{
     video.play()
     setIsPlaying(true)
  }
}
const handleLikes=async()=>{
  try {
    const res=await axios.post(`/api/v1/users/${currentPost._id}/like`)
    dispatch(fetchSuccess(currentPost))
    dispatch(likes(currentUser._id))
  } catch (error) {
    console.log("Error while adding like",error)
  }
}


  return (
    <Container>
    <Close onClick={()=>setOpens(false)}>X</Close>
    {currentPost?.file.includes("image")?(<Img src={currentPost?.file}/>):(<Video src={currentPost?.file} id='video' onClick={handleClick}/>)}
    <Info>
        <Head>
       <Avatar src={postUser?.avatar}/>
       <Username>{postUser?.username}</Username>
       <Item>
        <MoreHorizIcon/>
       </Item>
        </Head>
        <Hr/>
        <Comments>
        <Head>
        <Avatar src={postUser?.avatar}/>
         <Username>{postUser?.username}</Username>
         <Caption>{currentPost?.caption}</Caption>
        </Head>
        {comment?.map((commentId)=>(
          <Comment key={commentId.comment} comment={commentId}/>
        ))}
        </Comments>
        <Hr/>
        <Misc>
       <Icon>
        <IconWrapper>
        <FavoriteBorderOutlinedIcon style={{width:"32px",height:"32px"}} onClick={handleLikes}/>
        </IconWrapper>
        <IconWrapper>
          <ModeCommentRoundedIcon style={{width:"32px",height:"32px"}}/>
        </IconWrapper>
        <IconWrapper>
          <SendRoundedIcon style={{width:"32px",height:"32px"}}/>
        </IconWrapper>
        <Iconsend>
          <BookmarkBorderIcon style={{width:"32px",height:"32px"}}/>
        </Iconsend>
       </Icon>
       <Like>
       <Pic src='https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg'/>
       <Pic src='https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg'/>
       <Pic src='https://i1.wp.com/godofindia.com/wp-content/uploads/2017/05/virat-kohli-4.jpg'/>
       <Username>Liked by his._highness and {currentPost?.likes?.length} others</Username>
       </Like>
       <Timestamp>
        <P>{format(currentPost?.createdAt)}</P>
       </Timestamp>
        </Misc>
        <Hr/>
        <Add>
          <EmojiEmotionsOutlinedIcon/>
          <Input placeholder='Add a Comment' onChange={(e)=>setInputComment(e.target.value)} value={inputComment}/>
       <Button onClick={handleCommentPost}>Post</Button>
        </Add>
    </Info>
    </Container>
  )
}

ShowPost.propTypes={
    setOpens:PropTypes.func
}
export default ShowPost
