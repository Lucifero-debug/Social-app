import React, { useState,createContext, useContext } from 'react'
import { Box,Tabs,Tab } from '@mui/material'
import {styled} from '@mui/system'
import InstaFilter from './InstaFilter'
import CustomFilter from './CustomFilter'
import {FilterContext} from "../App"

const Container=styled(Box)({
    color:'white',
    marginTop:'9%',
    position:'absolute',
    right:"15%",
    display:'flex',
    flexDirection:'column',
    gap:"5px"
})



const Filters = () => {
    const {tabFilter,setTabFilter,setFilterClass}=useContext(FilterContext)

    const handleChange=(e,newValue)=>{
        setTabFilter(newValue)
        if(newValue === 'customFilter') {
          setFilterClass('');
        }
    }
  return (
    <Container>
      <Tabs
        value={tabFilter}
        onChange={handleChange}
        textColor="white"
        indicatorColor="red"
      >
        <Tab value="instaFilter" label="Filters" />
        <Tab value="customFilter" label="Adjustment" />
      </Tabs>
      {tabFilter==='instaFilter' ? <InstaFilter/> : <CustomFilter/>}
    </Container>
  )
}

export default Filters
