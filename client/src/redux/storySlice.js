import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentStory:null,
    loading:false,
    error:false
}

export const currentStorySlice=createSlice({
    name:'currentStory',
    initialState:{
        ...initialState,
    },
    reducers:{
        fetchStart:(state)=>{
            state.loading=true;  
           },
           fetchSuccess:(state,action)=>{
            state.loading=false;
            state.currentStory=action.payload;
           },
           fetchFailure:(state)=>{
            state.loading=false;
            state.error=true;
           },
       
    }
})

export const { fetchStart,fetchSuccess,fetchFailure }= currentStorySlice.actions

export default currentStorySlice.reducer
