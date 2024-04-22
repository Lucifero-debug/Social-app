import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentNotificationUser:null,
    loading:false,
    error:false
}

export const currentNotificationSlice=createSlice({
    name:'currentNotificationUser',
    initialState:{
        ...initialState,
    },
    reducers:{
        fetchStart:(state)=>{
            state.loading=true;  
           },
           fetchNoti:(state,action)=>{
            state.loading=false;
            state.currentNotificationUser=action.payload;
           },
           fetchFailure:(state)=>{
            state.loading=false;
            state.error=true;
           },
           notification:(state,action)=>{
            state.currentNotificationUser.notification=action.payload
           }
    },
})

export const { fetchStart,fetchNoti,fetchFailure,notification }= currentNotificationSlice.actions

export default currentNotificationSlice.reducer