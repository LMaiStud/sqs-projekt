import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    TextField,
} from "@mui/material";
import MenuAppBar from "./MenuAppBar";
import { ChangeEvent, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

function LandingPage() {

    const [roadworksData, setRoadworksData] = useState<Roadwork[]>([]);
    const [search, setSearch] = useState("");
    const [searchResult, setsearchResult] = useState("Bitte Baustelle Suchen!");
    const [loading, setLoading] = useState(false);

    type Roadwork = {
        identifier: string;
        icon: string;
        isBlocked: string;
        future: boolean;
        extent: string;
        point: string;
        startLcPosition: string;
        impact: {
            lower: string;
            upper: string;
            symbols: string[];
        };
        display_type: string;
        subtitle: string;
        title: string;
        startTimestamp: string;
        coordinate: {
            lat: number;
            long: number;
        };
        description: string[];
        routeRecommendation: any[];
        footer: any[];
        lorryParkingFeatureIcons: any[];
        geometry: {
            type: string;
            coordinates: number[][];
        };
    }

    useEffect(() => {
    }, []);

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
                setLoading(false);
            })
            .catch((error) => {
                setsearchResult("Diese Baustelle existiert nicht!")
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
                            <Grid xs={12} sm={2} item>
                            </Grid>
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
                                <Typography variant="h4">Autobahnen:</Typography>
                                {loading ? (
                                    <CircularProgress />
                                ) : roadworksData.length > 0 ? (
                                    <Grid container spacing={2}>
                                        {roadworksData.map((roadwork) => (
                                            <Grid key={roadwork.identifier} item xs={12}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography variant="h5">{roadwork.title}</Typography>
                                                        {roadwork.description.map((desc, index) => (
                                                            <Typography key={index}>{desc}</Typography>
                                                        ))}
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))}
                                    </Grid>
                                ) : (
                                    <Typography>{searchResult}</Typography>
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
