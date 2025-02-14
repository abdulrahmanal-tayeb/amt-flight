import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FormControl } from '@mui/material';
import { lazy, Suspense } from 'react';

const FieldError = lazy(() => import("./FieldError"));

export default function DatePicker({
    label,
    onChange,
    value,
    error
}) {
    return (
        <FormControl
            sx={{ minWidth: 120, flexGrow: 1 }}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MuiDatePicker
                    value={dayjs(value)}
                    label={label}
                    views={['month', 'day']}
                    onChange={onChange}
                />
            </LocalizationProvider>
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