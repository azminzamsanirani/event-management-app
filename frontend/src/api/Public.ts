import axios from "axios";
import { Event } from "../utils/Types";

const API_URL = import.meta.env.VITE_API_URL;

export const getPublicEvents = async (): Promise<Event[]> => {
    try {
        const response = await axios.get(`${API_URL}/public/events`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching public events:", error);
        return [];
    }
};