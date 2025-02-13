import { Helmet } from "react-helmet";
import { SearchAndFilter } from "../utils/flights";
import { Box, Button, Chip, Container, Grid2, Stack } from "@mui/material";
import Card from "../ui/Card";
import { Layout } from "../utils/utils";

export default function Flights() {
    return (
        <>
            <Helmet>
                <title>Flights - Find Cheap Flight Options</title>
            </Helmet>

            <Layout>
                <div
                    className="amt-flex amt-flex-center amt-flex-align-center"
                    style={{
                        width: "100%",
                        height: "25dvh",
                        position: "relative"
                    }}
                >
                    <h1
                        style={{ fontSize: "3em" }}
                    >
                        Flights
                    </h1>
                </div>
                <SearchAndFilter />
                <Container
                    className="col-12 mt-5"
                >
                    <h3>Find cheap flights from Jazan to anywhere</h3>
                    <Stack className="col-12 mt-3" spacing={2} direction={"row"}>
                        <Chip label="Jazan" />
                        <Chip label="Abha" />
                        <Chip label="Jeddah" />
                    </Stack>

                    <Stack className="col-12 mt-5" spacing={2} direction={"row"}>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </Stack>
                </Container>

                <Container className="col-12 mt-5 ">
                    <h3>Flight information for Jazan to Paris to help you plan your next trip.</h3>
                    <Grid2 container spacing={2} sx={{ mt: 5, flexWrap: "wrap" }}>
                        <Grid2 size={6} item>
                            <Box
                                sx={{
                                    borderRadius: '1em',
                                    backgroundColor: 'var(--amt-secondary)',
                                    p: 2,
                                    position: 'relative',
                                    height: '100%',
                                }}
                            >
                                <p>Cheapest One-Way Flight</p>
                                <p style={{ fontSize: '2em' }}>$399</p>
                                <p>Saudia - 1 stop - 12 hr - Feb 26</p>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '1em',
                                        width: '100%',
                                    }}
                                >
                                    <p>The cheapest one-way flight from Jazan to Paris is currently $394</p>
                                    <Button variant="contained" color="secondary">
                                        Find Flights
                                    </Button>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2 item size={6}>
                            <Stack spacing={2}>
                                <Box
                                    sx={{
                                        borderRadius: '1em',
                                        backgroundColor: 'var(--amt-secondary)',
                                        p: 2,
                                        position: 'relative'
                                    }}
                                >
                                    <p>Fastest Flight</p>
                                    <Stack sx={{ justifyContent: "space-between" }} direction="row" spacing={2}>
                                        <p style={{ fontSize: '2em' }}>9 hr 30 min</p>
                                        <p>The fastest flight with stops from Jazan to Paris takes 9 hr 30 min</p>
                                    </Stack>
                                </Box>
                                <Box
                                    sx={{
                                        borderRadius: '1em',
                                        backgroundColor: 'var(--amt-secondary)',
                                        p: 2,
                                        position: 'relative'
                                    }}
                                >
                                    <p>Another Flight Info</p>
                                    <Stack sx={{ justifyContent: "space-between" }} direction="row" spacing={2}>
                                        <p style={{ fontSize: '2em' }}>$450</p>
                                        <p>Airline XYZ - Nonstop - 11 hr - Mar 3</p>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid2>
                    </Grid2>
                </Container>
            </Layout>
        </>
    );
}