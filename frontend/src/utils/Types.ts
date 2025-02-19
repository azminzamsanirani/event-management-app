// Type for submitting the form (no id)
export interface EventFormData {
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  thumbnail?: FileList;
  status: "Ongoing" | "Completed";
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
