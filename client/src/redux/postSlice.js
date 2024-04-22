import {createSlice} from '@reduxjs/toolkit'
const initialState={
    currentPost:null,
    loading:false,
    error:false
}

export const currentPostSlice=createSlice({
    name:'currentPost',
    initialState:{
        ...initialState,
    },
    reducers:{
        fetchStart:(state)=>{
            state.loading=true;  
           },
           fetchSuccess:(state,action)=>{
            state.loading=false;
            state.currentPost=action.payload;
           },
           fetchFailure:(state)=>{
            state.loading=false;
            state.error=true;
           },
           likes:(state,action)=>{
            if (!state.currentPost.likes.includes(action.payload)) {
              state.currentPost.likes.push(action.payload)
            }else{
                state.currentPost.likes= state.currentPost.likes.filter((id) => id !== action.payload);
            }
            
          },
          comments:(state,action)=>{
            state.currentPost.comments.push(action.payload)
          }
    }
})

export const { fetchStart,fetchSuccess,fetchFailure,likes,comments }= currentPostSlice.actions

export default currentPostSlice.reducer
