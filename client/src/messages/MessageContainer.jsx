import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';
import { fetchSuccess } from '../redux/messageSlice';
import { useSocketContext } from '../context/SocketContext';
import NotificationSound from '../assests/notification.mp3'

const Container=styled.div`
flex: 3;
display: flex;
flex-direction: column;
gap: 12px;
`
const Profile=styled.div`
display: flex;
color: white;
align-items: center;
gap: 8px;
position: sticky;
`
const Avatar=styled.img`
width: 40px;
height: 40px;
border-radius: 50%;
`
const Username=styled.h4`
font-size: 20px;
`
const Icon=styled.div`
display: flex;
position: absolute;
right: 0%;
gap: 12px;
`
const Item=styled.div`
cursor: pointer;
&:active{
  color: #202020;
}
`
const Message=styled.div`
height: 78.5vh;
overflow-y: scroll;
display: flex;
flex-direction: column;
gap: 22px;
`
const Hr=styled.hr `
border: 2px solid #202020;
`;
const Last=styled.div`
display: flex;
`
const Input=styled.input`
width: 100%;
height: 45px;
border-radius: 20px;
background-color: black;
color: white;
border: solid 1px gray;
padding-left: 2%;
`
const Button=styled.button`
color: #24a0ed;
background-color: black;
border-radius: 20px;
font-size: large;
position: absolute;
right: 1%;
bottom: 2%;
border: none;
outline: none;
cursor: pointer;
&:active{
  transform: scale(1.07);
}
`
const BlueText=styled.div`
border-radius: 24px;
background-color:#24a0ed;
color: white;
height: 10vh;
width: 30vw;
padding-left:2%;
display: flex;
align-items: center;
align-self: flex-end;
`
const GreyText=styled.div`
border-radius: 24px;
background-color: gray;
color: white;
height:10vh;
width: 30vw;
padding-left:2%;
display: flex;
align-items: center;
`

const MessageContainer = () => {

  const [send,setSend]=useState(false)
  const {currentMessageUser}=useSelector(state => state.messageUser);
  const {currentMessage}=useSelector(state => state.message);
  const {currentUser}=useSelector(state => state.user);
  const [message,setMessage]=useState("")
  const {socket}=useSocketContext();
  const dispatch=useDispatch()
const [text,setText]=useState([])
  const handleChange=(e)=>{
    const value=e.target.value
    setMessage(e.target.value)
    setSend(value !== "")
  }
  const handleSend=async()=>{
    try {
      const res=await axios.post(`/api/v1/messages/send/${currentMessageUser._id}`,{message:message})
      dispatch(fetchSuccess(res.data.data.message))
      setMessage("")
    } catch (error) {
      console.log("Error sending message",error)
    }
  }

useEffect(()=>{
  socket?.on("newMessage",(newMessage)=>{
    const sound = new Audio(NotificationSound);
			sound.play();
    setText([...text,newMessage])
  })
  return ()=>socket?.off("newMessage")
},[socket,text])

  useEffect(()=>{
const fetchText=async()=>{
try {
  const res=await axios.get(`/api/v1/messages/get/${currentMessageUser._id}`)
  // console.log("messages fetched are:",res.data.data[0].messages)
  setText(res.data.data[0].messages)
} catch (error) {
  console.log("Error fetching messages and text",error)
}
}
fetchText()
  },[currentMessage,currentMessageUser._id])
  
  return (
    <Container>
<Profile>
  <Avatar src={currentMessageUser.avatar}/>
  <Username>{currentMessageUser.username}</Username>
  <Icon>
  <Item>
<CallIcon style={{width:"35px",height:"30px"}}/>
  </Item>
  <Item>
<VideocamIcon style={{width:"35px",height:"30px"}}/>
  </Item>
  <Item>
<ErrorOutlineIcon style={{width:"35px",height:"30px"}}/>
  </Item>
  </Icon>
</Profile>
<Hr/>
<Message>
{text.map((texts)=>(
texts.senderId===currentUser._id?<BlueText key={texts._id}>{texts.message}</BlueText>:<GreyText key={texts._id}>{texts.message}</GreyText>
  ))}
</Message>
<Last>
<Input placeholder='Message..' onChange={handleChange} value={message}/>
{send &&<Button onClick={handleSend}>Send</Button>}
</Last>
    </Container>
  )
}

export default MessageContainer
