import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Messages from './Messages';
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";
import axios from 'axios'

const Container=styled.div`
flex: 1.7;
display: flex;
position: relative;
flex-direction: column;
gap: 24px;
margin-top: 2%;
overflow-y: scroll;
width: 23vw;
height: 92vh;
`
const Username=styled.div`
display: flex;
align-items: center;
`
const H1=styled.h1`
font-size: 26px;
`
const Icon=styled.div`
position:absolute;
right: 8%;
cursor: pointer;
&:active{
  transform: scale(1.05);
}
`
const H2=styled.h2``

const Sidebar = ({setOpen}) => {
  const [convo,setConvo]=useState([])
  const {currentUser}=useSelector(state => state.user);
  const {currentMessage}=useSelector(state => state.message);

useEffect(()=>{
  const getConversation=async()=>{
    try {
      const res=await axios.get(`/api/v1/messages/get`)
      setConvo(res.data.data)
    } catch (error) {
      console.log("Error in fetching conversation:",error)
    }
  }
  getConversation()
},[currentMessage])


  return (
    <Container>
<Username>
  <H1>{currentUser.username}</H1>
  <Icon>
<BorderColorIcon/>
  </Icon>
</Username>
<H2>Messages</H2>
{convo.map((convos)=>(
  <Messages key={convos._id} setOpen={setOpen} convos={convos}/>
))}
    </Container>
  )
}

Sidebar.propTypes={
  setOpen:PropTypes.func
}

export default Sidebar
