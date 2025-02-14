import { useQuery } from "react-query";
import { useChoosenFlight, useFlightQuery } from "../helpers/stores";
import { getAirportDetails, getFlightDetails, getFlights } from "./utils";
import { formatLegs } from "../helpers/helpers";


export function useFlightDetails({
    sessionId
}) {
    const { flight } = useChoosenFlight();
    const { data, isLoading, error } = useQuery({
        queryKey: [`${flight.id}`],
        queryFn: () => getFlightDetails({
            sessionId,
            itineraryId: flight.id,
            legs: JSON.stringify(formatLegs(flight.legs))
        }),
    });

    return { data, isLoading, error };
}


export function useReturningFlights() {
    const { query } = useFlightQuery();
    const { flight } = useChoosenFlight();

    const { data, isLoading, error } = useQuery({
        queryKey: [`${flight.id}-returning`],
        queryFn: () => getFlights(query, true),
    });

    return { data, isLoading, error };
}


export function useFlights() {
    const { query } = useFlightQuery();
    const { data, isLoading, error } = useQuery({
        queryKey: [`searchFlight-${window.location.search}`],
        queryFn: () => getFlights(query),
        enabled: !!query,
        refetchOnWindowFocus: false
    });

    return { data, isLoading, error };
}


export function useAirport({ label, term }) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`autocomplete-${label}`, term],
        queryFn: () => getAirportDetails(term),
        enabled: !!term
    });

    return { data, isLoading, error };
}