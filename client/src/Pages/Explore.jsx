import React,{ useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector} from "react-redux";
import  axios from 'axios';
import ShowPost from './showPost';
import { fetchSuccess } from '../redux/postSlice';

const Container=styled.div`
display: grid;
grid-template-columns: 1fr 1fr 1fr;
grid-template-rows: auto auto;
`
const Img=styled.img`
width: 100%;
height: 100%;
cursor: pointer;
 &:nth-child(3n) {
    grid-row: span 2;
  }
`
const Video=styled.video`
width: 100%;
height: 100%;
cursor: pointer;
 &:nth-child(3n) {
    grid-row: span 2;
  }
`

function Explore() {

  const[post,setPost]=useState([])
  const {currentPost}=useSelector(state => state.post);
  const [opens,setOpens]=useState(false)
  const dispatch=useDispatch()

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

  

  return (
    <>
    <Container>
      {post.map((posts)=>(
        posts.file.includes("image")?(<Img key={posts._id} src={posts.file} onClick={()=>{setOpens(true);dispatch(fetchSuccess(posts))}}/>):(<Video key={posts._id} src={posts.file} onClick={()=>{setOpens(true);dispatch(fetchSuccess(posts))}}/>)
      ))} 
    </Container>
    {opens && <ShowPost setOpens={setOpens}/> }
    </>
  )
}

export default Explore
