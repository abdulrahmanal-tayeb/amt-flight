import { Helmet } from "react-helmet";
import { SearchOptions } from "../fragments/flights";
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
                    className="background-container amt-flex amt-flex-center amt-flex-align-center mt-5"
                    style={{
                        width: "100%",
                        height: "25dvh",
                        position: "relative",
                        marginBottom: "-3em",
                        borderRadius: "0.8em"
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(3em, 3vw, 4em)",
                            color: "white"
                        }}
                    >
                        Flights
                    </h1>
                </div>
                <SearchOptions
                    style={{
                        backgroundColor: "white"
                    }}
                />

                <Container
                    className="col-12"
                    style={{ marginTop: "5em" }}
                >
                    <h3>Find cheap flights from whereever you are to anywhere</h3>

                    <Stack sx={{
                        flexWrap: { xs: "wrap", md: "nowrap" },
                        gap: 2
                    }} className="col-12 mt-3" direction={"row"}>
                        {[
                            {
                                name: "New York City",
                                imgSrc: "/assets/images/ny.jpg",
                                price: "$399",
                                stops: "1 Stop in Dubai - 1 hr 15 min"
                            },
                            {
                                name: "Paris",
                                imgSrc: "/assets/images/paris.jpg",
                                price: "$499",
                                stops: "1 Stop in Dubai - 2 hr"
                            },
                            {
                                name: "London",
                                imgSrc: "/assets/images/london.jpg",
                                price: "$599",
                                stops: "2 Stops in Dubai, Turkey - 1 hr"
                            },
                            {
                                name: "United Arab Emarites",
                                imgSrc: "/assets/images/dubai.jpg",
                                price: "$699",
                            },
                        ].map((cardDetails, i) => (
                            <Card key={i} {...cardDetails} />
                        ))}

                    </Stack>
                </Container>
            </Layout>
        </>
    );
}