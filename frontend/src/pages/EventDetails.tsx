import "../styles/AdminEvents.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEventDetails } from "../api/events";
import { Event } from "../utils/Types";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const EventDetails = () => {
  const { id } = useParams();
  const {
    data: event,
    isLoading,
    error,
  } = useQuery<Event | null>({
    queryKey: ["event", id],
    queryFn: () => fetchEventDetails(id!),
  });

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">Error loading event.</Typography>;
  if (!event) return <Typography color="error">Event not found.</Typography>;

  return (
    <Container>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardMedia
          component="img"
          height="300"
          image={event.thumbnail}
          alt={event.name}
        />
        <CardContent>
          <Typography variant="h4">{event.name}</Typography>
          <Typography variant="body1">📍 {event.location}</Typography>
          <Typography variant="body2">
            🗓 {new Date(event.startDate).toLocaleDateString()} -{" "}
            {new Date(event.endDate).toLocaleDateString()}
          </Typography>
          <Typography variant="h6" color="primary">
            Status: {event.status}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetails;
