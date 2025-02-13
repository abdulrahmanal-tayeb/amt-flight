import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import CircleIcon from '@mui/icons-material/Circle';
import CloseIcon from '@mui/icons-material/Close';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Select from "../ui/Select";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, IconButton, Stack, Typography } from "@mui/material";
import AirportSelect from "../ui/Autocomplete";
import DatePicker from "../ui/DatePicker";
import SearchIcon from '@mui/icons-material/Search';
import { FlightTakeoff } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Paginated } from './utils';
import { toSentence, formatDuration, formatLegs, formatShortDate, formatTime, objectToSearchParams } from '../helpers/helpers';
import { getFlightDetails, getFlights, getItinerary } from '../helpers/flights';
import OptionsMenu from '../ui/OptionsMenu';


export function SearchAndFilter({
    values,
    search = true
}) {

    const { control, handleSubmit } = useForm({
        defaultValues: values ?? {
            trip: "roundTrip",
            cabinClass: "economy",
            dep: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            arr: new Date(Date.now() + 7 * 2 * 24 * 60 * 60 * 1000),
            adults: 0
        }
    });

    const navigate = useNavigate();

    // Rapid API doesn't support this option, so it will be used as is in every result.
    const roundTripOptions = useMemo(() => ([
        { label: "Round Trip", value: "roundTrip" },
        { label: "One Way", value: "oneWay" },
        { label: "Multi City", value: "multiCity" },
    ]), []);

    const classOptions = useMemo(() => ([
        { label: "Economy", value: "economy" },
        { label: "Premium Economy", value: "premium_economy" },
        { label: "Business", value: "business" },
        { label: "First", value: "first" },
    ]), []);


    const handleSearch = useCallback((values) => {
        navigate(`/flights/search/?${objectToSearchParams(values)}`, {
            state: values
        });
    }, []);


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
                    }}
                >

                    {/* Trip Options */}
                    <Stack
                        className="col-12"
                        direction="row"
                        spacing={1}
                        sx={{
                            flexWrap: "wrap",
                            gap: 2
                        }}
                    >
                        {[
                            {
                                label: "Round Trip",
                                options: roundTripOptions,
                                name: "trip",
                                defaultValue: "r"
                            },
                            {
                                label: "Cabin Class",
                                options: classOptions,
                                name: "cabinClass",
                                defaultValue: 1
                            }
                        ].map((selectProps, i) => (
                            <Controller
                                key={i}
                                name={selectProps.name}
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Select
                                            {...field}
                                            value={field.value}
                                            error={fieldState.error}
                                            {...selectProps}
                                            onChange={(value) => field.onChange(value)}
                                        />
                                    </>
                                )}
                            />
                        ))}
                        <Controller
                            name={"adults"}
                            control={control}
                            render={({ field, fieldState }) => (
                                <>
                                    <OptionsMenu
                                        onChange={(adults) => field.onChange(adults)}
                                    />
                                </>
                            )}
                        />
                    </Stack>

                    <Stack
                        className="col-12 mt-3 amt-flex-grow"
                        direction={"row"}
                        spacing={2}
                        sx={{
                            flexWrap: "wrap",
                            gap: 2
                        }}
                    >
                        {/* Airports Details */}
                        <Stack alignItems={"center"} divider={<NavigateNextIcon/>} direction="row" spacing={2}>
                            {[
                                {
                                    label: "From",
                                    src: "",
                                    name: "origin",
                                    defaultValue: ""
                                },
                                {
                                    label: "To",
                                    src: "",
                                    name: "destination",
                                    defaultValue: ""
                                }
                            ].map((autoCompleteProps, i) => (
                                <Controller
                                    key={i}
                                    name={autoCompleteProps.name}
                                    control={control}
                                    render={({ field, fieldState }, i) => (
                                        <>
                                            <AirportSelect
                                                {...autoCompleteProps}
                                                value={field.value}
                                                onSelect={(value) => field.onChange(value)}
                                            />
                                        </>
                                    )}
                                />
                            ))}
                        </Stack>

                        {/* Date and Time */}
                        <Stack direction="row" spacing={2}>
                            {[
                                {
                                    label: "Departure",
                                    name: "dep",
                                    defaultValue: ""
                                },
                                {
                                    label: "Arrival",
                                    name: "arr",
                                    defaultValue: ""
                                }
                            ].map((dateProps, i) => (
                                <Controller
                                    key={i}
                                    name={dateProps.name}
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <>
                                            <DatePicker
                                                {...field}
                                                {...dateProps}
                                                value={field.value}
                                                onChange={(value) => field.onChange(value.toDate())}
                                            />
                                        </>
                                    )}
                                />
                            ))}
                        </Stack>
                    </Stack>

                    {/* Search Button */}
                    {search && <Container
                        className="mt-3 col-12 amt-flex amt-flex-center"
                    >
                        <Button
                            className="shadow"
                            startIcon={<SearchIcon />}
                            variant="contained"
                            sx={{
                                borderRadius: "2em",
                                bgColor: "blue",
                                transform: "translateY(2.5em)",
                                height: "45px"
                            }}
                            onClick={handleSubmit(handleSearch)}
                        >
                            Search
                        </Button>
                    </Container>}
                </Box>
            </form>
        </Container>
    )
}

export function SearchResult({
    style = {},
    data,
    onClick,
    cabinClass,
    trip
}) {

    const {
        price: {
            formatted: flightFormattedPrice
        },
        legs,
        tags
    } = data;

    console.log("TAGS: ", tags);
    const firstLeg = legs[0];

    return (
        <Box
            onClick={() => onClick && onClick(data)}
            className="result-container"
            sx={{
                width: "100%",
                padding: "1em",
                backgroundColor: "var(--amt-secondary)",
                borderRadius: "1em",
                ...style
            }}
        >
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <div>
                        <h3 className="mb-0">{formatTime(firstLeg.departure)} </h3>
                        <small>{formatShortDate(firstLeg.departure)}</small>
                        <p style={{ fontSize: "0.7em" }}>{firstLeg.origin.city} ({firstLeg.origin.displayCode})</p>
                    </div>
                    <h3><ArrowRightAltIcon /></h3>
                    <div>
                        <h3 className="mb-0"> {formatTime(firstLeg.arrival)}</h3>
                        <small>{formatShortDate(firstLeg.arrival)}</small>
                        <p style={{ fontSize: "0.7em" }}>{firstLeg.destination.city} ({firstLeg.destination.displayCode})</p>
                    </div>
                </Stack>
                <div>
                    <h3>{flightFormattedPrice}</h3>
                    <p>{toSentence(trip)}</p>
                </div>
            </Stack>
            <div>
                <p className="text-muted">{toSentence(cabinClass)} Class</p>
            </div>
            <Stack direction={"row"} justifyContent={"space-between"} className="mt-3">
                <div>
                    {firstLeg.destination.stopCount > 0 && <p className="mb-0">{firstLeg.destination.stopCount ?? "0"} stop in {firstLeg.destination.displayCode} . {formatDuration(firstLeg.durationInMinutes)}</p>}
                    <Stack direction="row" spacing={2}>
                        <AirplanemodeActiveIcon />
                        <p>{firstLeg.carriers.marketing[0].name}</p>
                    </Stack>
                </div>
                {tags && <Stack direction="row" divider={"|"} spacing={2}>
                    {
                        tags.map((tag, i) => (
                            <div key={i}>
                                <p className='text-muted'>{toSentence(tag)}</p>
                            </div>
                        ))
                    }
                </Stack>}
            </Stack>
        </Box>
    )
}



export function FlightSearchResults({
    results,
    setChoosen,
    flightsQuery
}) {
    const { itineraries } = results;
    const handleClick = useCallback((itenirary) => {
        if (itenirary) {
            setChoosen(itenirary);
        }
    }, []);

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("c");
        if (id) {
            const itenirary = getItinerary(id, itineraries);
            if (itenirary) {
                setChoosen(itenirary);
            }
        }
    }, []);

    return itineraries ? (
        <Stack direction="column" spacing={2}>
            <Paginated
                itemsPerPage={5}
                items={itineraries}
                render={(result, i) => (
                    <SearchResult
                        onClick={handleClick}
                        key={i}
                        data={result}
                        cabinClass={flightsQuery.cabinClass}
                        trip={flightsQuery.trip}
                    />
                )}
            />
        </Stack>
    ) : (
        <h1>No Results</h1>
    );
}



export function DetailedFlight({
    itineraryData,
    onClose,
    sessionId,
    flightsQuery
}) {

    const { data, isLoading, error } = useQuery({
        queryKey: [`${itineraryData.id}-${sessionId}`],
        queryFn: () => getFlightDetails({
            sessionId,
            itineraryId: itineraryData.id,
            legs: JSON.stringify(formatLegs(itineraryData.legs))
        }),
    });

    const { data: returningFlights, isLoading: isLoadingReturningFlights } = useQuery({
        queryKey: [`${itineraryData.id}-${sessionId}-returning`],
        queryFn: () => getFlights(flightsQuery, true),
    });


    useEffect(() => {
        console.log("RE: ", returningFlights);
    }, [returningFlights]);

    if (isLoading) {
        return <h1>Loading...</h1>
    } else if (error || !data?.data.itinerary) {
        return <h1>Something went wrong :(</h1>
    }

    const firstLeg = data?.data.itinerary.legs[0];
    return (
        <>
            <div style={{
                backgroundColor: "var(--amt-secondary)",
                borderRadius: "1em"
            }} className='result-container'>
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
                            <p>Departing Flight - {formatShortDate(firstLeg.departure)}</p>
                        </Stack>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <SearchResult
                        data={itineraryData}
                        cabinClass={flightsQuery.cabinClass}
                        trip={flightsQuery.trip}
                        style={{
                            borderRadius: 0,
                            backgroundColor: "transparent"
                        }}
                    />
                    <Accordion
                        sx={{
                            boxShadow: "none",
                            border: "none",
                            backgroundColor: "transparent",
                            borderBottomLeftRadius: "1em",
                            borderBottomRightRadius: "1em"
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
                                Flight Details
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="column" spacing={"3%"}>
                                <Stack direction="row" spacing={3} alignItems="flex-start">
                                    <p><CircleIcon /></p>
                                    <div>
                                        <h3>{formatTime(firstLeg.departure)}</h3>
                                        <p className='mb-0'>{firstLeg.origin.name}</p>
                                        <p className='text-muted'>Travel time: {formatDuration(firstLeg.duration)}</p>
                                    </div>
                                </Stack>
                                <Stack direction="row" spacing={3} alignItems="flex-start">
                                    <p><CircleIcon /></p>
                                    <div>
                                        <h3>{formatTime(firstLeg.arrival)}</h3>
                                        <p>{firstLeg.destination.name}</p>
                                    </div>
                                </Stack>
                            </Stack>
                            <div className='mt-5'>
                                <h4>Carrier Details</h4>
                                <hr />
                                <Stack direction="row" spacing={2} alignItems={"center"}>
                                    <img width={20} height={20} src={firstLeg.segments[0].operatingCarrier.logo} alt={"operating carrier"} />
                                    <p>{firstLeg.segments[0].operatingCarrier.name}</p>
                                    <p>{firstLeg.segments[0].operatingCarrier.displayCode}</p>
                                </Stack>
                                <div className='mt-5'>
                                    <p>Safety Attributes</p>
                                    <hr />
                                    <div className="mt-3">
                                        {Object.entries(data.data.itinerary.operatingCarrierSafetyAttributes[0]).map(([key, value], i) => {
                                            if (value === null) {
                                                value = "-";
                                            }

                                            return <p>
                                                <strong>{toSentence(key)}</strong> : <span>{value}</span>
                                            </p>
                                        })}
                                    </div>
                                </div>

                            </div>
                        </AccordionDetails>
                    </Accordion>
                </Stack>
            </div>
            <div className="mt-5">
                <h3>Returning Flights</h3>

                <div className='mt-3'>
                    {returningFlights?.data?.itineraries &&
                        <Stack direction="column" spacing={2}>
                            <Paginated
                                itemsPerPage={5}
                                items={returningFlights.data.itineraries}
                                render={(result, i) => (
                                    <SearchResult
                                        trip={flightsQuery.trip}
                                        key={i}
                                        data={result}
                                        cabinClass={flightsQuery.cabinClass}
                                        onClick={() => { }}
                                    />
                                )}
                            />
                        </Stack>
                    }
                </div>
            </div>
        </>
    )
}


