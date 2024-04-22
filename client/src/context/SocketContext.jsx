import { createContext, useState,useEffect,useContext } from "react";
import { useSelector } from "react-redux";
import io from 'socket.io-client'

const SocketContext=createContext();

export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketContextProvider=({children})=>{
const [socket,setSocket]=useState(null)
const [onlineUser,setonlineuser]=useState([])
const {currentUser}=useSelector(state => state.user);

useEffect(()=>{
if (currentUser) {
   const socket=io('http://localhost:7000',{
    query:{
        userId:currentUser._id
       }
   })
   setSocket(socket);

   socket.on("getOnlineUsers",(users)=>{
    setonlineuser(users)
   })
   return ()=>socket.close(); 
} else{
if (socket) {
    socket.close();
    setSocket(null)
}
}
},[currentUser])

    return <SocketContext.Provider value={{socket,onlineUser}}>{children}</SocketContext.Provider>
}