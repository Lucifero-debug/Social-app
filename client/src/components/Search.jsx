import React from 'react'
import styled from 'styled-components'
import Instagram from "../Img/Logo.png"
import HomeIcon from '@mui/icons-material/Home';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import PropTypes from 'prop-types'
import Recent from './Recent';


const Container=styled.div`
flex:2.7;
background-color:black;
height:100%;
width: 60%;
color:white;
font-size: 14px;
display: flex;
flex-direction: row;
position: sticky;
top: 0;
gap: 30px;
`
const AllIcons=styled.div`
padding: 18px 26px;
display: flex;
flex-direction:column;
flex-wrap:wrap;
gap:27px;
`
const Icons=styled.div`
gap:17px ;
display: flex;
flex-direction:column;
`
const Avatar=styled.img `
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`
const Items=styled.div`
display: flex;
flex-direction:column;
gap:17px;
margin-top: 30px;
`
const Item=styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0px;
font-weight: 500;
font-size: large;
/* &:hover{
    background-color: ${({theme})=>theme.soft};
} */
`
const Logo=styled.div`
display: flex;
gap: 11px;
font-weight: bold;
font-size:20px;
margin-bottom: 25px;
cursor: pointer;
`
const Img=styled.img`
height: 30px;
`
const Main=styled.div`
background-color:black;
height:100%;
width: 100%;
flex: 2;
color:white;
font-size: 14px;
position: sticky;
top: 0;
margin-top: 20px;
gap: 35px;
display: flex;
flex-direction: column;
/* animation: notiani 300ms linear;
@keyframes notiani{
  from {left:0}
  to {left:20px}
} */
`
const MainContainer = styled.div`
  flex: 2;
  overflow-y: auto;
  width: 60%;
`;
const Input=styled.input`
width: 95%;
height: 4%;
background-color: #202020;
border: none;
outline: none;
border-radius: 5px;
padding-left: 16px;
`
const Hr=styled.hr `
margin:15px 0px;
width: 100%;
border: 0.5px solid gray;
`;
const Misc=styled.div`
display: flex;
align-items: center;
`
const Button=styled.button`
background-color: black;
color: blue;
width: 15px;
outline: none;
border: none;
position: absolute;
text-align: right;
right: 45px;
margin-left: auto;
&:hover{
  color: gray;
  cursor: pointer;
}
&:active{
  color:#202020;
}
`

function Search({setOpens}) {
  return (
    <Container>
       <AllIcons>
    <Logo>
    <Img src={Instagram}/>
    </Logo>
      <Icons>
      <Item>
      <HomeIcon/>
      </Item>
      <Item onClick={()=>setOpens(false)}>
      <SearchOutlinedIcon/>
      </Item>
      <Item>
      <ExploreOutlinedIcon/>
      </Item>
      <Item>
      <SmartDisplayOutlinedIcon/>
      </Item>
      <Item>
      <MessageOutlinedIcon/>
      </Item>
      <Item>
      <FavoriteBorderRoundedIcon/>
      </Item>
      <Item>
      <AddBoxOutlinedIcon/>
      </Item>
      <Item>
      <Avatar src='https://th.bing.com/th/id/OIP.xiKNP6_-_lacXKebaj5y6wHaNK?w=187&h=333&c=7&r=0&o=5&dpr=1.3&pid=1.7'/>
      </Item>
      </Icons>
      <Items>
      <Item>
      <AlternateEmailOutlinedIcon/>
      </Item>
      <Item>
      <DensityMediumOutlinedIcon/>
      </Item>
      </Items>
    </AllIcons>
    <MainContainer>
    <Main>
<h1>Search</h1>
<Input placeholder='Search'/>
<Hr/>
<Misc>
<h1>Recent</h1>
<Button>Clear all</Button>
</Misc>
<Recent/>
<Recent/>
<Recent/>
<Recent/>
    </Main>
    </MainContainer>
    </Container>
  )
}
Search.propTypes={
  setOpens:PropTypes.func
}

export default Search
