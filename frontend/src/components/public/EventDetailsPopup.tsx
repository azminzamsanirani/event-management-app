import { Dialog, DialogTitle, DialogContent, Typography, Avatar } from "@mui/material";
import { Event } from "../../utils/Types";
import "../../styles/components/public/EventDetailsPopup.scss"

interface EventDetailsPopupProps {
  open: boolean;
  handleClose: () => void;
  event: Event | null;
}

const API_URL = import.meta.env.VITE_API_URL;

const EventDetailsPopup = ({ open, handleClose, event }: EventDetailsPopupProps) => {
  if (!event) return null;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="event-details-popup">
      <DialogContent className="popup-content">
        <Avatar
          src={`${API_URL}${event.thumbnail}`}
          alt={event.name}
          className="event-thumbnail"
        />
        <DialogTitle className="event-name">{event.name}</DialogTitle>
        <Typography className="event-detail"><b>Location:</b> {event.location}</Typography>
        <Typography className="event-detail"><b>Start Date:</b> {new Date(event.startDate).toLocaleString()}</Typography>
        <Typography className="event-detail"><b>End Date:</b> {new Date(event.endDate).toLocaleString()}</Typography>
        <Typography className={`event-status ${event.status.toLowerCase()}`}>
          <b>Status:</b> {event.status}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsPopup;
