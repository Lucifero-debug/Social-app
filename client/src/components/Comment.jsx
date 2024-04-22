import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PropTypes from 'prop-types'
import axios from 'axios'


const Container=styled.div`
display: flex;
gap: 10px;
margin-left: 1%;
align-items: center;
/* position: absolute; */
/* border: solid 2px red; */
`
const Avatar=styled.img `
width: 45px;
height: 45px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const Info=styled.div`
display: flex;
flex-direction: column;
gap: 9px;
`
const Comments=styled.div`
display: flex;
gap: 10px;
`
const Misc=styled.div`
display: flex;
gap: 12px;
align-items: center;
`
const Username=styled.h1`
font-size: 17px;
`
const Content=styled.p`
font-size: 17px;
`
const Small=styled.p`
font-size: 13px;
color: gray;
cursor: pointer;
`
const Button=styled.button`
background: none;
color: gray;
border: none;
outline: none;
cursor: pointer;
`
const Item=styled.div`
display: flex;
align-self: flex-start;

cursor: pointer;
`

const Comment = (comment) => {

  const [owner,setOwner]=useState(null)
  const [comments,setComments]=useState([])

  useEffect(()=>{
    const fetchComments=async()=>{
  try {
    const res=await axios.get(`/api/v1/comments/${comment.comment}/find`)
    setComments(res.data.data)
    console.log("udta punjab",res.data.data)
  } catch (error) {
    console.log("Error while comments",error)
  }
    }
    fetchComments()
  },[comment.comment])

useEffect(()=>{
  const fetchCommentOwner=async()=>{
try {
  const res=await axios.get(`/api/v1/users/${comments.owner}/find`)
  setOwner(res.data.data)
} catch (error) {
  console.log("Error while fetching comment owner",error)
}
  }
  fetchCommentOwner()
},[comments.owner])


  return (
    <Container>
      <Avatar src={owner?.avatar}/>
      <Info>
<Comments>
<Username>{owner?.username}</Username>
<Content>{comments?.content}</Content>
</Comments>
<Misc>
<Small>1w</Small>
<Small>{comments?.likes?.length} likes</Small>
<Button>Reply</Button>
</Misc>
      </Info>
      <Item>
<FavoriteBorderOutlinedIcon/>
      </Item>
    </Container>
  )
}

Comment.propTypes={
  comment:PropTypes.object
}

export default Comment
