import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentMessage:[],
    loading:false,
    error:false
}

export const currentMessageSlice=createSlice({
    name:'currentMessage',
    initialState:{
        ...initialState,
    },
    reducers:{
        fetchStart:(state)=>{
            state.loading=true;  
           },
           fetchSuccess:(state,action)=>{
            state.loading=false;
            state.currentMessage.push(action.payload);
           },
           fetchFailure:(state)=>{
            state.loading=false;
            state.error=true;
           },
    }
})

export const { fetchStart,fetchSuccess,fetchFailure }= currentMessageSlice.actions

export default currentMessageSlice.reducer