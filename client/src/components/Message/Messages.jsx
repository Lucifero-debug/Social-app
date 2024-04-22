import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import axios from 'axios';
import {format} from "timeago.js"
import {useDispatch} from "react-redux";
import { fetchSuccess } from '../../redux/messageUserSlice';


const Container=styled.div`
display: flex;
gap: 8px;
align-items: center;
cursor: pointer;
&:hover{
    background-color:#202020;
}
`
const Avatar=styled.img`
height: 50px;
width: 50px;
border-radius: 50%;
`
const Username=styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`
const H1=styled.h1`
font-size: 18px;
font-weight: 400;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Text=styled.h3`
color: white;
font-size: 14px;
font-weight: 400;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Span=styled.span`
color: gray;
`

const Messages = ({setOpen,convos}) => {
  const {currentUser}=useSelector(state => state.user);
  const [user,setUser]=useState("")
  const [messageUser,setMessageUser]=useState({})
  const dispatch=useDispatch()
  const [text,setText]=useState("")
  const {currentMessage}=useSelector(state => state.message);
  
  // const last=currentMessage[currentMessage.length-1]
  // console.log("shephard:",last)

 useEffect(()=>{
    setUser(convos.participants.filter(item=>item!==currentUser._id))
  },[])

  useEffect(()=>{
    const getUser=async()=>{
try {
  const res=await axios.get(`/api/v1/users/${user}/find`)
  setMessageUser(res.data.data)
} catch (error) {
  console.log("Error getting message owner:",error)
}
    }
    getUser()
  },[user])

  useEffect(()=>{
const textId=convos.messages[convos.messages.length-1]
const getText=async()=>{
try {
  const res=await axios.get(`/api/v1/messages/${textId}/text`)
  setText(res.data.data)
  console.log("bangalore:",text)
} catch (error) {
  console.log("Error getting message",error)
}
}
getText()
  },[user,currentMessage,convos])

  const handleClick=()=>{
    setOpen(true)
    dispatch(fetchSuccess(messageUser))
  }

  return (
    <Container onClick={handleClick}>
      <Avatar src={messageUser.avatar}/>
      <Username>
<H1>{messageUser.username}</H1>
<Text>{text.message}  <Span>&#8226;{format(text?.createdAt)}</Span></Text>
      </Username>
    </Container>
  )
}

Messages.propTypes={
    setOpen:PropTypes.func,
    convos:PropTypes.object
}

export default Messages
