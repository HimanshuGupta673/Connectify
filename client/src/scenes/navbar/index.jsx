import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  styled,
  List,
  ListItem
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { Link } from 'react-router-dom';
import UserImage from "components/UserImage";


const ListWrapper = styled(List)(({ theme }) => ({
  position:"absolute",
  backgroundColor: theme.palette.neutral.light,
  zIndex:1000,
  width:'18.59rem',
  paddingLeft:'10px',
  maxHeight:'7rem',
  overflowY:'auto',
  '&::-webkit-scrollbar': {
    width: '2px', 
  },
  '&::-webkit-scrollbar-thumb': {
    background:  theme.palette.neutral.light,
  },
}));


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(true)

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName?user.lastName:''}`;
  // navigate(`/profile/${friendId}`);
  const searchHandle = (text) => {
    setSearch(text)
    setOpen(false)
  }
  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color={theme.palette.mode === "dark" ? 'white' : 'black'}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              cursor: "pointer",
            },
          }}
        >
          Connectify
        </Typography>
        <Box>
        <FlexBetween
          backgroundColor={neutralLight}
          // borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
        >
          <InputBase value={search} onChange={(e) => searchHandle(e.target.value)} placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton>
        </FlexBetween>
        {
  search.length > 0 ? (
    <ListWrapper backgroundColor={neutralLight} hidden={open}>
      {user.friends
        .filter((user) =>
          user.firstName.toLowerCase().includes(search.toLowerCase())
        )
        .map((user) => (
          <ListItem style={{ padding: '5px 0px' }} key={user._id}>
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
              onClick={() => {
                setOpen(true);
                setTimeout(() => setSearch(''), 0); // Clear search after the navigation
              }}
            >
              <FlexBetween>
                <UserImage
                  style={{ paddingLeft: '10px' }}
                  image={user.picturePath}
                  size="30px"
                />
                <Typography
                  color={theme.palette.mode === 'dark' ? 'white' : 'black'}
                  ml={3}
                >
                  {user.firstName} {user.lastName ? user.lastName:''}
                </Typography>
              </FlexBetween>
            </Link>
          </ListItem>
        ))}
    </ListWrapper>
  ) : null
}

        </Box>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>

          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
