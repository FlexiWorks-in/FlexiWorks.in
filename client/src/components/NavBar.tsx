import React, { useState } from "react";
import { PaletteMode, styled } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Divider,
  Drawer,
} from "@mui/material";

import { CloseRounded, Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { logout } from "../app/features/authSlice";
import ToggleColorMode from "../assets/util/ToggleColorMode";
import FlexiWorks from "../assets/images/FlexiWorks.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  backdropFilter: "blur(24px)",
  borderBottom: "1px solid",
  borderColor: theme.palette.divider,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
}));

interface NavBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
}
const settings = ["Profile", "Theme", "Dashboard", "Logout"];

const NavBar: React.FC<NavBarProps> = ({ mode, toggleColorMode }) => {
  const [open, setOpen] = useState(false);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const { isAuthenticated, user } = auth;

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onMenuClick = async (setting: string) => {
    switch (setting) {
      case "Logout":
        dispatch(logout());
        handleCloseUserMenu();
        break;
      case "Profile":
        console.log("profile");
        handleCloseUserMenu();
        break;
      case "Theme":
        toggleColorMode();
        handleCloseUserMenu();
        break;
      case "Dashboard":
        console.log("dashboard");
        handleCloseUserMenu();
        break;
      default:
        break;
    }
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
        }}
      >
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <Box
                component="img"
                src={FlexiWorks}
                sx={{
                  height: "2.5rem",
                  background: "#00345e",
                  m:1,
                  p:"2px",
                  borderRadius:"4px"
                }}
                />
              <Button
                variant="text"
                color="info"
                size="small"
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button variant="text" color="info" size="small">
                About us
              </Button>
              <Button variant="text" color="info" size="small">
                Careers
              </Button>

              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Blog
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Contact us
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {!isAuthenticated ? (
              <>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <Box
                sx={{
                  display: { xs: "none", md: "flex", marginRight: "12px" },
                }}
              >
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, borderRadius: "50%" }}
                    size="small"
                  >
                    <Avatar
                      alt={user?.firstName}
                      // src="/static/images/avatar/2.jpg"
                      sx={{ width: 32, height: 32 }}
                      children={user?.firstName[0]}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => onMenuClick(setting)}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Box>
          <Box sx={{ display: { sm: "flex", md: "none" } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRounded />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    component={Link}
                    to="/register"
                  >
                    Register
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    color="primary"
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
