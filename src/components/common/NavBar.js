import * as React from "react";
import { Link } from "react-router-dom";
import companyLogo from "./../../assets/Darwin_Logo_transparent.png";
import badgeLow from "./../../assets/badge_low.png";
import badgeMed from "./../../assets/badge_med.png";
import badgeHigh from "./../../assets/badge_high.png";
import badgeNew from "./../../assets/badge_new.png";

import {
  Button,
  IconButton,
  MenuItem,
  Menu,
  AppBar,
  Box,
  Toolbar,
  Tooltip,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import useGlobalContext from "../../context/GlobalContext";
import { toast } from "react-toastify";
import grindStreak from "./../../helpers/grindStreak";

export default function NavBar({ setModal }) {
  const {
    toastifyTheme,
    problemDatesArray,
    setUserLoggedIn,
    userLoggedIn,
    aboutToggle,
    setAboutToggle,
  } = useGlobalContext();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [grindCount, setGrindCount] = React.useState(0);
  const [badge, setBadge] = React.useState({
    icon: badgeNew,
    text: "Welcome newComer. Get two 3-day streaks to earn a new badge",
    color: "white",
  });

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
    setUserLoggedIn(false);
    toast.success("Logged Out", toastifyTheme);
  };

  // hidden handler in case dev needs to add additional data points to DB for testing
  // const handleInputData = (inputProblem) => {
  //   axios
  //     .post("/records", inputProblem, {
  //       params: {
  //         userID: sessionStorage.getItem("UserID"),
  //       },
  //     })
  //     .then(({ data }) => {
  //       toast.success("Added Data Successfully", toastifyTheme);
  //     })
  //     .catch((error) => {
  //       firebaseErrorCodes(error.response.data.code, toastifyTheme);
  //     });
  // };

  //conditional render badge
  React.useEffect(() => {
    let grindResult = grindStreak(problemDatesArray);

    if (grindResult < 5 && grindResult >= 2) {
      setBadge({
        icon: badgeLow,
        text: `Woah, impressive! You got (${grindResult}) 3-day streaks!`,
        color: "green",
      });
    } else if (grindResult < 10 && grindResult >= 5) {
      setBadge({
        icon: badgeMed,
        text: `Now that's groovy! You got (${grindResult}) 3-day streaks!`,
        color: "yellow",
      });
    } else if (grindResult >= 10) {
      setBadge({
        icon: badgeHigh,
        text: `Ok now that's Huge! You got (${grindResult}) 3-day streaks!`,
        color: "red",
      });
    } else {
      setBadge({
        icon: badgeNew,
        text: "Welcome newComer. Get two 3-day streaks to earn a new badge",
        color: "white",
      });
    }
    setGrindCount(grindResult);
  }, [problemDatesArray]);

  //menu items
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
        // onClick={() => console.log(`opens menu for Profile`)} TODO: add profile page
      >
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        key="Settings"
        // onClick={() => console.log(`opens menu for Settings`)} TODO: add settings page
      >
        <p>Settings</p>
      </MenuItem>
      <MenuItem key="Logout" onClick={handleLogout}>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  //menu items mobile

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
        // onClick={() => console.log(`opens menu for Profile`)} TODO: add profile page
      >
        <p>Profile</p>
      </MenuItem>
      <MenuItem
        key="Settings"
        // onClick={() => console.log(`opens menu for Settings`)} TODO: add settings page
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
            {/*
              // hidden button in case dev needs to add additional data points to DB for testing
               <Button
              onClick={() => {
                handleInputData(createSamplePrompt());
              }}
              style={{ textDecoration: "inherit", color: "inherit" }}
            >
              Submit ONE Input for USER
            </Button>{" "} */}
            <Button
              size="large"
              edge="start"
              color="inherit"
              aria-label="about button"
              sx={{ mr: 2 }}
              onClick={() => setAboutToggle(!aboutToggle)}
            >
              ABOUT
            </Button>
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
            {!userLoggedIn && (
              <>
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
              </>
            )}{" "}
            <Tooltip title={badge.text}>
              <Box
                sx={{
                  display: "flex",
                  borderRadius: "25px",
                  padding: "11px",
                  border: 2,
                  borderColor: "rgba(130, 130, 130, .4)",
                }}
              >
                <img
                  src={badge.icon}
                  alt="logo"
                  style={{ maxWidth: 45, marginRight: 15 }}
                />
                <Button
                  size="large"
                  edge="start"
                  style={{ maxWidth: 30, minWidth: 0, color: badge.color }}
                >
                  {grindCount}
                </Button>
              </Box>
            </Tooltip>
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
