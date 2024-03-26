import MenuAppBar from "../MenuAppBar";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import React, { useState } from "react";
import Auction from "../TypeDto/Auction";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";

function CreateAuction() {
  const duration = [
    {
      value: 1,
      label: "1 Stunde",
    },
    {
      value: 2,
      label: "2 Stunden",
    },
    {
      value: 5,
      label: "5 Stunden",
    },
    {
      value: 10,
      label: "10 Stunden",
    },
    {
      value: 24,
      label: "1 Tag",
    },
    {
      value: 72,
      label: "3 Tage",
    },
  ];

  const navigate = useNavigate();

  const [filename, setFilename] = useState("");
  const [popup, setPopup] = useState(false);
  const [values, setValues] = useState();
  const [missingFile, setMissingFile] = useState(false);
  const [auctionDuration, setAuctionDuration] = useState(1);
  const [notNumber, setNotNumber] = useState(false);

  const bodyFormData = new FormData();

  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];
    setValues(file);
    setMissingFile(false);
    const { name } = file;
    setFilename(name);
  };

  async function onSubmit(auction: Auction) {
    if (!values) {
      return setMissingFile(true);
    }

    if (Number.isNaN(auction.price)) {
      setNotNumber(true);
      setError("price", {
        types: {
          required: "Input is not a Number",
        },
      });
      return;
    }

    if (auction.price < 0) {
      setNotNumber(true);
      setError("price", {
        types: {
          required: "Input is not accepted!",
        },
      });
      return;
    }

    const settingDate: Date = new Date();
    const endDate: Date = new Date(settingDate);
    endDate.setHours(endDate.getHours() + auctionDuration);

    bodyFormData.append("title", "" + auction.title);
    bodyFormData.append("description", auction.description);
    bodyFormData.append("price", "" + auction.price);
    bodyFormData.append("image", values);
    bodyFormData.append("setting_date", settingDate.toString());
    bodyFormData.append("end_date", endDate.toString());
    bodyFormData.append("owner", auction.owner);
    bodyFormData.append("highest_bidder", auction.owner);

    const res = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/v1/auctions`,
      {
        method: "POST",
        body: bodyFormData,
      }
    );

    if (res.ok) {
      setPopup(true);
    }
  }

  const handleClose = () => {
    navigate("/Dashboard");
  };

  const handleSelect = (e: any) => {
    setAuctionDuration(e.value);
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Auction>();

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
              Auktion erstellen
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              autoComplete="off"
              style={{ marginTop: 15 }}
            >
              <Grid
                container
                spacing={1}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={6}>
                  <TextField
                    id="title"
                    label="Titel"
                    variant="outlined"
                    fullWidth
                    {...register("title", {
                      required: "Titel ist Pflichtfeld",
                    })}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                  />
                </Grid>
                <Box width="100%" height={10} />
                <Grid item xs={6}>
                  <TextField
                    id="description"
                    label="Beschreibung"
                    variant="outlined"
                    multiline
                    fullWidth
                    {...register("description", {
                      required: "Beschreibung ist Pflichtfeld",
                    })}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </Grid>
                <Box width="100%" height={10} />
                <Grid item xs={6}>
                  <TextField
                    id="price"
                    label="Preis"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">€</InputAdornment>
                      ),
                    }}
                    {...register("price", {
                      required: "Preis ist Pflichtfeld",
                      valueAsNumber: true,
                    })}
                    error={notNumber || !!errors.price}
                    helperText={
                      errors.price?.message || errors.price?.types?.required
                    }
                  />
                </Grid>
                <Box width="100%" height={10} />
                <Box>{filename}</Box>
                <Box width="100%" height={10} />
                {missingFile && (
                  <Alert severity="error">
                    Bitte laden Sie ein Produktbild hoch
                  </Alert>
                )}
                <Box width="100%" height={10} />
                <Grid item xs={6} textAlign="center">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                  >
                    Bild hochladen
                    <input
                      type="file"
                      hidden
                      accept=".png"
                      onChange={handleFileUpload}
                    />
                  </Button>
                </Grid>
                <Box width="100%" height={10} />
                <Grid item xs={6}>
                  <TextField
                    select
                    label="Laufzeit der Auktion"
                    defaultValue={1}
                    fullWidth
                  >
                    {duration.map((option) => (
                      <MenuItem
                        key={option.value}
                        value={option.value}
                        onClick={() => handleSelect(option)}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Box width="100%" height={10} />
                <Grid item xs={3}>
                  <Button variant="contained" type="submit" fullWidth>
                    Auktion erstellen
                  </Button>
                </Grid>
                <Grid item xs={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => {
                      navigate("/Dashboard");
                    }}
                  >
                    Zurück
                  </Button>
                </Grid>
              </Grid>
              <input
                type="hidden"
                value={JSON.stringify(
                  localStorage.getItem("username")
                ).replaceAll('"', "")}
                {...register("owner")}
              />
            </Box>
          </CardContent>
        </Card>
        <Dialog open={popup} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>Auktion erfolgreich erstellt</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

export default CreateAuction;
