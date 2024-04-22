import React from 'react'
import styled from 'styled-components'
import facebook from '../assests/facebook-messenger.png'



const Container=styled.div`
display: flex;
flex-direction: column;
flex: 3;
height: 93vh;
align-items: center;
justify-content: center;
gap: 12px;

`
const Avatar=styled.img`
width: 25%;
height: 25%;
`
const H2=styled.h2`
font-size: 24px;
`
const P=styled.p`
font-size: 17px;
color: grey;
`
const Button=styled.button`
color: white;
background-color: #24a0ed;
border-radius: 5px;
width: 130px;
height: 28px;
cursor: pointer;
&:active{
    transform: scale(1.04);
}
`

const Empty = () => {
  return (
    <Container>
    <Avatar src={facebook}/>
    <H2>Your Messages</H2>
    <P>Send private photos and messages to a friend or group</P>
    <Button>Send message</Button>
    </Container>
  )
}

export default Empty

