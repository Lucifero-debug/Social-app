import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PropTypes from 'prop-types'
import axios from 'axios';
import { fetchSuccess,likes } from '../redux/postSlice';
import { useSelector,useDispatch } from "react-redux";
import {format} from "timeago.js"
import { fetchNoti,notification } from '../redux/notificationSlice';
import { Link } from "react-router-dom";
import {fetchProfile} from '../redux/profileSlice'

const Container=styled.div`
display: flex;
flex-direction: column;
gap: 10px;
`
const Details=styled.div`
display: flex;
align-items: center;
gap: 10px;
`
const Avatar=styled.img `
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Username=styled.h1`
font-size: 17px;
font-weight:500;
cursor: pointer;
`
const Img=styled.img`
width: 80%;
height: 80%;
`
const Video=styled.video`
width: 80%;
height: 80%;
`
const Icons=styled.div`
display: flex;
gap: 15px;
`
const IconWrapper=styled.div`
cursor: pointer;
&:hover{
  color: gray;
}
&:active{
  transform: scale(1.07);
}
`
const Hr=styled.hr `
margin:15px 0px;
width: 80%;
border: 0.5px solid gray;
`;
const P=styled.p``
const Caption=styled.div`
display: flex;
gap: 6px;
`
const H3=styled.h4``
const Time=styled.div``

function Post({post,setOpens}) {

  const [postUser,setPostUser]=useState([])
  const {currentUser}=useSelector(state => state.user);
  const {currentPost}=useSelector(state => state.post);
  const {currentNotificationUser}=useSelector(state => state.notification);
  const dispatch=useDispatch()

useEffect(()=>{
const fetchUser=async()=>{
  try {
    const res=await axios.get(`/api/v1/users/${post.owner}/find`)
    setPostUser(res.data.data)

  } catch (error) {
    console.log("Error while fetching user",error)
  }
}
fetchUser()
},[post])


const handleLikes=async()=>{
  try {
    const res=await axios.post(`/api/v1/users/${post._id}/like`)
    dispatch(fetchSuccess(post))
    dispatch(likes(currentUser._id))
    console.log("neutrinos",postUser)
    const id=res.data.data.notification._id
      dispatch(fetchNoti(postUser))
      const updatedNotification = [
        ...(currentNotificationUser?.notification || []),
        id,
        // console.log("id ius here")
      ];

      dispatch(notification(updatedNotification));
    
  } catch (error) {
    console.log("Error while adding like",error)
  }
}
const handleClick=async()=>{
  setOpens(true)
  dispatch(fetchSuccess(post))
  console.log("bhavishya",currentNotificationUser)
}

const handleProfile=()=>{
  dispatch(fetchProfile(postUser))
}

  return (
    <>
    <Container>
    <Link to="/show" style={{ textDecoration: "none", color: "inherit" }}>
      <Details onClick={handleProfile}>
<Avatar src={postUser.avatar}/>
<Username>{postUser.username}</Username>
<Time>&#8226; &nbsp;{format(post?.createdAt)} </Time>
      </Details>
    </Link>
     {post.file.includes("image")?(<Img src={post.file}/>):(<Video src={post.file}/>)}
      <Icons>
      <IconWrapper onClick={handleLikes}>
     <FavoriteBorderOutlinedIcon style={{fontSize:30}}/>
      </IconWrapper>
      <IconWrapper onClick={handleClick}>
     <ModeCommentRoundedIcon style={{fontSize:30}}/>
      </IconWrapper>
      <IconWrapper>
     <SendRoundedIcon style={{fontSize:30}}/>
      </IconWrapper>
      </Icons>
      <P>{post?.likes?.length} likes</P>
      <Caption>
        <H3>{postUser.username}</H3>
        {post.caption}
      </Caption>
    <Hr/>
    </Container>
      </>
  )
}

Post.propTypes={
  post:PropTypes.object,
  setOpens:PropTypes.func
}

export default Post
