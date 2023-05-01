import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import LinearProgress from "@mui/material/LinearProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { loginCheck } from "../service/common/userService";
import { useCookies } from "react-cookie";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function LoginPage() {
  const [loginString, setLoginString] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    PostData(event);
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const flag = await loginCheck();
      setLoading(false);
      if (flag) {
        navigate("/");
      }
    })();
  }, []);

  async function PostData(event: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    const data = new FormData(event.currentTarget);
    const body = { email: data.get("email"), password: data.get("password") };
    const jsonBody = JSON.stringify(body);
    await fetch("https://localhost:8080/api/user/login", {
      method: "POST",
      credentials: "include",
      //mode: 'cors',
      headers: { "Content-Type": "application/json" },
      body: jsonBody,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("予期せぬエラーによりログインに失敗しました。");
        }
      })
      .then((resJson) => {
        if (resJson.token !== undefined && resJson.token !== "") {
          //setCookie('token', resJson.token, { path: '/', httpOnly: false });
        } else {
          throw new Error("メールアドレス、またはパスワードが間違っています。");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginString(error.message);
        setLoading(false);
        return;
      });
    const flag = await loginCheck();
    if (flag) {
      setLoading(false);
      navigate("/");
    } else {
      setLoading(false);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Chat Test
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography fontSize="fontSize" m={1}>
              {loginString}
            </Typography>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </Backdrop>
      )}
    </ThemeProvider>
  );
}
