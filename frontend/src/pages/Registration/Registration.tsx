import React from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { RegistrationCredentials } from "./RegistrationCredentials";
import { Link, useNavigate } from "react-router-dom";
import MenuAppBar from "../../MenuAppBar";

const Registration: React.FC = () => {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  function onRegistration(credentials: RegistrationCredentials) {
    fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.text())
      .then((status) => {
        switch (status) {
          case '{"statusCode":409,"message":"User already exists"}':
            // duplicate username in database
            setAlertMessage("Username existiert bereits");

            setOpen(true);
            break;
          default:
            // login the user after successful registration
            fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/v1/users/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(credentials),
            })
              .then((response) => response.json())
              .then((response) => {
                if (response.statusCode == 201) {
                  // set jwt in localstorage if login was successful
                  localStorage.setItem("token", response.token);
                  //set username in localstorage after successful login
                  localStorage.setItem("username", credentials.username);
                  localStorage.setItem("isLoggedIn", "true");
                  navigate("/Dashboard");
                } else {
                  // error handling if login fails
                  // navigate to login page if automatic login fails
                  navigate("/login");
                }
              });
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
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationCredentials>();

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
                onSubmit={handleSubmit(onRegistration)}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <Typography variant="h6" component="div">
                      Account erstellen
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
                        required: "Password ist Pflichtfeld",
                        // Password validation: atleast 8 character long, atleast 1 lowercase letter, uppercase letter, number and special character
                        validate: (value: string) => {
                          let regex =
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9_]).{8,}$/;
                          if (!regex.test(value)) {
                            // snackbar alert to inform the user the password requirements are not met
                            setAlertMessage(
                              "Passwort muss mindestens 8 Zeichen lang sein, einen Klein- und Großbuchstaben sowie eine Zahl und ein Sonderzeichen beinhalten"
                            );
                            setOpen(true);
                            return "";
                          }
                        },
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Passwort bestätigen"
                      type="password"
                      variant="outlined"
                      {...register("confirmPassword", {
                        required: "Password ist Pflichtfeld",
                        validate: (value: string) => {
                          if (watch("password") !== value) {
                            return "Passwörter sind nicht gleich";
                          }
                        },
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}
                      fullWidth={true}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      style={{ maxWidth: "400px", width: "100%" }}
                    >
                      Registrieren
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      component={Link}
                      to="/login"
                      style={{ maxWidth: "400px", width: "100%" }}
                      variant={"outlined"}
                    >
                      Anmelden
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="error" variant="filled">
                  {alertMessage}
                </Alert>
              </Snackbar>
            </CardContent>
          </Card>
        </Card>
      </Grid>
    </>
  );
};

export default Registration;
