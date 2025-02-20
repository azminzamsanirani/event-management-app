import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Avatar,
  Container,
  TableSortLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { getPublicEvents } from "../../api/Public";
import { Event } from "../../utils/Types";
import "../../styles/pages/public/UserEvents.scss";
import EventDetailsPopup from "../../components/public/EventDetailsPopup";

const API_URL = import.meta.env.VITE_API_URL;

const UserEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState<string>("");
  const [sortBy, setSortBy] = useState<"startDate" | "endDate" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getPublicEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event);
    setPopupOpen(true);
  };

  const handleSort = (column: "startDate" | "endDate") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (!sortBy) return 0;
    const dateA = new Date(a[sortBy]).getTime();
    const dateB = new Date(b[sortBy]).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const filteredEvents = sortedEvents.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || event.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container className="user-events-container">
      <Container className="user-events-container-inside">
        <Typography variant="h4" className="events-title">
          User Events
        </Typography>

        <div className="filters-container">
          <TextField
            label="Search Events"
            variant="outlined"
            fullWidth
            className="search-bar"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Ongoing">Ongoing</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </div>

        <TableContainer component={Paper} className="user-events-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Thumbnail</TableCell>
                <TableCell>Event Name</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "startDate"}
                    direction={sortOrder}
                    onClick={() => handleSort("startDate")}
                    IconComponent={
                      sortOrder === "asc" ? ArrowUpward : ArrowDownward
                    }
                  >
                    Start Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={sortBy === "endDate"}
                    direction={sortOrder}
                    onClick={() => handleSort("endDate")}
                    IconComponent={
                      sortOrder === "asc" ? ArrowUpward : ArrowDownward
                    }
                  >
                    End Date
                  </TableSortLabel>
                </TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id} onClick={() => handleRowClick(event)} style={{ cursor: "pointer" }}>
                  <TableCell className="thumbnail-cell">
                    <Avatar
                      src={`${API_URL}${event.thumbnail}`}
                      alt={event.name}
                      sx={{ width: 100, height: 100 }}
                      className="event-thumbnail"
                    />
                  </TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>
                    {new Date(event.startDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {new Date(event.endDate).toLocaleString()}
                  </TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell
                    style={{
                      color:
                        event.status === "Completed"
                          ? "#008000"
                          : event.status === "Ongoing"
                          ? "#FFBF00"
                          : "black",
                    }}
                  >
                    {event.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EventDetailsPopup open={isPopupOpen} handleClose={() => setPopupOpen(false)} event={selectedEvent} />
            
      </Container>
    </Container>
  );
};

export default UserEvents;
