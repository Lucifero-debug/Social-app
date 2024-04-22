import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Suggestion from '../components/Suggestion'
import Post from '../components/Post'
import { useSelector,useDispatch } from "react-redux";
import axios from 'axios'
import ShowPost from '../Pages/showPost';
import { useNavigate } from 'react-router-dom';
import Avatars from './Story/Avatar.jsx';
import {fetchProfile} from '../redux/profileSlice'
import { Link } from "react-router-dom";


const Container=styled.div`
background-color: black;
color: white;
display: flex;
gap: 40px;
`
const Main=styled.div`
flex: 6;
display: flex;
flex-direction: column;
gap: 40px;
width:70%;
position: relative;
`
const Suggested=styled.div`
flex: 2;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`
const Stories=styled.div`
display: flex;
gap: 20px;
width:100%;
overflow-x: auto;
scroll-behavior: smooth;
/* &::-webkit-scrollbar{
  display: none;
} */

`
const Posts=styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const Avatar=styled.img `
width: 60px;
height: 60px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Profile=styled.div`
display: flex;
gap: 10px;
position: relative;
`
const Details=styled.div`
display: flex;
flex-direction: column;
`
const Button=styled.button`
background-color: black;
color: blue;
width: 5px;
outline: none;
border: none;
position: absolute;
right: 45px;
&:hover{
  color: gray;
  cursor: pointer;
}
`
const Username=styled.h1`
font-size: 17px;
`
const Name=styled.p``



function Home() {
  const {currentUser}=useSelector(state => state.user);
  const {currentPost}=useSelector(state=>state.post)
  const [post,setPost]=useState([])
  const [suggestedUser,setSuggestedUser]=useState([])
  const [opens,setOpens]=useState(false)
  const [story,setStory]=useState(false)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  console.log

useEffect(()=>{
  const fetchPost=async()=>{
    try {
      const res=await axios.get('/api/v1/posts/random')
      setPost(res.data.data)
    } catch (error) {
      console.log("error while fetching posts",error)
    }
  }
  fetchPost()
},[currentPost])


useEffect(()=>{
const fetchUser=async()=>{
  try {
    const res=await axios.get('/api/v1/users/random')
    console.log("Suggested users:",res.data.data)
    setSuggestedUser(res.data.data)
  } catch (error) {
    console.log("Error fetching random users",error)
  }
}
fetchUser()
},[currentUser])

const handleClick=()=>{
  dispatch(fetchProfile(currentUser))
}

  return (
    <>
    <Container>
     <Main>
<Stories>
{currentUser.following.map((story)=>(
<Avatars key={story} story={story}/>
))}
</Stories>
<Posts>
{post.map((posts)=>(
  <Post key={posts._id} post={posts} setOpens={setOpens}/>
))}
</Posts>
     </Main>
     <Suggested>
     <Link to="/profile" style={{ textDecoration: "none", color: "inherit" }}>
      <Profile onClick={handleClick}>
      <Avatar src={currentUser?.avatar}/>
      <Details>
        <Username>{currentUser?.username}</Username>
        <Name>{currentUser?.fullName}</Name>
      </Details>
      <Button>Switch</Button>
      </Profile>
     </Link>
      <p>Suggested for you</p>
      {suggestedUser.map((suggested)=>(
        <Suggestion key={suggested._id} suggested={suggested}/>
      ))}
     </Suggested>
    </Container>
    {opens && <ShowPost setOpens={setOpens}/> }
    </>
  )
}

export default Home
