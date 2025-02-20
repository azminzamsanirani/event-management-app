import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import { createAdminEvent } from "../../api/AdminEvent";
import { EventForm } from "../../utils/Types";

interface Props {
  onClose: () => void;
}

const AdminEventForm = ({ onClose }: Props) => {
  const [eventData, setEventData] = useState<Omit<EventForm, "thumbnail">>({
    name: "",
    startDate: "",
    endDate: "",
    location: "",
    status: "Ongoing",
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle input changes for text fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); // Preview Image
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!thumbnail) {
      alert("Please select a thumbnail image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("location", eventData.location);
    formData.append("status", "Ongoing");
    formData.append("thumbnail", thumbnail);

    try {
      await createAdminEvent(formData);
      alert("Event created successfully!");
      onClose();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event.");
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          name="name"
          fullWidth
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          onChange={handleInputChange}
          margin="dense"
        />
        <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: 10 }} />
        {preview && <img src={preview} alt="Preview" style={{ marginTop: 10, width: "100%", maxHeight: 200, objectFit: "cover" }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEventForm;
