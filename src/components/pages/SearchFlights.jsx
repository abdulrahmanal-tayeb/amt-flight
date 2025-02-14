import { Helmet } from "react-helmet-async";
import { FlightSearchResults, SearchOptions } from "../fragments/flights";
import { Layout } from "../utils/utils";
import { Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getFlights } from "../helpers/flights";
import { FlightSkeleton, SearchFlightsSkeleton } from "../loading/flights";
import { useChoosenFlight, useFlightQuery } from "../helpers/stores";

const DetailedFlight = lazy(() =>
    import("../fragments/flights").then(m => ({ default: m.DetailedFlight }))
);

export default function SearchFlights() {
    const { query } = useFlightQuery();
    const { flight } = useChoosenFlight();

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
                {query ?
                    <title>Flights from {query.origin.presentation.title} to {query.destination.presentation.title}</title>
                    :
                    <title>Search Results</title>
                }
                <meta name="description" content="Simple and clean Google Flights clone by Abdulrahman Al-Tayeb" />
            </Helmet>
            <Layout style={{ marginTop: "2em" }}>
                <SearchOptions />
                <Container
                    sx={{
                        mt: 5
                    }}
                >
                    {isLoading ?
                        <SearchFlightsSkeleton />
                        :
                        (
                            <>
                                {flight &&
                                    <div className="mt-5">
                                        <Suspense
                                            fallback={<FlightSkeleton />}
                                        >
                                            <DetailedFlight
                                                sessionId={data?.sessionId}
                                            />
                                        </Suspense>
                                    </div>
                                }

                                <div
                                    style={{
                                        // This prevents unneccessary mounts/unmounts when rendered conditionally.
                                        display: !!flight ? "none" : "block"
                                    }}
                                >
                                    <FlightSearchResults results={searchResults} />
                                </div>
                            </>
                        )
                    }
                </Container>
            </Layout>
        </>
    );
}