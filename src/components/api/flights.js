import { useQuery } from "react-query";
import { useChoosenFlight, useFlightQuery } from "../helpers/stores";
import { getAirportDetails, getFlightDetails, getFlights } from "./utils";
import { formatLegs } from "../helpers/helpers";


/**
 * Returns the details of a given flight id
 */
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


/**
 * Returns the flights returning to where the user was departuring from the `endDate`
 * specified by the user in the `SearchOptions`
 */
export function useReturningFlights() {
    const { query } = useFlightQuery();
    const { flight } = useChoosenFlight();

    const { data, isLoading, error } = useQuery({
        queryKey: [`${flight.id}-returning`],
        queryFn: () => getFlights(query, true),
    });

    return { data, isLoading, error };
}


/**
 * Searches for flights matching the specified options obtained from `SearchOptions`.
 */
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



/**
 * Searches and returns **Airport** data given a search term.
 */
export function useAirport({ label, term }) {
    const { data, isLoading, error } = useQuery({
        queryKey: [`autocomplete-${label}`, term],
        queryFn: () => getAirportDetails(term),
        enabled: !!term
    });

    return { data, isLoading, error };
}