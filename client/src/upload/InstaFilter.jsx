import React, { useContext } from 'react'
import {Box} from '@mui/system'
import {FormControl,InputLabel,Select,MenuItem} from '@mui/material'
import { filterValues } from './utils'
import { FilterContext } from '../App'


const InstaFilter = () => {
    const {filterClass,setFilterClass}=useContext(FilterContext)

    const handleChange=(e)=>setFilterClass(e.target.value)

  return (
    <Box sx={{color:"white"}}>
    <FormControl sx={{width:150,color:"white"}}>
<InputLabel sx={{color:"white"}}>Filter</InputLabel>
<Select
onChange={handleChange}
value={filterClass}
label="Filter"
sx={{color:"white"}}
>
{filterValues.map(filter=><MenuItem value={filter.class} key={filter.class}>{filter.name}</MenuItem>)}
</Select>
    </FormControl>
    </Box>
  )
}

export default InstaFilter
