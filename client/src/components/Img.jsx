import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import {fetchSuccess} from '../redux/postSlice.js'
import {useDispatch,useSelector} from 'react-redux'


const Container=styled.div`
cursor: pointer;
width: 200px;
  height: 200px;
  @media (min-width: 768px) {
width: 270px;
height: 320px;
  }
`
const Photo=styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 768px) {
width: 270px;
height: 320px;
  }
`
const Video=styled.video`
width: 200px;
  height: 200px;
  @media (min-width: 768px) {
width: 270px;
height: 320px;
  }
`

function Img({post,setOpens}) {
  const {currentPost}=useSelector(state => state.post);
  const dispatch=useDispatch()
const [src,setSrc]=useState()
const [posts,setPosts]=useState({})
useEffect(()=>{
const fetchPost=async()=>{
try {
    const res=await axios.get(`/api/v1/posts/${post}/find`)
    setPosts(res.data.data)
    setSrc(res.data.data.file)
  } catch (error) {
    console.log("Error while fetching post",error)
  }
}
fetchPost()
},[post,dispatch])

const handleClick=()=>{
  setOpens(true)
  dispatch(fetchSuccess(posts))
  console.log("post from img is:",currentPost)
}

  return (
    <Container onClick={handleClick}>
      {src?.includes("image")?(<Photo src={src}/>):(<Video src={src}/>)}
    </Container>
  )
}
Img.propTypes={
    post:PropTypes.string,
    setOpens:PropTypes.func
}

export default Img
