import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Components from './Components'
import { useSelector,useDispatch } from "react-redux";
import {fetchNoti} from '../../redux/notificationSlice'
import axios from 'axios';

const Container=styled.div`
color: white;
display: flex;
flex-direction: column;
/* justify-content: center; */
/* align-items: center; */
`
const Title=styled.h1`
font-size: 5vh;
text-align: center;
`
const Hr=styled.hr `
margin:15px 0px;
width: 100%;
border: 0.5px solid gray;
`;
const Real=styled.div`
display: flex;
flex-direction: column;
margin-top: 5%;
gap: 15px;
`




function Notification() {

  const [notification,setNotification]=useState([])
  const {currentUser}=useSelector(state => state.user);

  useEffect(()=>{
    const fetchall=async()=>{
try {
  const res=await axios.get(`/api/v1/users/${currentUser._id}/usernoti`)
  console.log("tatta is:",res.data.data)
  setNotification(res.data?.data)
} catch (error) {
  console.log("errror fetching notification",error)
}
    }
    fetchall()
  },[currentUser.notification])
  
console.log("elvish bhai",currentUser)
console.log("jertide:",notification)
 

  console.log("notification is:",notification)
  return (
    <Container>
    <Title>Notifications</Title>
    <Hr/>
    <Real>
    {notification?.map((notification)=>(
      <Components key={notification._id} notification={notification}/>
    ))}
    </Real>
    </Container>
  )
}

Notification.propTypes={
}

export default Notification
