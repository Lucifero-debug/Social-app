import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from "react-redux";
import GridViewIcon from '@mui/icons-material/GridView';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import Img from './Img';
import ShowPost from '../Pages/showPost';
import Followers from '../Pages/follow/Followers';
import Following from '../Pages/follow/Following';

const Container=styled.div`
margin-left: 50px;
gap: 70px;
display: flex;
flex-direction:column;
`
const Profiles=styled.div`
display: flex;
gap: 70px;
`
const Details=styled.div`
display: flex;
flex-direction: column;
margin-top: 25px;
margin-left: 36px;
gap: 30px;
`
const Avatar=styled.img `
width:162px;
height: 162px;
border-radius: 50%;
background-color: #999;
`
const Username=styled.div`
display: flex;
gap: 15px;
color: white;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 7.5px 0px;
  font-size: 12px;
  &:hover{
    /* background-color: gray; */
}
&:active{
  color: #202020;
  border-top: solid 2px white;
}
`;
const H1=styled.h1`
font-size: 20px;
cursor: pointer;
`
const Button=styled.button`
background-color: gray;
color: white;
width: 95px;
height: 28px;
border-radius: 5px;
font-weight: 500;
outline: none;
border: none;
&:hover{
  background-color: #202020;
  cursor: pointer;
}
`
const Follow=styled.div`
display: flex;
gap: 30px;
color: white;
`
const Info=styled.div`
display: flex;
flex-direction: column;
color: white;
`
const Name=styled.p``
const Bio=styled.p``
const H3=styled.h3`
cursor: pointer;
&:active{
  color: #202020;
}
`
const Highlight=styled.div`
color:white;
display: flex;
gap: 12px;
`
const Stories=styled.img`
width: 100px;
height: 100px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Last=styled.div``
const Line=styled.div`
width: 100%;
height: 0.6px;
border: solid 1px #202020;
`
const Icons=styled.div`
display: flex;
color: white;
justify-content: center;
gap: 25px;
`
const Posts=styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto auto;
gap: 10px;
`
const Render=styled.div`
margin-top: 20px;
`
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Adjust the opacity as needed */
  backdrop-filter: blur(5px); /* Adjust the blur intensity as needed */
  z-index: 999;
`;



function Profile() {
  const {currentUser}=useSelector(state => state.user);
  const [post,setPost]=useState(false)
  const [save,setSave]=useState(false)
  const [tag,setTag]=useState(false)
  const [posts,setPosts]=useState([])
  const [opens,setOpens]=useState(false)
  const [follower,setFollower]=useState(false)
  const [following,setFollowing]=useState(false)

 useEffect(()=>{
if (post) {
  setPosts(currentUser?.posts)
}
 },[currentUser.posts,post])
 
 
  return (
    <>
     {follower && <Backdrop onClick={() => setFollower(false)} />}
     {following && <Backdrop onClick={() => setFollowing(false)} />}
    <Container>
      <Profiles>
      <Avatar src={currentUser?.avatar}/>
      <Details>
   <Username>
<H1>{currentUser?.username}</H1>
<Button>Edit Profile</Button>
<Button>View Archive</Button>
   </Username>
    <Follow>
<h3>{currentUser?.posts.length} Posts</h3>
<H3 onClick={()=>setFollower(true)}>{currentUser?.followers.length} Followers</H3>
<H3 onClick={()=>setFollowing(true)}>{currentUser?.following.length} Following</H3>
    </Follow>
    <Info>
<Name>{currentUser?.fullName}</Name>
<Bio>{currentUser?.bio || ""}</Bio>
    </Info>
      </Details>
      </Profiles>
<Highlight>
<Stories src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'/>
<Stories src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'/>
<Stories src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'/>
<Stories src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'/>
<Stories src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'/>
</Highlight>
<Last>
  <Line></Line>
  <Icons>
    <Item onClick={()=>{setPost(true);setSave(false);setTag(false)}}>
      <GridViewIcon/>
      POSTS
    </Item>
    <Item onClick={()=>{setSave(true);setPost(false);setTag(false)}}>
      <TurnedInNotOutlinedIcon/>
      SAVED
    </Item>
    <Item onClick={()=>{setTag(true);setPost(false);setSave(false)}}>
<AssignmentIndOutlinedIcon/>
TAGGED
    </Item>
  </Icons>
  <Render>
  {post && <Posts>
   {posts.map(post=>(
    <Img key={post} post={post} setOpens={setOpens}/>
   ))}
  </Posts>}
  </Render>
</Last>
    </Container>
    {opens && <ShowPost setOpens={setOpens}/>}
    {follower && <Followers setFollower={setFollower}/>}
    {following && <Following setFollowing={setFollowing}/>}
    </>
  )
}

export default Profile
