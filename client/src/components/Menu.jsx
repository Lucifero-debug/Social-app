import React, { useState } from "react";
import styled from "styled-components";
import Instagram from "../Img/Logo.png";
import HomeIcon from "@mui/icons-material/Home";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import PropTypes from "prop-types";
import { Link,useNavigate } from "react-router-dom";
import Search from "./Search";
import { useSelector } from "react-redux";
import LoginIcon from '@mui/icons-material/Login';

const Container = styled.div`
display: none;
@media (min-width: 640px) {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: black;
  height: 100vh;
  color: white;
  font-size: 14px;
  position: sticky;
  top: 0;
}
  /* gap: 200px; */
`;
const Wrapper = styled.div`
  padding: 18px 26px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 27px;
`;
const Logo = styled.div`
  display: flex;
  gap: 11px;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 25px;
  cursor: pointer;
`;
const Img = styled.img`
  height: 30px;
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 500;
  font-size: large;
  &:hover{
    background-color: gray;
}
&:active{
  transform: scale(1.05);
}
`;
const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;
const Icons = styled.div`
  gap: 17px;
  display: flex;
  flex-direction: column;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
  margin-top: 30px;
`;

function Menu({setMore,more }) {

  // const [opens,setOpens]=useState(false)
  const navigate=useNavigate()
 
 const {currentUser}=useSelector(state => state.user);

const handleToggle=()=>{
  if (more) {
    setMore(false)
  } else{
    setMore(true)
  }
}

  return (
    <>
    { (<Container>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Logo>
            <Img src={Instagram} />
            VistaGram
          </Logo>
        </Link>
        <Icons>
          <Link to="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <Item>
              <HomeIcon />
              Home
            </Item>
          </Link>
            <Item>
              <SearchOutlinedIcon />
              Search
            </Item>
          <Link to="/explore" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
          </Link>
          <Link to="/reels" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <SmartDisplayOutlinedIcon />
            Reels
          </Item>
          </Link>
          <Link to="/message" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <MessageOutlinedIcon />
            Messages
          </Item>
          </Link>
          <Link to="/notification" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <FavoriteBorderRoundedIcon />
            Notification
          </Item>
          </Link>
          <Item onClick={()=>navigate('/upload')}>
            <AddBoxOutlinedIcon />
            Create
          </Item>
         {currentUser?(<Link to="/profile" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <Avatar src={currentUser.avatar} />
            Profile
          </Item>
          </Link>):
          <Link to="/signin" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <LoginIcon/>
            Login
          </Item>
          </Link>
          }
        </Icons>
        <Items>
          <Item>
            <AlternateEmailOutlinedIcon />
            Threads
          </Item>
          <Item onClick={handleToggle}>
            <DensityMediumOutlinedIcon />
            More
          </Item>
        </Items>
      </Wrapper>
    </Container>)}
    </>
  );
}

Menu.propTypes = {
  setOpen: PropTypes.func,
  open: PropTypes.bool,
  setMore:PropTypes.func,
  more:PropTypes.bool
};

export default Menu;
