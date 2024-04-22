import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'
import {updateFollowing} from "../redux/userSlice"
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";
import {fetchProfile} from '../redux/profileSlice'


const Container=styled.div`
display: flex;
gap: 12px;
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
const Details=styled.div`
display: flex;
flex-direction: column;
/* gap: 15px; */
`

const Username=styled.h1`
font-size: 17px;
`
const Name=styled.p``
const Avatar=styled.img `
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
`

function Suggestion({suggested}) {
  const dispatch=useDispatch()
  const handleFollow=async(e)=>{
    e.preventDefault();
    try {
      const res=await axios.post(`/api/v1/users/${suggested._id}/follow`)
      console.log("followed user:",res)
      dispatch(updateFollowing(suggested._id))
     
    } catch (error) {
      console.log("Error while following",error)
    }
  }
  const handleClick=()=>{
    dispatch(fetchProfile(suggested))
  }
  

  return (
    <>
    <Link to="/show" style={{ textDecoration: "none", color: "inherit" }}>
    <Container onClick={handleClick}>
      <Avatar src={suggested.avatar}/>
        <Details>
          <Username>{suggested.username}</Username>
          <Name>{suggested.fullName}</Name>
        </Details>
        <Button onClick={handleFollow}>Follow</Button>
    </Container>
    </Link>
    </>
  )
}

Suggestion.propTypes={
  suggested:PropTypes.object
}

export default Suggestion
