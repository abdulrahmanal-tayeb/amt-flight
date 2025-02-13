import { Helmet } from "react-helmet";
import { DetailedFlight, FlightSearchResults, SearchOptions, SearchResult } from "../fragments/flights";
import { Layout } from "../utils/utils";
import { Box, Container, Skeleton, Stack } from "@mui/material";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Key } from "@mui/icons-material";
import axios from "axios";
import { RAPID_API_HEADERS } from "../helpers/constants";
import { getFlights } from "../helpers/flights";
import { SearchFlightsSkeleton } from "../loading/flights";


export default function SearchFlights() {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [choosen, setChoosen] = useState(null);

    const { data, isLoading } = useQuery({
        queryKey: [`searchFlight-${searchParams.toString()}`],
        queryFn: () => getFlights(location.state),
        enabled: !!location.state,
        refetchOnWindowFocus: false
    });

    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if (data?.data) {
            setSearchResults(data.data);
        }
    }, [data]);




    return (
        <>
            <Helmet>
                <title>Search for flights</title>
            </Helmet>
            <Layout style={{ marginTop: "2em" }}>
                <SearchOptions
                    search={false}
                    values={location.state}
                />
                <Container
                    sx={{
                        mt: 5
                    }}
                >
                    {isLoading ?
                        <SearchFlightsSkeleton/>
                        :
                        (
                            <>
                                {choosen &&
                                    <div className="mt-5">
                                        <DetailedFlight
                                            sessionId={data?.sessionId}
                                            onClose={() => setChoosen(null)}
                                            itineraryData={choosen}
                                            flightsQuery={location.state} // Used when querying for returing flights.
                                        />
                                    </div>
                                }

                                <div
                                    style={{
                                        display: !!choosen ? "none" : "block"
                                    }}
                                >
                                    <h3>Top Departing Flights</h3>
                                    <p>Ranked based on price and convenience</p>
                                    <FlightSearchResults
                                        flightsQuery={location.state}
                                        setChoosen={setChoosen}
                                        results={searchResults}
                                    />
                                </div>
                            </>
                        )
                    }
                </Container >
            </Layout >
        </>
    );
}