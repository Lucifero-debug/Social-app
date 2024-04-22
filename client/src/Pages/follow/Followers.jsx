import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'


const Container=styled.div`
width: 25%;
height: 55%;
position: absolute;
top: 21%;
left: 35%;
background-color: #202020;
display: flex;
flex-direction: column;
color: white;
border: solid 2px red;
z-index: 2000;
`
const Top=styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 3%;
`
const H1=styled.h1`
font-size: x-large;
`
const Button=styled.button`
background: none;
border:none;
outline: none;
color: white;
font-size: x-large;
cursor: pointer;
position: absolute;
right:4%;
`
const Hr=styled.hr `
margin:4% 0px;
width: 100%;
border: 0.5px solid gray;
`;
const Search=styled.input`
background: none;
outline: none;
border: none;
color: white;
height: 5vh;
margin-left: 1vw;
`

const Followers = ({setFollower}) => {
  return (
    <Container>
    <Top>
        <H1>Followers</H1>
        <Button onClick={()=>setFollower(false)}>X</Button>
    </Top>
    <Hr/>
    <Search type='search' placeholder='Search' onClick={(e)=>e.preventDefault()}/>
    </Container>
  )
}

Followers.propTypes={
    setFollower:PropTypes.func
}

export default Followers
