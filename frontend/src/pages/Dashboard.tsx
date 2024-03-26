import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import MenuAppBar from "../MenuAppBar";
import { useState } from "react";

interface FormResponse {
  statusCode?: number;
  message?: string;
}

function Dashboard() {
  const [email, setEmail] = useState("");
  const username = localStorage.getItem("username");
  const sendinblueListId = "3";
  const [response, setResponse] = useState<FormResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = { email, username, sendinblueListId };
      const response = await fetch(
        `${
          import.meta.env.VITE_APP_BACKEND_URL
        }/v1/users/newsletter/subscribe/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data: FormResponse = await response.json();

      if (response.ok) {
        setResponse({ message: "Erfolgreich Angemeldet" });
      } else {
        setResponse(data);
      }
    } catch (error) {
      setResponse({ message: "Oops das hat nicht geklappt" });
    }
  };

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
            padding: "5px 5px",
            margin: "0 auto",
            marginTop: 5,
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
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
              Dashboard
            </Typography>
            <Grid>
              <Card
                style={{
                  maxWidth: 500,
                  padding: "20px 20px",
                  margin: "0 auto",
                  marginTop: 20,
                  justifyContent: "center",
                }}
              >
                <Grid item xs={12} style={{ marginTop: "5px" }}>
                  <Button variant="outlined" href="/CreateAuction" fullWidth>
                    Auktion erstellen
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                  <Button variant="outlined" href="/MyAuction" fullWidth>
                    Meine Auktionen
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "10px" }}>
                  <Button variant="outlined" href="/MyBids" fullWidth>
                    Meine Gebote
                  </Button>
                </Grid>
                <Grid item xs={12} style={{ marginTop: "40px" }}>
                  <Container maxWidth="sm">
                    <Typography
                      variant="h6"
                      component="h2"
                      align="center"
                      gutterBottom
                    >
                      Newsletter Anmeldung
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                      />
                      <Button type="submit" variant="contained" color="primary">
                        Abonnieren
                      </Button>
                      {response && (
                        <Typography
                          variant="body1"
                          align="center"
                          style={{
                            color:
                              response.statusCode === 409 ? "red" : "green",
                          }}
                        >
                          {response.message}
                        </Typography>
                      )}
                    </form>
                  </Container>
                </Grid>
              </Card>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Dashboard;
