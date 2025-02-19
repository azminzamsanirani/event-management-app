import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/events";
import { Link } from "react-router-dom";
import { Event } from "../utils/Types";
import { Container, Box, Card, CardMedia, CardContent, Typography, CircularProgress } from "@mui/material";

const Events = () => {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {events?.map((event) => (
          <Card key={event.id} sx={{ maxWidth: 300 }}>
            <Link to={`/events/${event.id}`} style={{ textDecoration: "none" }}>
              <CardMedia component="img" height="200" image={event.thumbnail} alt={event.name} />
              <CardContent>
                <Typography variant="h6">{event.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.location} | {new Date(event.startDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Link>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Events;
