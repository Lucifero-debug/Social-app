import React ,{useEffect, useState} from 'react'
import styled from 'styled-components'
import {format} from "timeago.js"
import axios from 'axios'
import PropTypes from 'prop-types'
import { useSelector} from "react-redux";

const Container=styled.div`
display: flex;
gap: 20px;
align-items: center;
cursor: pointer;
&:hover{
    background-color: #202020;
}
`
const Avatar=styled.img`
width: 60px;
height: 60px;
border-radius: 50%;
background-color: #999;
cursor: pointer;
`
const Content=styled.p`
font-size: large;
font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Span=styled.span`
color:grey;
font-size: large;
font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Image=styled.img`
width: 50px;
height: 50px;
`
const Sender=styled.h1`
font-size: x-large;
font-family: apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Button=styled.button`
background-color: #202020;
color: white;
width: 6vw;
height: 6vh;
cursor: pointer;
&:hover{
  background-color: grey;
}
`

const Components = ({notification}) => {
  const [alert,setAlert]=useState({})
  const [owner,setOwner]=useState({})
  const [post,setPost]=useState({})
  // const {currentNotification}=useSelector(state => state.notification);
  // console.log("current notification:",currentNotification)

    // useEffect(()=>{
    //     const fetchNoti=async()=>{
    // try {
    //   const res=await axios.get(`/api/v1/users/${notification}/notification`)
    //   // console.log("notification is:",res.data.data)
    //   setAlert(res?.data?.data)
    // } catch (error) {
    //   console.log("error fetching notification",error)
    // }
    //     }
    //     fetchNoti()
    //   },[notification])

      useEffect(()=>{
        const fetchowner=async()=>{
        try {
          const res=await axios.get(`/api/v1/users/${notification.sender}/find`)
          // console.log("notiication saender",res.data.data)
          setOwner(res?.data?.data)
        } catch (error) {
          console.log("error fetching owner:",error)
        }
        }
        fetchowner()
      },[notification.sender])
      useEffect(()=>{
const fetchPost=async()=>{
try {
  const res= await axios.get(`/api/v1/posts/${notification.post}/find`)
  setPost(res?.data?.data)
} catch (error) {
  console.log("error getin post",error)
}
}
fetchPost()
},[notification.post])

  return (
    <Container>
      <Avatar src={owner?.avatar}/>
      <Sender>{owner?.username}</Sender>
      <Content>{notification?.content} &nbsp;<Span>&#8226;1D</Span></Content>
     {alert?.content?.includes("Following")?(<Button>Following</Button>):( <Image src={post?.file}/>)}
    </Container>
  )
}

Components.propTypes={
  notification:PropTypes.string
}

export default Components
