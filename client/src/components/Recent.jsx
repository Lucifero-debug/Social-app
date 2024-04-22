import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
display: flex;
gap: 10px;
`
const Avatar=styled.img `
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
`
const Details=styled.div`
display: flex;
flex-direction: column;
gap: 8px;
`
const Username=styled.h1`
font-size: 17px;
`
const Name=styled.p``
const Button=styled.button`
background-color: black;
color: gray;
width: 20px;
font-size: 20px;
outline: none;
border: none;
position: absolute;
text-align: right;
right: 45px;
margin-left: auto;
cursor: pointer;
&:active{
    color: #202020;
}
`

function Recent() {
  return (
    <Container>
      <Avatar src='https://th.bing.com/th/id/OIP.SghRA3CHch6yJdcZASw_xgHaMR?w=194&h=321&c=7&r=0&o=5&dpr=1.3&pid=1.7'/>
      <Details>
       <Username>Iron Man</Username>
      <Name>Tony Stark <span>&nbsp; &#8226; 2.9 
      M followers</span> </Name>
      </Details>
      <Button>X</Button>
    </Container>
  )
}

export default Recent
