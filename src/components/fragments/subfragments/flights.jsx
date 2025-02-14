import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from "../../ui/Select";
import OptionsMenu from "../../ui/OptionsMenu";
import AirportSelect from "../../ui/Autocomplete";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DatePicker from "../../ui/DatePicker";
import { useMemo } from "react";
import { SearchResult } from "../flights";
import { SearchFlightsSkeleton } from "../../loading/flights";
import { Paginated } from "../../utils/utils";
import { formatDuration, formatTime, toSentence } from "../../helpers/helpers";
import CircleIcon from '@mui/icons-material/Circle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useReturningFlights } from "../../api/flights";


export function TripOptions({ control }) {
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


    return (
        <>
            {/* Trip Options */}
            <Stack
                className="col-12"
                direction="row"
                alignItems={"center"}
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
                        defaultValue: "r",
                        rules: {
                            required: "Round Trip is required"
                        }
                    },
                    {
                        name: "adults",
                        render: ({ field, fieldState }) => (
                            <OptionsMenu
                                onChange={(adults) => field.onChange(adults)}
                            />
                        )
                    },
                    {
                        label: "Cabin Class",
                        rules: {
                            required: "Cabin class is required"
                        },
                        options: classOptions,
                        name: "cabinClass",
                        defaultValue: 1
                    },

                ].map((selectProps, i) => (
                    <Controller
                        key={i}
                        name={selectProps.name}
                        rules={selectProps.rules}
                        control={control}
                        render={selectProps.render ?? (({ field, fieldState }) => (
                            <Select
                                key={i}
                                value={field.value}
                                error={fieldState.error}
                                {...selectProps}
                                onChange={(value) => field.onChange(value)}
                            />
                        ))}
                    />
                ))}
            </Stack>
        </>
    )
}


export function AirportOptions({ control }) {
    return (
        <>
            {/* Airports Details */}
            <Stack
                alignItems={"center"}
                divider={<NavigateNextIcon sx={{ display: { xs: "none", md: "block" } }} />}
                direction="row"
                sx={{
                    flexWrap: "wrap",
                    gap: 2
                }}
            >
                {[
                    {
                        label: "From",
                        src: "",
                        rules: {
                            required: "Origin is required"
                        },
                        name: "origin",
                        defaultValue: ""
                    },
                    {
                        label: "To",
                        src: "",
                        rules: {
                            required: "Destination is required"
                        },
                        name: "destination",
                        defaultValue: ""
                    }
                ].map((autoCompleteProps, i) => (
                    <Controller
                        key={i}
                        name={autoCompleteProps.name}
                        rules={autoCompleteProps.rules}
                        control={control}
                        render={({ field, fieldState }, i) => (
                            <AirportSelect
                                {...autoCompleteProps}
                                value={field.value}
                                error={fieldState.error}
                                onSelect={(value) => field.onChange(value)}
                            />
                        )}
                    />
                ))}
            </Stack>
        </>
    )
}


export function DateOptions({ control }) {
    return (
        <>
            {/* Date and Time */}
            <Stack
                direction="row"
                className="amt-flex-grow"
                style={{ marginLeft: 0 }}
                sx={{
                    flexWrap: "wrap",
                    gap: 2
                }}
            >
                {[
                    {
                        label: "Start",
                        name: "startDate",
                        rules: {
                            required: "Start date is required"
                        },
                        defaultValue: "",
                        sx: {
                            borderLeft: "none"
                        }
                    },
                    {
                        label: "End",
                        name: "endDate",
                        rules: {
                            required: "End date is required"
                        },
                        defaultValue: "",
                        sx: {
                            borderRight: "none"
                        }
                    }
                ].map((dateProps, i) => (
                    <Controller
                        key={i}
                        rules={dateProps.rules}
                        name={dateProps.name}
                        control={control}
                        render={({ field, fieldState }) => (
                            <DatePicker
                                {...dateProps}
                                value={field.value}
                                error={fieldState.error}
                                onChange={(value) => field.onChange(value.toDate())}
                            />
                        )}
                    />
                ))}
            </Stack>
        </>
    )
}


export function ReturningFlights() {
    const { data: returningFlights, isLoading: isLoadingReturningFlights } = useReturningFlights();

    return isLoadingReturningFlights ?
        <div className='mt-5 result-container'>
            <SearchFlightsSkeleton />
        </div >
        :
        <div className="mt-5 result-container">
            <h3>Returning Flights</h3>

            <div className='mt-3'>
                {returningFlights?.data?.itineraries &&
                    <Stack direction="column" spacing={2}>
                        <Paginated
                            itemsPerPage={5}
                            items={returningFlights.data.itineraries}
                            sortOptions={[
                                { label: "Price Ascendently", value: "price" },
                                { label: "Price Descendantly", value: ".price" },
                            ]}
                            render={(result, i) => (
                                <SearchResult
                                    key={i}
                                    data={result}
                                    onClick={() => { }}
                                />
                            )}
                        />
                    </Stack>
                }
            </div>
        </div>


}


export function FlightDetailsAccordion({
    leg,
    carrierSafetyAttrs
}) {
    return (
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
                            <h3>{formatTime(leg.departure)}</h3>
                            <p className='mb-0'>{leg.origin.name}</p>
                            <p className='text-muted'>Travel time: {formatDuration(leg.duration)}</p>
                        </div>
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="flex-start">
                        <p><CircleIcon /></p>
                        <div>
                            <h3>{formatTime(leg.arrival)}</h3>
                            <p>{leg.destination.name}</p>
                        </div>
                    </Stack>
                </Stack>
                <div className='mt-5'>
                    <h4>Carrier Details</h4>
                    <hr />
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <img width={20} height={20} src={leg.segments[0].operatingCarrier.logo} alt={"operating carrier"} />
                        <p>
                            <a
                                href={`https://www.google.com/search?q=${leg.segments[0].operatingCarrier.name}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {leg.segments[0].operatingCarrier.name}
                            </a>
                        </p>
                        <p>{leg.segments[0].operatingCarrier.displayCode}</p>
                    </Stack>
                    <div className='mt-5'>
                        <p>Safety Attributes</p>
                        <hr />
                        <div className="mt-3">
                            {Object.entries(carrierSafetyAttrs).map(([key, value], i) => {
                                if (value === null) {
                                    value = <span style={{ color: "red" }}>No</span>;
                                }

                                return <p key={i}>
                                    <strong>{toSentence(key)}</strong> : <span>{value}</span>
                                </p>
                            })}
                        </div>
                    </div>

                </div>
            </AccordionDetails>
        </Accordion>
    )
}