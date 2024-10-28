import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import GridViewIcon from '@mui/icons-material/GridView';
import TurnedInNotOutlinedIcon from '@mui/icons-material/TurnedInNotOutlined';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import Img from './Img';
import ShowPost from '../Pages/showPost';
import Followers from '../Pages/follow/Followers';
import Following from '../Pages/follow/Following';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 0 10px;
  margin-top: 49px;
  @media (min-width: 768px) {
    margin-left: 50px;
    gap: 70px;
    overflow-y: hidden;
  }
`;

const Profiles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 70px;
  }
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #999;
  margin-top: 38px;
  
  @media (min-width: 768px) {
    width: 162px;
    height: 162px;
    margin-top: 0px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
    margin-left: 36px;
    margin-top: 25px;
  }
`;

const Username = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  color: white;
  align-items: center;

  @media (min-width: 768px) {
    gap: 15px;
    font-size: 20px;
  }
`;

const Button = styled.button`
  background-color: gray;
  color: white;
  width: 80px;
  height: 28px;
  border-radius: 5px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #202020;
  }

  @media (min-width: 768px) {
    width: 95px;
  }
`;

const Follow = styled.div`
  display: flex;
  gap: 15px;
  color: white;
  font-size: 14px;

  @media (min-width: 768px) {
    gap: 30px;
    font-size: 16px;
  }
`;

const Info = styled.div`
  color: white;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

const Highlight = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;

  @media (min-width: 768px) {
    gap: 12px;
    justify-content: flex-start;
  }
`;

const Stories = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #999;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 100px;
    height: 100px;
  }
`;

const Last = styled.div``;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #202020;
`;

const Icons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  color: white;
  
  @media (min-width: 768px) {
    gap: 25px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;

  &:active {
    color: #202020;
    border-top: solid 2px white;
  }
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (min-width: 768px) {
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Render = styled.div`
  margin-top: 20px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
`;

function Profile() {
  const { currentUser } = useSelector(state => state.user);
  const [post, setPost] = useState(false);
  const [save, setSave] = useState(false);
  const [tag, setTag] = useState(false);
  const [posts, setPosts] = useState([]);
  const [opens, setOpens] = useState(false);
  const [follower, setFollower] = useState(false);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (post) {
      setPosts(currentUser?.posts);
    }
  }, [currentUser.posts, post]);

  return (
    <>
      {follower && <Backdrop onClick={() => setFollower(false)} />}
      {following && <Backdrop onClick={() => setFollowing(false)} />}
      <Container>
        <Profiles>
          <Avatar src={currentUser?.avatar} />
          <Details>
            <Username>
              <h1>{currentUser?.username}</h1>
              <Button>Edit Profile</Button>
              <Button>View Archive</Button>
            </Username>
            <Follow>
              <h3>{currentUser?.posts.length} Posts</h3>
              <h3 onClick={() => setFollower(true)}>{currentUser?.followers.length} Followers</h3>
              <h3 onClick={() => setFollowing(true)}>{currentUser?.following.length} Following</h3>
            </Follow>
            <Info>
              <p>{currentUser?.fullName}</p>
              <p>{currentUser?.bio || ""}</p>
            </Info>
          </Details>
        </Profiles>
        <Highlight>
          {[...Array(5)].map((_, index) => (
            <Stories
              key={index}
              src='https://th.bing.com/th/id/OIP.MwndAce1_IkhNpVWlC1P3gHaER?rs=1&pid=ImgDetMain'
            />
          ))}
        </Highlight>
        <Last>
          <Line />
          <Icons>
            <Item onClick={() => { setPost(true); setSave(false); setTag(false); }}>
              <GridViewIcon /> POSTS
            </Item>
            <Item onClick={() => { setSave(true); setPost(false); setTag(false); }}>
              <TurnedInNotOutlinedIcon /> SAVED
            </Item>
            <Item onClick={() => { setTag(true); setPost(false); setSave(false); }}>
              <AssignmentIndOutlinedIcon /> TAGGED
            </Item>
          </Icons>
          <Render>
            {post && (
              <Posts>
                {posts.map(post => (
                  <Img key={post} post={post} setOpens={setOpens} />
                ))}
              </Posts>
            )}
          </Render>
        </Last>
      </Container>
      {opens && <ShowPost setOpens={setOpens} />} 
      {follower && <Followers setFollower={setFollower} />}
      {following && <Following setFollowing={setFollowing} />}
    </>
  );
}

export default Profile;
