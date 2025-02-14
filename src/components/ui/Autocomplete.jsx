import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash-es';
import { useQuery } from 'react-query';
import axios from 'axios';
import { RAPID_API_HEADERS } from '../helpers/constants';
import { FormControl } from '@mui/material';

const FieldError = lazy(() => import("./FieldError"))

async function getAirportDetails(term) {
    const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${term}`,
        {
            headers: RAPID_API_HEADERS
        }
    );
    return response.data;
}

export default function AirportSelect({
    initialOptions = [],
    label,
    value,
    onSelect,
    error
}) {
    const [options, setOptions] = useState(initialOptions);
    const [term, setTerm] = useState("");
    const { data, isLoading } = useQuery({
        queryKey: [`autocomplete-${label}`, term],
        queryFn: () => getAirportDetails(term),
        enabled: !!term
    });


    const handleSearch = useCallback(
        debounce(async (term) => {

            if (!term) return;
            setTerm(term);
        }
            , 300)
        , []);

    useEffect(() => {
        if (data?.data) {
            setOptions(data.data);
        }
    }, [data]);

    return (
        <FormControl
            sx={{
                minWidth: 120,
                flexGrow: 1,
            }}
            error={!!error}
        >
            <Autocomplete
                options={options ?? []}
                autoHighlight
                value={value ?? null}
                loading={isLoading}
                loadingText={"Fetching Airports..."}
                onChange={(e, value) => (onSelect && onSelect(value))}
                onInputChange={(event) => event?.target.value && handleSearch(event.target.value)}
                getOptionLabel={getOptionLabel}
                renderOption={(props, option) => {
                    if (!option) return;
                    const { key, ...optionProps } = props;
                    return (
                        <Box
                            key={key}
                            component="li"
                            sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                            {...optionProps}
                        >
                            {getOptionLabel(option)}
                        </Box>
                    );
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={label}
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                autoComplete: 'new-password', // disable autocomplete and autofill
                            },
                        }}
                    />
                )}
            />
            {error &&
                <Suspense>
                    <FieldError>
                        {error.message}
                    </FieldError>
                </Suspense>
            }
        </FormControl>
    );
}


function getOptionLabel(option) {
    if (!option) return "";
    const { presentation } = option;
    return `${presentation.title} (${option.skyId})`;
}