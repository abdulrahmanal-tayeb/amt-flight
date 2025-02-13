import { Stack } from "@mui/material";
import { Controller } from "react-hook-form";
import Select from "../../ui/Select";
import OptionsMenu from "../../ui/OptionsMenu";
import AirportSelect from "../../ui/Autocomplete";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import DatePicker from "../../ui/DatePicker";
import { useMemo } from "react";

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
                        defaultValue: "r"
                    },
                    {
                        name: "adults",
                        render: ({ field, fieldState }) => (
                            <>
                                <OptionsMenu
                                    {...field}
                                    onChange={(adults) => field.onChange(adults)}
                                />
                            </>
                        )
                    },
                    {
                        label: "Cabin Class",
                        options: classOptions,
                        name: "cabinClass",
                        defaultValue: 1
                    },

                ].map((selectProps, i) => (
                    <Controller
                        key={i}
                        name={selectProps.name}
                        control={control}
                        render={selectProps.render ?? (({ field, fieldState }) => (
                            <>
                                <Select
                                    {...field}
                                    value={field.value}
                                    error={fieldState.error}
                                    {...selectProps}
                                    onChange={(value) => field.onChange(value)}
                                />
                            </>
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
                        defaultValue: "",
                        sx: {
                            borderLeft: "none"
                        }
                    },
                    {
                        label: "End",
                        name: "endDate",
                        defaultValue: "",
                        sx: {
                            borderRight: "none"
                        }
                    }
                ].map((dateProps, i) => (
                    <Controller
                        key={i}
                        name={dateProps.name}
                        control={control}
                        render={({ field }) => (
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
        </>
    )
}