import * as React from "react";
import { Card, CardContent, Divider, Grid, Link } from "@mui/material";
import MenuAppBar from "../MenuAppBar";
import { useEffect, useState } from "react";
import Auction from "../TypeDto/Auction";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function MyBids() {
  const [Auctions, setAuctions] = useState<Auction[]>([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/v1/bids/` +
        localStorage.getItem("username")
    )
      .then((response) => response.json())
      .then((json) => {
        setAuctions(json);
      });
  }, []);

  let navigate = useNavigate();

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
              Meine Gebote
            </Typography>
            {Auctions.map((auction) => {
              return (
                <>
                  <Grid container xs={12} justifyContent="center">
                    <Divider style={{ width: "100%", margin: "15px" }} />
                    <Grid item sm={5}>
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => {
                          navigate("/DetailView", {
                            state: { id: auction.id },
                          });
                        }}
                      >
                        <img
                          style={{ width: 220, height: 220 }}
                          src={auction.image.replace(/frontend/gi, "")}
                          alt="iphone"
                        />
                      </Link>
                    </Grid>
                    <Grid item sm={3}>
                      <Link
                        component="button"
                        variant="h4"
                        style={{ color: "inherit", textDecoration: "none" }}
                        onClick={() => {
                          navigate("/DetailView", {
                            state: { id: auction.id },
                          });
                        }}
                      >
                        {auction.title}
                      </Link>
                      <Typography variant="h6">
                        Aktuelles Gebot: {auction.price} €
                      </Typography>
                      <Typography variant="body1">Beschreibung:</Typography>
                      <Typography variant="body1">
                        {auction.description}
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              );
            })}
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
export default MyBids;
