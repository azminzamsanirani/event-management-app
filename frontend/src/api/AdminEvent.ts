import axios from "axios";
import { Event } from "../utils/Types";

const API_URL = import.meta.env.VITE_API_URL;

export const getAdminEvents = async (): Promise<Event[]> => {
    try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        const response = await axios.get<{ data: Event[] }>(`${API_URL}/events`, {
            headers: {
                Authorization: `Bearer ${token}`, // Attach Bearer token
            },
        });

        return response.data.data;
    } catch (error) {
        console.error("Error fetching admin events:", error);
        return [];
    }
};

// Create event request
export const createAdminEvent = async (eventData: FormData): Promise<Event | null> => {
    try {
        const token = localStorage.getItem("token");

        // Convert startDate & endDate to correct format
        const formattedStartDate = `${eventData.get("startDate")}:00.000Z`;
        const formattedEndDate = `${eventData.get("endDate")}:00.000Z`;

        // Append formatted dates to FormData
        eventData.set("startDate", formattedStartDate);
        eventData.set("endDate", formattedEndDate);

        const response = await axios.post(`${API_URL}/events`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data", // Required for file upload
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating event:", error);
        return null;
    }
};

// Delete event request
export const deleteEvent = async (eventId: string, password: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`${API_URL}/events/${eventId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: { password },
        });
        return response.data;
    } catch (error) {
        console.error("Error deleting event:", error);
        throw error;
    }
};

// Edit event request
export const editAdminEvent = async (eventId: string, eventData: FormData): Promise<Event | null> => {
    try {
        console.log("eventId : ", eventId)
        console.log("eventData : ", eventData)
        const token = localStorage.getItem("token");

        // Convert startDate & endDate to correct format
        const formattedStartDate = `${eventData.get("startDate")}:00.000Z`;
        const formattedEndDate = `${eventData.get("endDate")}:00.000Z`;

        // Append formatted dates to FormData
        eventData.set("startDate", formattedStartDate);
        eventData.set("endDate", formattedEndDate);

        const response = await axios.patch(`${API_URL}/events/${eventId}`, eventData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating event:", error);
        return null;
    }
};