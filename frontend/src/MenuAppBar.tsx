import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
            Beste Autobaustellenauskunft
          </Typography>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MenuAppBar;
