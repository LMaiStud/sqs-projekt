import MenuAppBar from "../../MenuAppBar";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";

import Typography from "@mui/material/Typography";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useRef } from "react";
import { LoginCredentials } from "./LoginCredentials";

function Login() {
  const navigate = useNavigate();

  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [open, setOpen] = React.useState(false);

  function onLogin(credentials: LoginCredentials) {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/v1/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode == 201) {
          // set jwt in localstorage if login was successful
          localStorage.clear();
          localStorage.setItem("token", response.token);
          localStorage.setItem("username", credentials.username);
          localStorage.setItem("isLoggedIn", "true");
          navigate("/Dashboard");
        } else {
          // error handling if login fails
          // snackbar alert to inform the user the login failed
          setOpen(true);
          // clear user inputs
          if (usernameRef.current) {
            usernameRef.current.value = "";
          }
          if (passwordRef.current) {
            passwordRef.current.value = "";
          }
        }
      });
  }

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  return (
    <>
      <Grid
        style={{
          maxWidth: 1500,
          padding: "5px 5px",
          margin: "0 auto",
          marginTop: 5,
        }}
      >
        <MenuAppBar />
        <Card
          style={{
            maxWidth: 1500,
            padding: "20px 5px",
            margin: "0 auto",
            marginTop: 5,
          }}
        >
          <Card
            style={{
              maxWidth: 400,
              padding: "20px 5px",
              margin: "0 auto",
              marginTop: 20,
            }}
          >
            <CardContent>
              <Box
                component="form"
                onSubmit={handleSubmit(onLogin)}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h6" component="div">
                      Auktionshaus Login
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      {...register("username", {
                        required: "Username ist Pflichtfeld",
                      })}
                      error={!!errors.username}
                      helperText={errors.username?.message}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Passwort"
                      type="password"
                      variant="outlined"
                      {...register("password", {
                        required: "Passwort ist Pflichtfeld",
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      style={{ maxWidth: "400px", width: "100%" }}
                      type="submit"
                    >
                      Anmelden
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      component={Link}
                      style={{ maxWidth: "400px", width: "100%" }}
                      to="/register"
                      variant={`outlined`}
                    >
                      Account erstellen
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="error" variant="filled">
                  Username oder Passwort nicht korrekt
                </Alert>
              </Snackbar>
            </CardContent>
          </Card>
        </Card>
      </Grid>
    </>
  );
}
export default Login;
