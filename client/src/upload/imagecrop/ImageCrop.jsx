import React, { useState } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import PropTypes from 'prop-types'


const ImageCrop = ({url}) => {
const [rotation,setRotation]=useState(0)
const [height,setHeight]=useState('')
const [width,setWidth]=useState('')
const [crop,setCrop]=useState(null)
const [completed,setCompletedCrop]=useState(null)

  return (
    <ReactCrop crop={crop} onChange={c => setCrop(c)} 
    onComplete={(e)=>{
        console.log("Event is:",e)
        setCompletedCrop(e)
    }}
    >
      <img src={url} style={{height:"200px",width:"180px"}} />
    </ReactCrop>
  )
}

ImageCrop.propTypes={
    url:PropTypes.string
}

export default ImageCrop
