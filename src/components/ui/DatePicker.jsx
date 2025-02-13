import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePicker({
    label,
    onChange,
    value
}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDatePicker
                value={dayjs(value)}
                sx={{maxWidth: 300, minWidth: 120, flexGrow: 1}}
                label={label}
                views={['month', 'day']}
                onChange={onChange}
                slotProps={{
                    textField: {
                        sx: {
                            marginLeft: 0
                        }
                    }
                }}
            />
        </LocalizationProvider>
    );
}