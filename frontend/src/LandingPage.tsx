import React, { useState, useEffect, ChangeEvent } from "react";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
} from "@mui/material";
import MenuAppBar from "./MenuAppBar";

function LandingPage() {
    const [roadworksData, setRoadworksData] = useState<Roadwork[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setsearchResult] = useState("Bitte Baustelle Suchen!");
    const [loading, setLoading] = useState(false);

    type Roadwork = {
        identifier: string;
        title: string;
        description: string[];
    };

    useEffect(() => {}, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    function doSearch() {
        if (search.trim() === "") {
            return;
        }
        setLoading(true);
        const searchParam = search.trim().toUpperCase();

        fetch(`http://localhost:8080/roadworks?roadId=${searchParam}`)
            .then((response) => response.json())
            .then((json) => {
                setRoadworksData(json.roadworks);
                if(roadworksData.length==0){
                    setsearchResult(`Keine Baustellen auf der ${searchParam} gefunden!`);
                }
                setLoading(false);
            })
            .catch((error) => {
                setsearchResult(`Diese Autobahn "${searchParam}" existiert nicht!`);
                setLoading(false);
                setRoadworksData([]);
            });
    }

    const handleEnter = (event: any) => {
        if (event.key === "Enter") {
            doSearch();
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
                        <Grid container spacing={1} alignItems="center">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={10} sm={10} md={10}>
                                    <TextField
                                        fullWidth
                                        label="Suche"
                                        variant="outlined"
                                        value={search}
                                        onChange={handleSearch}
                                        onKeyDown={handleEnter}
                                    />
                                </Grid>
                                <Grid item xs={2} sm={2} md={2}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={doSearch}
                                        type="submit"
                                        style={{ height: "100%" }}
                                    >
                                        Suche
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center"> </Typography>
                                {loading ? (
                                    <CircularProgress />
                                ) : roadworksData.length > 0 ? (
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Standort</TableCell>
                                                    <TableCell>Beschreibung</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {roadworksData.map((roadwork) => (
                                                    <TableRow key={roadwork.identifier}>
                                                        <TableCell component="th" scope="row">
                                                            {roadwork.title}
                                                        </TableCell>
                                                        <TableCell>
                                                            {roadwork.description.map((desc, index) => (
                                                                <Typography key={index}>{desc}</Typography>
                                                            ))}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <Typography variant="h5">{searchResult}</Typography>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}

export default LandingPage;
