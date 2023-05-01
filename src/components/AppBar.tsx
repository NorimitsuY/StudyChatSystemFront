import * as React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import GamePadIcon from "@mui/icons-material/Gamepad";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useCookies } from "react-cookie";

const userMenus = [
  { Id: "usermenu", Disp: "ユーザーメニュー", Url: "User" },
  { Id: "logout", Disp: "ログアウト", Url: "/user/logout" },
];

export default function ResponsiveAppBar() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (url: string) => {
    setAnchorElUser(null);
    //navigate('/login');
    if (url === "/user/logout") {
      fetch("https://localhost:8080/api/user/logout", {
        method: "POST",
        credentials: "include",
        //mode: 'cors',
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          return;
        });
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <GamePadIcon sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/main"
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ChatTest
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
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
              onClose={(event) => {
                handleCloseUserMenu("");
              }}
            >
              {userMenus.map((userMenu) => (
                <MenuItem
                  key={userMenu.Id}
                  onClick={() => {
                    handleCloseUserMenu(userMenu.Url);
                  }}
                >
                  <Typography textAlign="center">{userMenu.Disp}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
