import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import axios from 'axios'
import VideoStory from './VideoStory'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Container=styled.div`
display: flex;
justify-content: center;
width: 100%;
height: 100%;
`
const Box=styled.div`
width: 80vw;
height: 100vh;
margin-top: 90px;
display: flex;
flex-direction: column;
@media (min-width: 640px) {
height: 100vh;
width: 40vw;
margin-top: 0px;
display: flex;
flex-direction: row;
overflow-x: hidden;
overflow-y: hidden;
align-items: center;
gap: 15px;
}
`

const Item = styled.div`
@media (min-width: 640px) {
  display: flex;

  align-items: center;
  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 500;
  font-size: large;
  color: white;
}
display: none;
  &:hover{
    background-color: gray;
}
&:active{
  transform: scale(1.05);
}
`;

const Story = () => {
  
    const {currentStory}=useSelector(state=>state.story)
    const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);
    
    useEffect(()=>{
        const fetchStory=async(story)=>{
            try {
                const res=await axios.get(`/api/v1/users/getstory/${story}`)
                console.log("shai hope",res.data.data)
} catch (error) {
    console.log("Error fetching story",error)
}
     }
     currentStory.forEach((story) => {
        fetchStory(story)
     });

     if (currentStory.length > 0) {
        fetchStory(currentStory[selectedStoryIndex]);
      }
    },[currentStory,selectedStoryIndex])


    const handleNextStory = () => {
        setSelectedStoryIndex((prevIndex) => (prevIndex + 1) % currentStory.length);
      };
    
      const handlePrevStory = () => {
        setSelectedStoryIndex((prevIndex) =>
          prevIndex === 0 ? currentStory.length - 1 : prevIndex - 1
        );
      };

  return (
    
    <Container>
    <Box>
       <Item onClick={handlePrevStory}><KeyboardArrowLeftIcon fontSize='large' color='white'/></Item>
       <VideoStory story={currentStory[selectedStoryIndex]}/>
        <Item onClick={handleNextStory}><KeyboardArrowRightIcon fontSize='large' color='white'/></Item>
     </Box>
    </Container>
  )
}

export default Story
