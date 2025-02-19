import "../styles/AdminEvents.scss";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/events";
import { Event } from "../utils/Types";
import CreateEventForm from "../components/CreateEventForm";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Modal,
} from "@mui/material";
import EditEventForm from "../components/EditEventForm";

const AdminEvents = () => {
  const {
    data: events,
    isLoading,
    error,
  } = useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Show loading state
  if (isLoading) return <CircularProgress />;

  // Show error message if fetching fails
  if (error)
    return (
      <Typography color="error">
        Error fetching events. Please try again.
      </Typography>
    );

  // Filter & Sort Logic
  const filteredEvents = events
    ?.filter(
      (event) =>
        event.name.toLowerCase().includes(search.toLowerCase()) &&
        (statusFilter ? event.status === statusFilter : true)
    )
    .sort((a, b) =>
      a[sortBy as keyof Event] > b[sortBy as keyof Event] ? 1 : -1
    );

  return (
    <Container>
      <h2>Manage Events</h2>

      {/* Create Event Form */}
      <CreateEventForm />

      {/* Search & Filters */}
      <TextField
        label="Search Events"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Ongoing">Ongoing</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="startDate">Start Date</MenuItem>
          <MenuItem value="location">Location</MenuItem>
        </Select>
      </FormControl>

      {/* Events Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents?.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>
                  {new Date(event.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Event Modal */}
      <Modal open={!!selectedEvent} onClose={() => setSelectedEvent(null)}>
        <div>
          {selectedEvent && (
            <EditEventForm
              event={selectedEvent}
              onClose={() => setSelectedEvent(null)}
            />
          )}
        </div>
      </Modal>
    </Container>
  );
};

export default AdminEvents;
