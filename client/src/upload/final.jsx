import React, { useContext } from 'react'
import styled from 'styled-components'
import { FilterContext } from '../App'

const Container=styled.div`
display: flex;
flex-direction:column;
background-color: #202020;
color:white;
    margin-top:9%;
    position:absolute;
    right:18%;
    gap: 10px;
`
const Info=styled.div`
display: flex;
align-items: center;
gap: 8px;
`
const Avatar=styled.img `
width: 40px;
height: 40px;
border-radius: 50%;
background-color: #999;
flex-shrink:0;
cursor: pointer;
`
const H2=styled.h2`
font-size: 17px;
`
const Caption=styled.textarea`
background-color: #202020;
color: white;
width: 100%;
`

const Final = () => {

const {setCaption}=useContext(FilterContext)

  return (
    <Container>
      <Info>
      <Avatar src='https://th.bing.com/th/id/OIP.gxoXEHPCCI9t1spoTOlO0AHaFE?rs=1&pid=ImgDetMain'/>
      <H2>his_.highness_</H2>
      </Info>
      <Caption placeholder='Write a caption...' rows={12} onChange={(e)=>setCaption(e.target.value)}></Caption>
    </Container>
  )
}

export default Final