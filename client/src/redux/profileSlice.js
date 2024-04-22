import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentProfile:null,
    loading:false,
    error:false,
}

export const currentProfileSlice = createSlice({
name:'currentProfile',
initialState,
reducers:{
    loginStart:(state)=>{
        state.loading=false;
    },
    fetchProfile:(state,action)=>{
        state.loading=true;
        state.currentProfile=action.payload
    },
    loginFailure:(state)=>{
        state.loading=false;
        state.error=true
    },
     
}
})

export const { loginStart,fetchProfile,loginFailure }= currentProfileSlice.actions

export default currentProfileSlice.reducer
