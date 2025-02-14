import { Skeleton } from "@mui/material";

export function SearchFlightsSkeleton() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
            <Skeleton width="5em" height="3em" sx={{ margin: 0 }} />
            <Skeleton width="10em" height="2em" sx={{ margin: 0 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
                {Array.from({ length: 5 }, (_, i) => (
                    <FlightSkeleton key={i}/>
                ))}
            </div>
        </div>
    );
}


export function FlightSkeleton() {
    return (
        <Skeleton
            sx={{
                width: "100%",
                height: "200px",
                borderRadius: "1em",
                margin: 0, // Ensure no extra spacing
                display: "block", // Remove any inline element spacing
            }}
        />
    );
}