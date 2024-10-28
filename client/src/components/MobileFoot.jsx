import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import { useSelector } from 'react-redux';
import LoginIcon from '@mui/icons-material/Login';

const Div=styled.div`
@media (min-width: 640px) {
  display: none;
}
color: white;
bottom: 0;
position: fixed;
z-index: 50;
display: flex;
justify-content: space-between;
width: 100vw;
padding: 10px;
border: 2px solid black;
height: 9vh;
background-color: black;
border-radius: 10px;
`
const Item = styled.div`

  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 500;
  font-size:xx-large;
  &:hover{
    background-color: gray;
}
&:active{
  transform: scale(1.05);
}
`;
const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: #999;
`;

const MobileFoot = () => {

  const navigate=useNavigate()
  const {currentUser}=useSelector(state => state.user);
  return (
    <Div>
       <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HomeIcon fontSize='large' color='white'/>
            </Item>
          </Link>
          <Item>
              <SearchOutlinedIcon fontSize='large' />
            </Item>
            <Item onClick={()=>navigate('/upload')}>
            <AddBoxOutlinedIcon fontSize='large'/>
          </Item>
          <Link to="/reels" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <SmartDisplayOutlinedIcon fontSize='large'/>
          </Item>
          </Link>
          {currentUser?(<Link to="/profile" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <Avatar src={currentUser.avatar} />
          </Item>
          </Link>):
          <Link to="/signin" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <LoginIcon fontSize='large'/>
          </Item>
          </Link>
          }
    </Div>
  )
}

export default MobileFoot