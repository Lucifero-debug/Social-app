import { configureStore,combineReducers } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import postReducer from './postSlice'
import messageUserReducer from './messageUserSlice'
import messageReducer from './messageSlice'
import storyReducer from './storySlice'
import profileReducer from './profileSlice'
import notificationReducer from './notificationSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

  const rootReducer=combineReducers({user:userReducer,post:postReducer,messageUser:messageUserReducer,message:messageReducer,story:storyReducer,notification:notificationReducer,profile:profileReducer})

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store= configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(
      {
        serializableCheck:{
          ignoreActions:[],
        },
      }),
  });
  
  export const persistor=persistStore(store)