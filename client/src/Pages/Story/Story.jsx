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
height: 93vh;
width: 25vw;
border: solid 2px red;
display: flex;
overflow-x: hidden;
overflow-y: hidden;
align-items: center;
gap: 15px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 7.5px 0px;
  font-weight: 500;
  font-size: large;
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
       <Item onClick={handlePrevStory}><KeyboardArrowLeftIcon/></Item>
       <VideoStory story={currentStory[selectedStoryIndex]}/>
        <Item onClick={handleNextStory}><KeyboardArrowRightIcon/></Item>
     </Box>
    </Container>
  )
}

export default Story
