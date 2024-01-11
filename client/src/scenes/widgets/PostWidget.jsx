import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import MessageIcon from '@mui/icons-material/Message';
import { Box, Divider, IconButton, Typography, useTheme, InputBase ,styled} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const loggedInUserId = user._id
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const navigate = useNavigate()

  const handleComment = async () => {
    if (comment == '') {
      return;
    }
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment: comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment('')
  }

  const handleChat = async() =>{
    // const res = await fetch(`http://localhost:3001/chat`,{
    //   method:"POST",
    //   headers:{
    //     Authorization:`Bearer ${token}`,
    //     "contect-Type": "application/json"
    //   },
    //   body:JSON.stringify({ senderId: loggedInUserId, receiverId: postUserId })
    // })
    // const resp = await res.json();
    navigate(`/profile/${userPicturePath}/${name}/${postUserId}`)      
  }

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const like = palette.primary.like;
  const neutralLight = palette.neutral.light;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };
  const CommentSection = styled(Box)(({ theme }) => ({
    maxHeight:'10rem',
    overflowY:'auto',
    '&::-webkit-scrollbar': {
      width: '2px', 
    },
    '&::-webkit-scrollbar-thumb': {
      background:  theme.palette.neutral.light,/* Set the color of the thumb */
    },
  }));
  return (
    <WidgetWrapper m="0rem 0 2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: like }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton >
              <MessageIcon onClick={handleChat} />
            </IconButton>
          </FlexBetween>


        </FlexBetween>

      </FlexBetween>
      {isComments && (
        <Box mt="0.5rem" >
          <CommentSection >
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`}>
                <Divider />
                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                  {comment}
                </Typography>
              </Box>
            ))}
          </CommentSection>
        
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Add a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
            <Box sx={{ cursor: 'pointer' }}>
              <Typography onClick={handleComment} color="#318CE7" fontWeight={500}>Post</Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
