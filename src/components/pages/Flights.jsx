import { SearchOptions } from "../fragments/flights";
import { Container, Stack } from "@mui/material";
import Card from "../ui/Card";
import { Layout } from "../utils/utils";
import { motion } from "framer-motion";
import Slide from "../ui/animated/Slide";
import { Helmet } from "react-helmet-async";

export default function Flights() {
    return (
        <>
            <Helmet>
                <title>Flights - Find Cheap Flight Options</title>
                <meta name="description" content="Search for cheap flights from where ever you are to any part of the world!" />
            </Helmet>
            <Layout>
                <motion.div
                    initial={{
                        backgroundColor: "#12718500"
                    }}

                    animate={{
                        backgroundColor: "#1271858f"
                    }}

                    transition={{
                        duration: 1
                    }}

                    className="background-container amt-flex amt-flex-center amt-flex-align-center mt-5"
                    style={{
                        width: "100%",
                        height: "25dvh",
                        position: "relative",
                        marginBottom: "-3em",
                        borderRadius: "0.8em"
                    }}
                >
                    <motion.h1
                        initial={{ color: "#00000" }}
                        animate={{ color: "#FFFFFF" }}
                        transition={{
                            duration: 1
                        }}

                        style={{
                            fontSize: "clamp(3em, 3vw, 4em)",
                            color: "white",
                        }}
                    >
                        Flights
                    </motion.h1>
                </motion.div>
                <Slide
                    transition={{
                        duration: 1
                    }}
                    direction="down"
                    className="col-12"
                >
                    <SearchOptions
                        style={{
                            backgroundColor: "white"
                        }}
                    />
                </Slide>

                <Slide
                    className="col-12"
                    transition={{
                        duration: 1,
                        delay: 1
                    }}
                >
                    
                    {/* Those were hardcoded because I couldn't find an API endpoint that could satisfy this functionality */}
                    <Container
                        className="col-12"
                        style={{ marginTop: "5em" }}
                    >
                        <h3>Find cheap flights from whereever you are to anywhere</h3>

                        <Stack
                            sx={{
                                flexWrap: { xs: "wrap", md: "nowrap" },
                                gap: 2
                            }}
                            className="col-12 mt-3"
                            direction={"row"}
                        >
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
                                <Slide
                                    key={i}
                                    style={{ flexGrow: 1 }}
                                    transition={{
                                        duration: 0.2,
                                        delay: 1 + i * 0.2
                                    }}
                                >
                                    <Card key={i} {...cardDetails} />
                                </Slide>
                            ))}
                        </Stack>
                    </Container>
                </Slide>
            </Layout>
        </>
    );
}