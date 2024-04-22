import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useSelector,useDispatch } from "react-redux";
import { loginStart,loginSuccess } from '../redux/userSlice';
import {useNavigate} from "react-router-dom"

const Container=styled.div`
background-color: black;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 16px;
height: 93.8vh;
`
const Wrapper=styled.div`
width: 50%;
height: 70%;
border: solid 2px #202020;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
color: white;
`
const H1=styled.h1`
font-size: 50px;
margin-top: 15%;
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`
const Form=styled.div`
display: flex;
flex-direction:column;
gap: 17px;
`
const Input=styled.input`
width:310px;
height: 30px;
border-radius: 7px;
`
const Button=styled.button`
width: 310px;
height: 30px;
border-radius: 7px;
background-color: #24a0ed;
cursor: pointer;
`

const A=styled.a`
text-decoration: none;
color: red;
align-self: center;
margin-bottom: 12px;
`
const H3=styled.h3`
align-self: center;
`
const Register=styled.div`
color: white;
width: 50%;
height: 70%;
border: solid 2px #202020;
display: flex;
justify-content: center;
padding: 16px;
`
const B=styled.a`
color: #24a0ed;
text-decoration: none;
`
const Line=styled.div`
display: flex;
align-items:center;
justify-content: center;
`
const First=styled.div`
width: 100px;
height: 0.18px;
border: solid 1px white;
`
const Second=styled.div`
border: solid 1px white;
width: 100px;
height: 0.18px;
`

function Signin() {
const [user,setUser]=useState()
const [Password,setPassword]=useState()
const { currentUser } = useSelector(state => state.user);
const dispatch=useDispatch()
const navigate=useNavigate()

const handleLogin=async()=>{
    try {
        const signUser=await axios.post("/api/v1/users/login",{username:user,password:Password})
        dispatch(loginStart())
        console.log("Signed in user:",signUser.data.data.user)
        dispatch(loginSuccess(signUser.data.data.user)) && navigate('/home')
        console.log("Current User:",currentUser)
    } catch (error) {
        console.log("Error on Signing In",error)
    }
}


  return (
    <Container>
      <Wrapper>
<H1>VistaGram</H1>
<Form>
<Input placeholder='Email,Username, Or Phone Number' onChange={(e)=>setUser(e.target.value)}/>
<Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
<Button onClick={handleLogin}>Log In</Button>
<Line>
<First></First>
<H3>OR</H3>
<Second></Second>
</Line>
<Button>Log In With Google</Button>
<A href='/#'>Forgot Password?</A>
</Form>
      </Wrapper>
<Register>
    <p>Don&apos;t have an account?</p>
    <B href='/register'>Sign Up</B>
</Register>
    </Container>
  )
}

export default Signin
