import * as React from "react";
import { Link } from "react-router-dom";
import companyLogo from "../../assets/Darwin_Logo_transparent.png";
import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useGlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
import axios from "axios";
import firebaseErrorCodes from "./../../helpers/firebaseErrorCodes";
import sampleData, { createSamplePrompt } from "../../test/sampleData";

export default function NavBar({ setModal }) {
  const { toastifyTheme } = useGlobalContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // profile menu handlers
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // customer handlers
  function handleLoginButton(modal) {
    if (sessionStorage.getItem("AuthToken")) {
      toast.error(
        "Already Logged In. Please Log Out and try again",
        toastifyTheme
      );
      return;
    } else {
      setModal({ modalName: modal });
      document.getElementById("modal").style.display = "block";
    }
  }
  // use this function as a way to navigate to page with dummy data upon logout
  const handleLogout = () => {
    sessionStorage.removeItem("AuthToken");
    sessionStorage.removeItem("UserID");

    toast.success("Logged Out", toastifyTheme);
  };

  const handleInputData = (inputProblem) => {
    console.log("inputPramas", inputProblem);
    axios
      .post("/records", inputProblem, {
        params: {
          userID: sessionStorage.getItem("UserID"),
        },
      })
      .then(({ data }) => {
        console.log("data", data);
        toast.success("Added Data Successfully", toastifyTheme);
      })
      .catch((error) => {
        firebaseErrorCodes(error.response.data.code, toastifyTheme);
      });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        key="Profile"
        onClick={() => console.log(`opens menu for Profile`)}
      >
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        key="Settings"
        onClick={() => console.log(`opens menu for Settings`)}
      >
        <p>Settings</p>
      </MenuItem>
      <MenuItem key="Logout" onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        key="Profile"
        onClick={() => console.log(`opens menu for Profile`)}
      >
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        key="Settings"
        onClick={() => console.log(`opens menu for Settings`)}
      >
        <p>Settings</p>
      </MenuItem>
      <MenuItem key="Logout" onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              textDecoration: "inherit",
              color: "inherit",
              display: "flex",
            }}
          >
            <img src={companyLogo} alt="logo" style={{ maxWidth: 90 }} />
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="home button"
              sx={{ mr: 2 }}
            >
              ELeet-Tracker
            </Button>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                handleInputData(createSamplePrompt());
              }}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              Submit ONE Input for USER
            </Button>{" "}
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="records button"
              sx={{ mr: 2 }}
            >
              <Link
                to="/records"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                Records
              </Link>
            </Button>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="login button"
              sx={{ mr: 2 }}
              onClick={() => {
                handleLoginButton("LOGIN");
              }}
            >
              LOGIN
            </Button>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="register button"
              sx={{ mr: 2 }}
              onClick={() => {
                handleLoginButton("REGISTER");
              }}
            >
              REGISTER
            </Button>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          {/* MOBILE SECTION BELOW */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="home button"
              sx={{ mr: 2 }}
            >
              <Link
                to="/records"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                Records
              </Link>
            </Button>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));
