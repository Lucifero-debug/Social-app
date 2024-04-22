import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import axios from 'axios'

const Video=styled.video`
height: 70%;
width:100%;
`
const Image=styled.img`
height: 70%;
width:80%;
object-fit:cover;
`


const VideoStory = ({story}) => {
    const [isPlaying,setIsPlaying]=useState(false)
    const [src,setSrc]=useState('')

    const handleClick=()=>{
        const story =document.getElementById("story-video")
         if (!isPlaying) {
            story.play()
            setIsPlaying(true)
         } else{
            story.pause()
            setIsPlaying(false)
         }
    }

    useEffect(()=>{
        const fetchStory=async()=>{
            try {
                const res=await axios.get(`/api/v1/users/getstory/${story}`)
                console.log("shai hope",res.data.data)
                setSrc(res.data.data.file)
} catch (error) {
    console.log("Error fetching story",error)
}
     }
    fetchStory()
    },[story])

console.log("baatcheet",src)
  return (
    <>
    {src.includes("video")?(<Video id='story-video' src={src} autoPlay loop onClick={handleClick}/>):(<Image src={src}/>)}
    </>
  )
}
VideoStory.propTypes={
    story:PropTypes.string
}

export default VideoStory


