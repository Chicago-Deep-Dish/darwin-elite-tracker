import * as React from "react";
import { Link } from "react-router-dom";
import companyLogo from "./../Assets/Darwin_Logo_transparent.png";
import { styled, alpha } from "@mui/material/styles";
import {
  Button,
  IconButton,
  InputBase,
  Badge,
  MenuItem,
  Menu,
  AppBar,
  Box,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const settings = ["Profile", "Settings", "Logout"];

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
      {settings.map((setting) => (
        <MenuItem
          key={setting}
          onClick={() => console.log(`opens menu for ${setting} `)}
        >
          <p>{setting}</p>
        </MenuItem>
      ))}
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
      {settings.map((setting) => (
        <MenuItem
          key={setting}
          onClick={() => console.log(`opens menu for ${setting} `)}
        >
          <p>{setting}</p>
        </MenuItem>
      ))}
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
              size="large"
              edge="start"
              color="inherit"
              aria-label="records button"
              sx={{ mr: 2 }}
            >
              {" "}
              <Link
                to="/records"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                Records
              </Link>
            </Button>

            <Button
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </Button>
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
            <Button
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
