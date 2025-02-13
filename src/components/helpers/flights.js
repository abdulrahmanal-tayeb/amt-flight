import axios from "axios";
import { RAPID_API_HEADERS } from "./constants";

export async function getFlights(data, returning = false) {
    if (!data) return;
    const {
        origin,
        destination,
        dep,
        arr,
        cabinClass,
        adults
    } = data;

    const url = new URL("https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights");
    const [originAirport, destinationAirport, date] = returning? [destination, origin, arr] : [origin, destination, dep];
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

    console.log("URL: ", url);
    const response = await axios.get(
        url,
        {
            headers: RAPID_API_HEADERS
        }
    )

    return response.data
}

