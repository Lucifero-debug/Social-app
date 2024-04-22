import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { fetchSuccess } from '../../redux/storySlice';


const Container=styled.img`
width: 60px;
height: 60px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`

const Avatars = ({story}) => {
    const [user,setUser]=useState({})
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleClick=()=>{
        navigate("/story")
        dispatch(fetchSuccess(user.stories))
        }

useEffect(()=>{
    const fetch=async()=>{
try {
    const res=await axios.get(`/api/v1/users/${story}/find`)
    setUser(res.data.data)
} catch (error) {
    console.log("error fetching story user",error)
}
    }
    fetch()
},[story])

  return (
    <Container src={user.avatar} onClick={handleClick}/>
      
  )
}

Avatars.propTypes={
    story:PropTypes.object
}

export default Avatars
