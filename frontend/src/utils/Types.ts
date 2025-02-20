// Type for submitting the form (no id)
export interface EventForm {
  name: string;
  startDate: string; // ISO format
  endDate: string; // ISO format
  location: string;
  status: "Ongoing" | "Completed";
  thumbnail: string; // URL string for uploaded image
}


// Type for full event (including id for display)
export interface Event {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnail: string;
  status: "Ongoing" | "Completed";
}
