import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ModeCommentRoundedIcon from '@mui/icons-material/ModeCommentRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PropTypes from 'prop-types'
import axios from 'axios';
import { fetchSuccess, likes } from '../redux/postSlice';
import { useSelector, useDispatch } from "react-redux";
import { format } from "timeago.js";
import { fetchNoti, notification } from '../redux/notificationSlice';
import { Link } from "react-router-dom";
import { fetchProfile } from '../redux/profileSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width:85vw;

  @media (min-width: 768px) {
    padding: 20px;
  }

  @media (min-width: 1024px) {
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #999;
  flex-shrink: 0;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const Username = styled.h1`
  font-size: 17px;
  font-weight: 500;
  cursor: pointer;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;

  @media (min-width: 768px) {
    max-height: 600px;
  }
`;

const Video = styled.video`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;

  @media (min-width: 768px) {
    max-height: 600px;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 15px;
  font-size: 25px;

  @media (min-width: 768px) {
    font-size: 30px;
  }
`;

const IconWrapper = styled.div`
  cursor: pointer;
  
  &:hover {
    color: gray;
  }

  &:active {
    transform: scale(1.07);
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  width: 100%;
  border: 0.5px solid gray;
`;

const P = styled.p`
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

const Caption = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const H3 = styled.h4`
  font-size: 15px;
  font-weight: bold;
`;

const Time = styled.div`
  font-size: 12px;
  color: gray;
`;

function Post({ post, setOpens }) {
  const [postUser, setPostUser] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const { currentNotificationUser } = useSelector(state => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/api/v1/users/${post.owner}/find`);
        setPostUser(res.data.data);
      } catch (error) {
        console.log("Error while fetching user", error);
      }
    };
    fetchUser();
  }, [post]);

  const handleLikes = async () => {
    try {
      const res = await axios.post(`/api/v1/users/${post._id}/like`);
      dispatch(fetchSuccess(post));
      dispatch(likes(currentUser._id));
      const id = res.data.data.notification._id;
      dispatch(fetchNoti(postUser));
      const updatedNotification = [
        ...(currentNotificationUser?.notification || []),
        id,
      ];
      dispatch(notification(updatedNotification));
    } catch (error) {
      console.log("Error while adding like", error);
    }
  };

  const handleClick = () => {
    setOpens(true);
    dispatch(fetchSuccess(post));
  };

  const handleProfile = () => {
    dispatch(fetchProfile(postUser));
  };

  return (
    <Container>
      <Link to="/show" style={{ textDecoration: "none", color: "inherit" }}>
        <Details onClick={handleProfile}>
          <Avatar src={postUser.avatar} />
          <Username>{postUser.username}</Username>
          <Time>• {format(post?.createdAt)}</Time>
        </Details>
      </Link>
      {post.file.includes("image") ? (
        <Img src={post.file} />
      ) : (
        <Video src={post.file} controls />
      )}
      <Icons>
        <IconWrapper onClick={handleLikes}>
          <FavoriteBorderOutlinedIcon />
        </IconWrapper>
        <IconWrapper onClick={handleClick}>
          <ModeCommentRoundedIcon />
        </IconWrapper>
        <IconWrapper>
          <SendRoundedIcon />
        </IconWrapper>
      </Icons>
      <P>{post?.likes?.length} likes</P>
      <Caption>
        <H3>{postUser.username}</H3>
        <P>{post.caption}</P>
      </Caption>
      <Hr />
    </Container>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  setOpens: PropTypes.func.isRequired,
};

export default Post;
