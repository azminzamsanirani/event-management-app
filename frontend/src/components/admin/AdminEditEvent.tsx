import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  DialogActions,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { editAdminEvent } from "../../api/AdminEvent";
import { Event } from "../../utils/Types";

interface Props {
  event: Event;
  open: boolean;
  onClose: () => void;
  onUpdateSuccess: () => void;
}

const AdminEditEvent = ({ event, open, onClose, onUpdateSuccess }: Props) => {
  const [eventData, setEventData] = useState<Omit<Event, "thumbnail">>({
    id: event.id,
    name: event.name,
    startDate: event.startDate
      ? new Date(event.startDate).toISOString().slice(0, 16)
      : "",
    endDate: event.endDate
      ? new Date(event.endDate).toISOString().slice(0, 16)
      : "",
    location: event.location,
    status: event.status,
  });

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    event.thumbnail ? `${import.meta.env.VITE_API_URL}${event.thumbnail}` : null
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (
    e: SelectChangeEvent<"Ongoing" | "Completed">
  ) => {
    setEventData({
      ...eventData,
      status: e.target.value as "Ongoing" | "Completed",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("startDate", eventData.startDate);
    formData.append("endDate", eventData.endDate);
    formData.append("location", eventData.location);
    formData.append("status", eventData.status);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    } else if (preview) {
      formData.append("thumbnail", preview); // Retain existing thumbnail
    } else {
      formData.append("thumbnail", ""); // Ensure field exists
    }

    try {
      await editAdminEvent(event.id, formData);
      alert("Event updated successfully!");
      onClose();
      onUpdateSuccess();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Event</DialogTitle>
      <DialogContent>
        <TextField
          label="Event Name"
          name="name"
          fullWidth
          value={eventData.name}
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          value={eventData.startDate}
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          value={eventData.endDate}
          onChange={handleInputChange}
          margin="dense"
        />
        <TextField
          label="Location"
          name="location"
          fullWidth
          value={eventData.location}
          onChange={handleInputChange}
          margin="dense"
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={eventData.status}
            onChange={handleSelectChange}
          >
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: 10 }}
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            style={{
              marginTop: 10,
              width: "100%",
              maxHeight: 200,
              objectFit: "cover",
            }}
            onError={() => setPreview(null)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminEditEvent;
