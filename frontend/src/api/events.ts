import axios from "axios";
import { Event } from "../utils/Types";

const API_URL = "http://localhost:3000/public/events";

export const fetchEvents = async (): Promise<Event[]> => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export const fetchEventDetails = async (id: string): Promise<Event> => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createEvent = async (formData: FormData) => {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("No authentication token found");

    const response = await fetch("http://localhost:3000/events", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData, // Sending multipart/form-data automatically
    });

    if (!response.ok) {
        const errorMessage = await response.text(); // Capture detailed error
        throw new Error(`Failed to create event: ${errorMessage}`);
    }

    return response.json();
};

export const updateEvent = async ({ id, formData }: { id: string; formData: FormData }) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`http://localhost:3000/events/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData, // Use FormData to support image upload
    });

    if (!response.ok) throw new Error("Failed to update event");
    return response.json();
};

