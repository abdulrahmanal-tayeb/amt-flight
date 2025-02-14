import { create } from "zustand";


export const useFlightQuery = create((set) => ({
    query: null,
    setQuery: (query) => (set((state) => ({query})))
}));


export const useChoosenFlight = create((set) => ({
    flight: null,
    setFlight: (flight) => (set((state) => ({flight})))
}));