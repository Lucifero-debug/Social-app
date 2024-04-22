import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentMessageUser:null,
    loading:false,
    error:false
}

export const currentMessageUserSlice=createSlice({
    name:'currentMessageUser',
    initialState:{
        ...initialState,
    },
    reducers:{
        fetchStart:(state)=>{
            state.loading=true;  
           },
           fetchSuccess:(state,action)=>{
            state.loading=false;
            state.currentMessageUser=action.payload;
           },
           fetchFailure:(state)=>{
            state.loading=false;
            state.error=true;
           },
    }
})

export const { fetchStart,fetchSuccess,fetchFailure }= currentMessageUserSlice.actions

export default currentMessageUserSlice.reducer