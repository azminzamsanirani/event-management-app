import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Avatar,
  Container,
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Event } from "../../utils/Types";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import "../../styles/components/admin/AdminEventTable.scss";
import DeleteEventPopup from "./AdminDeleteEvent";
import AdminEditEvent from "./AdminEditEvent";

interface Props {
  events: Event[];
  onRefresh: () => void;
}

const API_URL = import.meta.env.VITE_API_URL;

const AdminEventTable = ({ events, onRefresh }: Props) => {
  const [search, setSearch] = useState<string>("");
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"startDate" | "endDate" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Ongoing" | "Completed"
  >("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);

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

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <>
      <TableContainer component={Paper} className="admin-event-table">
        <Container className="filters-container">
          <TextField
            label="Search Events"
            variant="outlined"
            fullWidth
            className="search-bar"
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Status Filter Dropdown */}
          <Container className="status-filter-container">
            <FormControl variant="outlined" className="status-filter">
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value as "All" | "Ongoing" | "Completed"
                  )
                }
                label="Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </FormControl>
          </Container>
        </Container>

        <Table className="event-table">
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="table-header-cell">Thumbnail</TableCell>
              <TableCell className="table-header-cell">Event Name</TableCell>
              <TableCell className="table-header-cell">
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
              <TableCell className="table-header-cell">
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
              <TableCell className="table-header-cell">Location</TableCell>
              <TableCell className="table-header-cell">Status</TableCell>
              <TableCell className="table-header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEvents.map((event) => (
              <TableRow key={event.id} className="event-row">
                <TableCell className="thumbnail-cell">
                  <Avatar
                    src={`${API_URL}${event.thumbnail}`}
                    alt={event.name}
                    sx={{ width: 100, height: 100 }}
                    className="event-thumbnail"
                  />
                </TableCell>
                <TableCell className="event-name">{event.name}</TableCell>
                <TableCell className="event-date">
                  {formatDateTime(event.startDate)}
                </TableCell>
                <TableCell className="event-date">
                  {formatDateTime(event.endDate)}
                </TableCell>
                <TableCell className="event-location">
                  {event.location}
                </TableCell>
                <TableCell
                  className={`event-status ${event.status.toLowerCase()}`}
                >
                  {event.status}
                </TableCell>
                <TableCell className="event-actions">
                  <Container className="event-actions-container">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        setSelectedEvent(event);
                        setIsEditPopupOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      className="delete-btn"
                      onClick={() => {
                        setSelectedEventId(event.id);
                        setIsDeletePopupOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Container>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Popup */}
      {selectedEventId && (
        <DeleteEventPopup
          eventId={selectedEventId}
          open={isDeletePopupOpen}
          onClose={() => setIsDeletePopupOpen(false)}
          onDeleteSuccess={() => {
            setIsDeletePopupOpen(false); // ✅ Close the popup
            onRefresh(); // ✅ Refresh event list
          }}
        />
      )}

      {/* Edit Event Popup */}
      {selectedEvent && (
        <AdminEditEvent
          event={selectedEvent}
          open={isEditPopupOpen}
          onClose={() => setIsEditPopupOpen(false)}
          onUpdateSuccess={() => {
            setIsEditPopupOpen(false);
            onRefresh();
          }}
        />
      )}
    </>
  );
};

export default AdminEventTable;
