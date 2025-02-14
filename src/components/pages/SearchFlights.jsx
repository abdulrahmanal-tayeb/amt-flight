import { Helmet } from "react-helmet";
import { DetailedFlight, FlightSearchResults, SearchOptions } from "../fragments/flights";
import { Layout } from "../utils/utils";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFlights } from "../helpers/flights";
import { SearchFlightsSkeleton } from "../loading/flights";
import { useChoosenFlight, useFlightQuery } from "../helpers/stores";


export default function SearchFlights() {
    const {query} = useFlightQuery();
    const {flight} = useChoosenFlight();

    const [searchParams] = useSearchParams();


    const { data, isLoading } = useQuery({
        queryKey: [`searchFlight-${searchParams.toString()}`],
        queryFn: () => getFlights(query),
        enabled: !!query,
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
                                {flight &&
                                    <div className="mt-5">
                                        <DetailedFlight
                                            sessionId={data?.sessionId}
                                        />
                                    </div>
                                }

                                <div
                                    style={{
                                        // This prevents unneccessary mounts/unmounts when rendered conditionally.
                                        display: !!flight ? "none" : "block"
                                    }}
                                >
                                    <FlightSearchResults
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