import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Box, Button, Container, IconButton, Skeleton, Stack } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { FlightTakeoff } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Paginated } from '../utils/utils';
import { toSentence, formatDuration, formatLegs, formatShortDate, formatTime, objectToSearchParams } from '../helpers/helpers';
import { getFlightDetails, getItinerary } from '../helpers/flights';
import { AirportOptions, DateOptions, FlightDetailsAccordion, ReturningFlights, TripOptions } from './subfragments/flights';
import { useChoosenFlight, useFlightQuery } from '../helpers/stores';
import { FlightSkeleton } from '../loading/flights';

export function SearchOptions({
    style = {},
}) {

    const { query, setQuery } = useFlightQuery();
    const { setFlight } = useChoosenFlight();
    const { control, handleSubmit } = useForm({
        // Use the provided stored query
        // fallbacks to the estimation.
        defaultValues: query ?? {
            trip: "roundTrip",
            cabinClass: "economy",
            startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 7 * 2 * 24 * 60 * 60 * 1000),
            adults: 0
        }
    });

    const navigate = useNavigate();

    const handleSearch = useCallback((values) => {
        setQuery(values);
        setFlight(null); // Reset choosen flight;
        navigate(`/flights/search/?${objectToSearchParams(values)}`);
    }, [navigate, setFlight, setQuery]);

    return (
        <Container>
            <form>
                <Box
                    className="shadow"
                    sx={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "1em",
                        padding: "1em",
                        backgroundColor: "var(--amt-secondary)",
                        position: "relative",
                        ...style,
                    }}
                >
                    <TripOptions control={control} />
                    <Stack
                        className="col-12 mt-3 amt-flex-grow"
                        direction={"row"}
                        justifyContent={"space-between"}
                        sx={{
                            flexWrap: "wrap",
                            gap: 2
                        }}
                    >
                        <AirportOptions control={control} />
                        <DateOptions control={control} />
                    </Stack>

                    {/* Search Button */}
                    <Container
                        className="mt-3 col-12 amt-flex amt-flex-center"
                    >
                        <Button
                            className="shadow"
                            startIcon={<SearchIcon />}
                            variant="contained"
                            sx={{
                                borderRadius: "2em",
                                backgroundColor: "#127185",
                                transform: "translateY(2.5em)",
                                height: "45px"
                            }}
                            onClick={handleSubmit(handleSearch)}
                        >
                            Search
                        </Button>
                    </Container>
                </Box>
            </form>
        </Container>
    )
}

export function SearchResult({
    style = {},
    data,
    onClick,
}) {

    const { flight } = useFlightQuery();

    // Here we simulate the cabinClass and trip from the made query because there
    // Rapid API doesn't support them
    const { query } = useFlightQuery();
    const {
        price: {
            formatted: flightFormattedPrice
        },
        legs,
    } = data;

    const leg = legs[0];

    return (
        <Box
            onClick={() => onClick && onClick(data)}
            className="result-container mb-3"
            sx={{
                width: "100%",
                padding: "1em",
                backgroundColor: "var(--amt-secondary)",
                borderRadius: "1em",
                cursor: onClick ? "pointer" : "auto",
                ...style
            }}
        >
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <div>
                        <h3 className="mb-0">{formatTime(leg.departure)} </h3>
                        <small>{formatShortDate(leg.departure)}</small>
                        <p style={{ fontSize: "0.7em" }}>{leg.origin.city} ({leg.origin.displayCode})</p>
                    </div>
                    <h3><ArrowRightAltIcon /></h3>
                    <div>
                        <h3 className="mb-0"> {formatTime(leg.arrival)}</h3>
                        <small>{formatShortDate(leg.arrival)}</small>
                        <p style={{ fontSize: "0.7em" }}>{leg.destination.city} ({leg.destination.displayCode})</p>
                    </div>
                </Stack>
                <div>
                    <h3>{flightFormattedPrice ?? "$-"}</h3>
                    <p>{toSentence(query?.trip)}</p>
                </div>
            </Stack>
            <div>
                <p className="text-muted">{toSentence(query?.cabinClass)} Class</p>
            </div>
            <Stack direction={"row"} justifyContent={"space-between"} className="mt-3">
                <div>
                    {leg.destination.stopCount > 0 && <p className="mb-0">{leg.destination.stopCount ?? "0"} stop in {leg.destination.displayCode} . {formatDuration(leg.durationInMinutes)}</p>}
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <AirplanemodeActiveIcon />
                        <p>{leg.carriers.marketing[0].name}</p>
                    </Stack>
                </div>
            </Stack>
        </Box>
    )
}



export function FlightSearchResults({
    results,
}) {
    const { setFlight } = useChoosenFlight();
    const { itineraries } = results;
    const handleClick = useCallback((itenirary) => {
        if (itenirary) {
            setFlight(itenirary);
        }
    }, [setFlight]);

    useEffect(() => {
        // if the id is passed through a GET parameter, auto get and assign that flight (incase of a sharable link functionality).
        const id = new URLSearchParams(window.location.search).get("c");
        if (id) {
            const itenirary = getItinerary(id, itineraries);
            if (itenirary) {
                setFlight(itenirary);
            }
        }
    }, [setFlight, itineraries]);

    return (itineraries?.length > 0) ? (
        <>
            <h3>Top Departing Flights</h3>
            <p>Ranked based on price and convenience</p>
            <Stack direction="column" spacing={2}>
                <Paginated
                    itemsPerPage={5}
                    items={itineraries}
                    render={(result, i) => (
                        <SearchResult
                            key={i}
                            onClick={handleClick}
                            data={result}
                        />
                    )}
                />
            </Stack>
        </>
    ) : (
        <div>
            <h3>No Results</h3>
            <p>We couldn't find any flight with your current search options.</p>
        </div>
    );
}



export function DetailedFlight({
    sessionId,
}) {

    const { setFlight, flight } = useChoosenFlight();
    const { data, isLoading, error } = useQuery({
        queryKey: [`${flight.id}-${sessionId}`],
        queryFn: () => getFlightDetails({
            sessionId,
            itineraryId: flight.id,
            legs: JSON.stringify(formatLegs(flight.legs))
        }),
    });

    if (isLoading) {
        return (
            <FlightSkeleton />
        );
    } else if (error || !data?.data.itinerary) {
        return (
            <div>
                <h1>Ooops! Something went wrong</h1>
            </div>
        );
    }

    const leg = data?.data.itinerary.legs[0];
    return (
        <>
            <div
                style={{
                    backgroundColor: "var(--amt-secondary)",
                    borderRadius: "1em"
                }}
                className='result-container'
            >
                <Stack direction="column">
                    <Stack
                        sx={{ padding: "0em 1em 0em 1em", borderBottom: "1px solid var(--amt-secondary)" }}
                        direction="row"
                        spacing={5}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <Stack direction="row" spacing={2}>
                            <FlightTakeoff />
                            <p>Departing Flight - {formatShortDate(leg.departure)}</p>
                        </Stack>
                        <IconButton onClick={() => setFlight(null)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <SearchResult
                        data={flight}
                        style={{
                            borderRadius: 0,
                            backgroundColor: "transparent"
                        }}
                    />
                    <FlightDetailsAccordion
                        leg={leg}
                        carrierSafetyAttrs={data.data.itinerary.operatingCarrierSafetyAttributes[0]}
                    />
                </Stack>
            </div>
            <ReturningFlights />
        </>
    )
}


