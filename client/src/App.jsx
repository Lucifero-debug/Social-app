import styled, { ThemeProvider } from "styled-components"
import './Reset.css';
import { BrowserRouter,Routes,Route, Outlet } from "react-router-dom"
import Menu from "./components/Menu"
import {useState,createContext} from 'react'
import Notification from './Pages/Notification/Notification.jsx';
import Home from "./Pages/Home";
import Explore from "./Pages/Explore"
import Profile from "./components/Profile";
import Reels from "./Pages/Reels";
import Message from "./components/Message/Message.jsx"
import Signin from "./components/Signin";
import { useSelector } from "react-redux";
import MorePage from "./Pages/MorePage.jsx";
import File from "./upload/file.jsx";
import Register from "./Pages/Register.jsx";
 import { SocketContextProvider } from "./context/SocketContext.jsx";
import Story from "./Pages/Story/Story.jsx";
import ShowProfile from "./Pages/showProfile.jsx";
import ShowMessage from "./components/Message/showMessage.jsx";

const Container=styled.div`
display: flex;
`

const Main=styled.div`
flex:5;
background-color: black;
overflow-y: auto;
`
const Wrapper=styled.div`
padding: 22px 96px;
`;

const Hr=styled.hr `
border: 0.5px solid #202020;
`;
export const FilterContext=createContext();

function App() {
  const [tabFilter,setTabFilter]=useState('')
  const [filterClass,setFilterClass]=useState("")
  const [caption,setCaption]=useState("")
  const [customFilter,setCustomFilter]=useState({
    contrast:100,
    brightness:100,
    saturate:100,
    sepia:0,
    gray:0,
    invert:0,
    blur:0,
    opacity:100
  })
  const value={
    tabFilter,
    setTabFilter,
    filterClass,
    setFilterClass,
    customFilter,
    setCustomFilter,
    caption,
    setCaption,
  }
  // const [open,setOpen]=useState(false)
  const {currentUser}=useSelector(state => state.user);
const [more,setMore]=useState(false)


  return (
    <FilterContext.Provider value={value}>
    <SocketContextProvider>

<Container>
<BrowserRouter>
{currentUser&&<Menu setMore={setMore} more={more}/>}
{more && <MorePage setMore={setMore}/>}
<Hr/>
<Main>
<Wrapper>
<Routes>
  <Route path="/" element={<Outlet/>}>
  <Route path="/" element={<Signin/>}/>
  <Route path="home" element={<Home/>}/>
  <Route path="explore" element={<Explore/>}/>
  <Route path="profile" element={<Profile/>}/>
  <Route path="reels" element={<Reels/>}/>
  <Route path="message" element={<Message/>}/>
  <Route path="signin" element={<Signin/>}/>
  <Route path="upload" element={<File/>}/>
  <Route path="register" element={<Register/>}/>
  <Route path="story" element={<Story/>}/>
  <Route path="notification" element={<Notification/>}/>
  <Route path="show" element={<ShowProfile/>}/>
  <Route path="showmessage" element={<ShowMessage/>}/>
  </Route>
</Routes>
</Wrapper>
</Main>
</BrowserRouter>
</Container>
    </SocketContextProvider>
    </FilterContext.Provider>
  )
}

export default App
