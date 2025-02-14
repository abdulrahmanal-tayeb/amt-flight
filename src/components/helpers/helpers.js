import dayjs from "dayjs";

// Function to format time in 12-hour format
export function formatTime(date) {
    if (!date) return "--:-- AM"
    let preparedDate = date;
    if (typeof (date) === "string") {
        preparedDate = new Date(preparedDate);
    }
    return dayjs(preparedDate).format("h:mm A"); // Example output: "3:45 PM"
}

export function formatShortDate(date) {
    if (!date) return ""
    let preparedDate = date;
    if (typeof (date) === "string") {
        preparedDate = new Date(preparedDate);
    }
    return dayjs(preparedDate).format("ddd, MMM D"); // Example output: "Mon, Feb 12"
}

// Function to format duration in a human-friendly way
export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let result = [];
    if (hours > 0) result.push(`${hours} hr`);
    if (remainingMinutes > 0) result.push(`${remainingMinutes} min`);

    return result.join(" ") || "0 min"; // Example output: "1 hr 30 min"
}


export function formatLegs(legs) {
    if(!legs) return {};
    return legs.map((leg) => (
        {
            origin: leg.segments[0].origin.parent.flightPlaceId,
            destination: leg.segments[0].destination.parent.flightPlaceId,
            date: leg.departure.split("T")[0]
        }
    ));
}

export function toSentence(text) {
    if(!text) return "";
    return text
        .replace(/[_-]/g, " ") // Replace underscores and hyphens with spaces
        .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
}

export function objectToSearchParams(object) {
    const url = new URLSearchParams(window.location.search);
    Object.entries(object).map(([key, value]) => {
        if(typeof(value) === "object"){
            return value.skyId && url.set(key, value.skyId)
        }
        return value && url.set(key, value);
    })

    return url.toString();
}