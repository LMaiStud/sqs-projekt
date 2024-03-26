import * as React from "react";
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import logo from "../../public/logo.png";
import MenuAppBar from "../MenuAppBar";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import DetailAuction from "../TypeDto/DetailAuction";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import Countdown from "react-countdown";

function DetailView() {
  const location = useLocation();
  const [Auctions, setAuctions] = useState<DetailAuction[]>([]);
  const [bid, setBid] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [bidder, setBidder] = useState("");
  let navigate = useNavigate();
  const socket = io(
    `${import.meta.env.VITE_APP_BACKEND_WS_URL}` + "?id=" + location.state.id
  );
  const [countdownEnd, setCountdownEnd] = useState(false);
  const [bidToLow, setBitToLow] = useState(false);
  const [image, setImage] = useState(false);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/v1/auctions/` + location.state.id
    )
      .then((response) => response.json())
      .then((json) => {
        setAuctions([json]);
        setOldPrice(JSON.parse(json.price));
        setBidder(json.highest_bidder.username);
      });

    if (localStorage.getItem("isLoggedIn") === "false") {
      setCountdownEnd(true);
    }

    socket.on("connect", () => {});

    socket.on("onBid", (body) => {
      setOldPrice(JSON.parse(body.price));
      setBidder(body.highest_bidder);
    });

    socket.on("disconnect", () => {});
  }, []);

  const sendNewBid = (
    auctionId: number,
    price: number,
    highest_bidder: string | null
  ) => {
    const message = {
      id: auctionId,
      price: price,
      highest_bidder: highest_bidder,
    };
    socket.emit("newBid", message);
  };

  const handleBid = (event: ChangeEvent<HTMLInputElement>) => {
    setBid(event.target.value);
  };

  function doPopup() {
    setBitToLow(false);
  }

  async function doBid() {
    if (Number(bid) > Number(oldPrice)) {
      const bodyAuction = JSON.stringify({
        price: bid,
        highest_bidder: localStorage.getItem("username"),
      });

      const updateAuction = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/v1/auctions/` +
          location.state.id,
        {
          method: "PUT",
          body: bodyAuction,
          headers: { "Content-type": "application/json" },
        }
      );

      const bodyMerkliste = JSON.stringify({
        auction_id: location.state.id,
        username: localStorage.getItem("username"),
        price: bid,
      });

      const updateMerkliste = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/v1/bids/`,
        {
          method: "PUT",
          body: bodyMerkliste,
          headers: { "Content-type": "application/json" },
        }
      );

      if (updateAuction.ok && updateMerkliste) {
        sendNewBid(
          location.state.id,
          Number(bid),
          localStorage.getItem("username")
        );
        setBid("");
      }
    } else {
      setBitToLow(true);
    }
  }

  const Completionist = () => <span style={{ color: "red" }}>Abgelaufen</span>;

  // @ts-ignore
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setCountdownEnd(true);
      return <Completionist />;
    } else {
      return (
        <span>
          {days}d:{hours}h:{minutes}m:{seconds}s
        </span>
      );
    }
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") {
      doBid();
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
          }}
        >
          <CardContent>
            <Grid container spacing={1}>
              <Grid xs={12} sm={2} item>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  <img
                    style={{ width: 120, height: 110 }}
                    src={logo}
                    alt="Logo"
                  />
                </Link>
              </Grid>
              <Grid xs={12} item>
                <h3></h3>
                <h3></h3>
              </Grid>
              <Grid container alignItems="center" justifyContent="center">
                {Auctions.map((auction) => {
                  return (
                    <>
                      <Grid xs={12} sm={6} item>
                        <center>
                          <Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                              setImage(true);
                            }}
                          >
                            <img
                              style={{ width: 220, height: 220 }}
                              src={auction.image.replace(/frontend/gi, "")}
                              alt="iphone"
                            />
                          </Link>
                        </center>
                      </Grid>
                      <Grid xs={12} sm={6} item>
                        <Grid xs={12} sm={6} item>
                          <Typography variant="h4">{auction.title}</Typography>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "10px" }}
                          >
                            Aktuelles Gebot: {oldPrice} €
                          </Typography>
                          <TextField
                            fullWidth
                            label="Geben Sie ihr Gebot in € ein"
                            variant="outlined"
                            value={bid}
                            onChange={handleBid}
                            disabled={countdownEnd}
                            onKeyDown={handleEnter}
                            style={{ marginTop: "10px" }}
                          />
                          <Button
                            fullWidth
                            variant="contained"
                            onClick={doBid}
                            disabled={countdownEnd}
                            style={{ marginTop: "10px" }}
                          >
                            Gebot abgeben
                          </Button>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "10px" }}
                          >
                            Verbleibende Zeit:{" "}
                            <Countdown
                              date={auction.end_date}
                              renderer={renderer}
                            >
                              <Completionist />
                            </Countdown>
                          </Typography>
                          <Typography
                            variant="h6"
                            style={{ marginTop: "10px" }}
                          >
                            Höchster Bieter: {bidder}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid xs={12} sm={12} item>
                        <Typography variant="body1">Beschreibung:</Typography>
                        <Typography variant="body1">
                          {auction.description}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ marginTop: "20px" }}
                        >
                          Verkauft von: {auction.owner.username}
                        </Typography>
                      </Grid>
                      <Dialog open={image}>
                        <DialogActions>
                          <Button
                            onClick={() => {
                              setImage(false);
                            }}
                            style={{ color: "black" }}
                          >
                            X
                          </Button>
                        </DialogActions>
                        <img
                          style={{
                            maxWidth: "100%",
                            maxHeight: "calc(100vh - 64px)",
                          }}
                          src={auction.image.replace(/frontend/gi, "")}
                          alt="iphone"
                        ></img>
                      </Dialog>
                    </>
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Dialog
        open={bidToLow}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Dein Gebot ist zu wenig!!
            <h3></h3>
            <Button
              fullWidth
              variant="contained"
              onClick={doPopup}
              disabled={countdownEnd}
            >
              OK
            </Button>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DetailView;
