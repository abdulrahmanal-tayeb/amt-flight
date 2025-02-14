import axios from "axios";
import { RAPID_API_HEADERS } from "../helpers/constants";

export async function getFlights(data, returning = false) {
    if (!data) return;
    const {
        origin,
        destination,
        startDate,
        endDate,
        cabinClass,
        adults
    } = data;

    const url = new URL("https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights");
    const [originAirport, destinationAirport, date] = returning ? [destination, origin, endDate] : [origin, destination, startDate];
    const preparedData = {
        originSkyId: originAirport.skyId,
        destinationSkyId: destinationAirport.skyId,
        originEntityId: originAirport.entityId,
        destinationEntityId: destinationAirport.entityId,
        date: date.toISOString().split("T")[0],
        cabinClass,
        adults
    }

    Object.entries(preparedData).forEach(([key, value]) => (
        value && url.searchParams.set(key, value)
    ));

    const response = await axios.get(
        url,
        {
            headers: RAPID_API_HEADERS
        }
    );

    return response.data;
}


export function getItinerary(id, itineraries) {
    return itineraries.find((it) => it.id === id);
}


export async function getFlightDetails(data) {
    const url = new URL("https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails");
    Object.entries(data).forEach(([key, value]) => (
        value && url.searchParams.set(key, value)
    ));

    const response = await axios.get(
        url,
        {
            headers: RAPID_API_HEADERS
        }
    )

    return response.data
}



export async function getAirportDetails(term) {
    const response = await axios.get(
        `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${term}`,
        {
            headers: RAPID_API_HEADERS
        }
    );
    return response.data;
}
