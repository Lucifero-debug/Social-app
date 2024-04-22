import React, { useContext, useEffect, useState } from 'react'
import { Box,Slider } from '@mui/material'
import PropTypes from 'prop-types'
import { FilterContext } from '../App';



const SliderField = ( {slide} ) => {

const { label,defaultValue,field }=slide;
const [value,setValue]=useState(defaultValue)
const {customFilter,setCustomFilter}=useContext(FilterContext)

useEffect(()=>{
setCustomFilter(prevFilter=>({
  ...prevFilter,
  [field]:value
}))
},[value,field])

const handleSliderValue=(e)=>setValue(e.target.value)

  return (
   <Box>
<Box>{label}</Box>
<Slider
size='small'
valueLabelDisplay='auto'
value={value}
onChange={handleSliderValue}
max={200}
/>
   </Box>
  )
}

SliderField.propTypes={
    slide:PropTypes.object
}

export default SliderField
