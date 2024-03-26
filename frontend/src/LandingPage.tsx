import * as React from "react";
import {
    Button,
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Link,
    TextField,
    Typography,
} from "@mui/material";
import MenuAppBar from "./MenuAppBar";
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Roadwork from "./TypeDto/Roadwork";
// @ts-ignore
import logo from "../public/logo.png";

function LandingPage() {
    let navigate = useNavigate();

    const [roadworksData, setRoadworksData] = useState<Roadwork[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRoadworks();
    }, []);

    const fetchRoadworks = () => {
        fetch(`http://localhost:8080/roadworks?roadId=A1`)
            .then((response) => response.json())
            .then((json) => {
                setRoadworksData(json.roadworks); // Anpassung für die Roadworks-Datenstruktur
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching roadworks:", error);
                setLoading(false); // Setzen Sie loading auf false, um sicherzustellen, dass der Ladeindikator auch bei einem Fehler ausgeblendet wird
            });
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    function doSearch() {
        console.log(roadworksData);
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
                            <Grid xs={12} sm={10} item>
                                <TextField
                                    fullWidth
                                    label="Suche"
                                    variant="outlined"
                                    value={search}
                                    onChange={handleSearch}
                                    onKeyDown={handleEnter}
                                />
                                <h3></h3>
                                <Button variant="contained" onClick={doSearch} type="submit">
                                    Suche starten
                                </Button>
                            </Grid>
                            <Grid xs={12} item>
                                <h3>Baustellen:</h3>
                                {loading ? (
                                    <CircularProgress />
                                ) : roadworksData.length > 0 ? (
                                    <ul>
                                        {roadworksData.map((roadwork) => (
                                            <li key={roadwork.identifier}>
                                                <h4>{roadwork.title}</h4>
                                                <p>{roadwork.description.join("\n")}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>Keine Baustellendaten verfügbar.</p>
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
