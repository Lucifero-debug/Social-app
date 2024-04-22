import React,{ useRef,useState,useEffect} from 'react'
import { Box } from '@mui/material'
import {styled} from '@mui/system'
import WestIcon from '@mui/icons-material/West';
import Filters from './filters';
import { useContext } from 'react';
import { FilterContext } from '../App';
import "./instagram.css"
import 'react-image-crop/dist/ReactCrop.css'
import Final from './final';
import  axios from 'axios';
import { useSelector,useDispatch } from "react-redux";
import { updateUserPost } from '../redux/userSlice';


const Container=styled(Box)({
width: '100%',
height: '100%',
// position: 'absolute',
// top: '0',
// left: '0',
backgroundColor: '#202020',
display: 'flex',
flexDirection:'column',
alignItems: 'center',
justifyContent: 'center',
marginTop:'12%'
})

const StyledBox=styled(Box)({
    width:'30%',
    height:'65vh',
    background:'#ddd',
    marginBottom:'1rem',
    borderRadius:'5px',
    alignItems:'center',
    display:'flex',
    justifyContent:'center',
    cursor:'pointer'
})
const StyledImage = styled('img')(props=> ({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    filter:`contrast(${props.customFilter?.contrast}%) brightness(${props.customFilter?.brightness}%)  saturate(${props.customFilter?.saturate}%)  sepia(${props.customFilter?.sepia}%) grayscale(${props.customFilter?.gray}%)  blur(${props.customFilter?.blur}px) invert(${props.customFilter?.invert}%) opacity(${props.customFilter?.opacity}%)` ,
  }))
  const Header=styled(Box)({
    display:'flex',
    justifyContent:'center',
    gap:'100%',
    color:'white',
  })
  const Item=styled(Box)({
    display:'flex',
    cursor:'pointer'
  })
  const Button=styled('button')({
    background:'#000000a7',
    color:' #24a0ed',
    outline:'none',
    border:'none',
    cursor:'pointer'
  })
  const Main=styled('div')({
    display:'flex',
    width:'100%',
    height:"100%"
  })

const File = () => {
  const {currentUser}=useSelector(state => state.user);
    const uploadInputRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const { filterClass,customFilter,caption} =useContext(FilterContext)
    const handleChangeInput = (e) => {
        setImageFile(URL.createObjectURL(e.target.files[0]))
      }
      const [open,setOpen]=useState(false)
      const [disableClick, setDisableClick] = useState(false);
      const [final,setFinal]=useState(false)
      const [share,setShare]=useState(false)
      const [finalFilter,setFinalFilter]=useState({})
      const dispatch=useDispatch()
      
      const handleClick = () => {
        if (!disableClick) {
            uploadInputRef.current && uploadInputRef.current.click();
        }
    }
    useEffect(() => {
      if (imageFile) {
          // Disable click once image is rendered
          setDisableClick(true);
      }
  }, [imageFile]);

  
   
  
    
    useEffect(() => {
      if (imageFile) {
        setDisableClick(true);
      }
    }, [imageFile]);
  

  const renderImage = () => (
    <figure style={{ width: '100%', height: '100%' }}>
     
      <StyledImage src={imageFile} alt="" className={filterClass} customFilter={!filterClass && customFilter} finalFilter={finalFilter}/>
    </figure>
  )
  useEffect(()=>{
    const handleShare=async()=>{
      try {
         // Convert Blob URL back to a Blob object
         const response = await fetch(imageFile);
         const blob = await response.blob();
      
         // Create a new File object
         const file = new Blob([blob], { type: blob.type });
         file.name = 'filename.jpg'; // Assign a filename
      
         const formData = new FormData();
         formData.append("file", file);
      
         formData.append("caption", caption);
      
         const res = await axios.post("/api/v1/posts/publish", formData,{
          headers: {
            'Content-Type': 'multipart/form-data' // Important for sending FormData
          } 
         });
      
         console.log("Response is:", res);
         const updatedPosts = [...currentUser.posts,res.data.data._id ];
        dispatch(updateUserPost({ posts: updatedPosts }));
      } catch (error) {
        console.log("Error while posting:",error)
      }
      }
      if (share) {
        handleShare()
      }
  },[share])

  useEffect(() => {
    console.log("final filter:", finalFilter);
  }, [finalFilter]);
  

  return (
    <Main>
    <Container>
   {imageFile && <Header>
   <Item onClick={()=>{
    if(open){
      setOpen(false)
    }
    if(final){
      setFinal(false)
      setOpen(true)
    } else{
      setFinal(false)
      setOpen(false)
    }
   }}>
    <WestIcon/>
   </Item>
        <h3>{open?"Edit":"Crop"}</h3>
        {final?(<Button onClick={()=>{setShare(true)}}>Share</Button>) : (<Button onClick={()=>{
          if(open){
            setOpen(false)
            setFinal(true)
            setFinalFilter(customFilter)
          } else{
            setOpen(true)
          }
        }}>Next</Button>)}
    </Header>}
 <StyledBox onClick={handleClick}>
 {imageFile ? renderImage() : <p>Upload Image</p>}
 </StyledBox>
 <input onChange={handleChangeInput} ref={uploadInputRef} type='file' accept='image/*' hidden/>
 {/* {imageFile && <ImageCrop url={imageFile}/>} */}
    </Container>
    
   {open && <Filters/>}
   { final && <Final/>}
    </Main>
  )
}

export default File
