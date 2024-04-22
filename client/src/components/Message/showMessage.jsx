import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MessageContainer from '../../messages/MessageContainer'
import Empty from '../../messages/Empty'

const Container=styled.div`
display: flex;
color: white;
gap: 20px;
width: 80vw;
position: absolute;
left: 18%;
`

function ShowMessage() {

  const [open,setOpen]=useState(false)

  return (
   <Container>
<Sidebar setOpen={setOpen}/>
<MessageContainer/>
   </Container>
  )
}

export default ShowMessage
