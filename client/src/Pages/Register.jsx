import React,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { getStorage, ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";
import app from "../firebase"

const Container=styled.div`
display: flex;
flex-direction: column;
background-color: black;
height: 93.8vh;
align-items: center;
justify-content: center;
gap: 35px;
`
const Info=styled.div`
display: flex;
flex-direction: column;
gap: 23px;
`
const Input=styled.input`
width: 310px;
height: 30px;
`
const Button=styled.button`
width: 310px;
background-color: #24a0ed;
cursor: pointer;
height: 30px;
&:active{
    transform: scale(1.06);
}
`
const H1=styled.h1`
color: red;
font-family: "Roboto","sans-serif";
`
const Avatar=styled.div`
display: flex;
color: white;
gap: 10px;
`
const Label=styled.label`
color: white;
`
const Inputs=styled.input`
width: 100px;
`

const Register = () => {

    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    const [files,setFiles]=useState(undefined)
    const navigate=useNavigate()
    const [imgPerc,setImgPerc]=useState(0)


    const uploadFile=(file,urlType)=>{
        const storage = getStorage(app);
        const fileName=new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask=uploadBytesResumable(storageRef,file);

        uploadTask.on(
            "state_changed",
            (snapshot)=>{
                const progress=
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "avatar" && setImgPerc(Math.round(progress));
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused")
                        break;
                        case "running":
                      console.log("Upload is running");
                      break;
                    default:
                        break;
                }
            },
            (error)=>{console.log("error is:",error)},
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                    setFiles(()=>{
                        return {[urlType]:downloadUrl};
                    });
                });
            }
        );
    };

    
    const handleRegister=async(e)=>{
      e.preventDefault();
        console.log("Files is",files)
        try {
          if (files) {
            uploadFile(files, 'avatar');
          }
            const res=await axios.post('/api/v1/users/register',{email:email,fullName:name,username:userName,password:password,avatar:files?files.avatar : ''})
            console.log("Registered user:",res)
            navigate('/signin')
        } catch (error) {
          console.log("Error While registering the User",error)  
        }
    }

  return (
    <Container>
    <H1>Sign Up With Us On Vistagram</H1>
    <Info>
      <Input placeholder='Mobile Number Or Email' onChange={(e)=>setEmail(e.target.value)}/>
      <Input placeholder='Full Name' onChange={(e)=>setName(e.target.value)}/>
      <Input placeholder='Username' onChange={(e)=>setUserName(e.target.value)}/>
      <Input placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
      <Avatar>
    {imgPerc > 0 ? ("Uploading" + imgPerc + "%" ):( <Inputs type='file' accept='image/*' onChange={(e)=>setFiles(e.target.files[0])}/>)}
     <Label>Attach Your Avatar File</Label>
      </Avatar>
    </Info>
    <Button onClick={handleRegister}>Sign Up</Button>
    </Container>
  )
}

export default Register
