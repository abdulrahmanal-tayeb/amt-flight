import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from "@mui/material";
import { lazy, Suspense } from "react";

const FieldError = lazy(() => import("./FieldError"))

export default function Select({
    label,
    value,
    onChange,
    options,
    error,
    size = "small"
}) {
    return (
        <FormControl error={error} sx={{ m: 1, minWidth: 120, maxWidth: 150, flexGrow: 1, marginLeft: 0 }} size={size}>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <MuiSelect
                autoWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={onChange}
            >
                {(options?.length > 0) && options.map((option, i) => (
                    <MenuItem key={i} {...option}>{option.label}</MenuItem>
                ))}
            </MuiSelect>
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