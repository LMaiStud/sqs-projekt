import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, ListItemIcon, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";

function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openLogin, setOpenLogin] = React.useState(true);
  const [logout, setLogout] = React.useState(false);
  const open = Boolean(anchorEl);

  React.useEffect(() => {
    let token = localStorage.getItem("token");
    if (token !== null) {
      setLogout(true);
      setOpenLogin(false);
    }
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    localStorage.setItem("isLoggedIn", "false");
    setOpenLogin(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {localStorage.getItem("username")}
          </Typography>

          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            Bestes Autobaustellenauskunft
          </Typography>

          <IconButton
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <Link href="/" underline="hover">
              <MenuItem color="black">
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                Home
              </MenuItem>
            </Link>
            {openLogin && (
              <Link href="/login" underline="hover">
                <MenuItem color="black">
                  <ListItemIcon>
                    <LoginIcon fontSize="medium" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              </Link>
            )}
            {logout && (
              <Link href="/" underline="hover">
                <MenuItem color="black" onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="medium" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Link>
            )}
            <Link href="/Dashboard" underline="hover">
              <MenuItem color="black">
                <ListItemIcon>
                  <DashboardIcon fontSize="medium" />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;
