import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

const Div=styled.div`
@media (min-width: 640px) {
  display: none;
}
color: wheat;
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
const Logo = styled.div`
  display: flex;
  gap: 11px;
  font-weight: bold;
  font-size: 30px;
  margin-bottom: 25px;
  cursor: pointer;
  color: white;
`;
const Second=styled.div`
display: flex;
justify-self: flex-end;
gap: 20px;
color: white;
`

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


const MobileHead = () => {
  return (
    <Div>
     <Logo>
            VistaGram
          </Logo>
          <Second>
          <Link to="/notification" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <FavoriteBorderRoundedIcon fontSize='large'/>
          </Item>
          </Link>
          <Link to="/message" style={{textDecoration:"none",color:"inherit"}}>
          <Item>
            <MessageOutlinedIcon fontSize='large'/>
          </Item>
          </Link>
          </Second>
    </Div>
  )
}

export default MobileHead