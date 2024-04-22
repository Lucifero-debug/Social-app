import React from 'react'
import styled from 'styled-components'
import SettingsIcon from '@mui/icons-material/Settings';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'
import LogoutIcon from '@mui/icons-material/Logout';


const Container=styled.div`
display: flex;
flex-direction: column;
background-color: #202020;
gap: 15px;
color: white;
height: 450px;
width: 290px;
position: absolute;
bottom: 0;
margin-left: 10px;
border-radius:15px;
padding-top: 20px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 400;
  font-size: 14px;
  padding-left: 25px;
  &:hover{
    background-color: gray;
}
&:active{
  transform: scale(1.05);
}
`;
const Hs=styled.hr`
border: solid 2px gray;
`
const Hm=styled.hr`
border: solid 0.4px grey;
`

function MorePage({setMore}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLogout=async()=>{
      try {
        await axios.post('/api/v1/users/logout')
        dispatch(logout())
        setMore(false)
        navigate('/signin')
      } catch (error) {
        console.log("Error while logging out",error)
      }
     }
  return (
    <Container>

<Item>
  <SettingsIcon/>
  Settings
</Item>
<Item>
  <BrokenImageOutlinedIcon/>
  Your activty
</Item>
<Item>
<TurnedInNotOutlinedIcon/>
Saved
</Item>
<Item>
  <DarkModeOutlinedIcon/>
  Switch appearance
</Item>
<Item>
  <AnnouncementOutlinedIcon/>
  Report a problem
</Item>
<Hs/>
<Item>
  Switch accounts
</Item>
<Hm/>
<Item onClick={handleLogout}>
<LogoutIcon/>
  Log out
</Item>

    </Container>
  )
}
MorePage.propTypes={
    setMore:PropTypes.func
}

export default MorePage
