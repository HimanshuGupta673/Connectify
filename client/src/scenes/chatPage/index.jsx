// import { Box,Typography,useTheme,useMediaQuery, Divider } from "@mui/material"
// import UserImage from "components/UserImage";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// const ChatPage = () =>{
//     const theme = useTheme();
//     const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//     const { userPicturePath,name,postUserId } = useParams(); 
//     const loggeduser = useSelector((state) => state.user);
//     return (
//         <Box
//             width={isNonMobileScreens ? "50%" : "93%"}
//             p="2rem"
//             m="2rem auto"
//             borderRadius="1rem"
//             backgroundColor={theme.palette.background.alt}
//         >
//             <Box display="flex" alignItems="center" pb="15px">
//                 <Box mr="2rem">
//                 <UserImage image={userPicturePath} size="35px" />
//                 </Box>
//                 <Typography fontSize="1.2rem">{name}</Typography>
//             </Box>
//             <Divider/>
//         </Box>
//     )
// }
// export default ChatPage;