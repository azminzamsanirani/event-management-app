import { useState, useEffect } from "react";
import { Container, Typography, Button, Paper } from "@mui/material";
import "../../styles/pages/admin/AdminEvents.scss"
import AdminEventTable from "../../components/admin/AdminEventTable";
import AdminEventForm from "../../components/admin/AdminEventForm";
import { getAdminEvents } from "../../api/AdminEvent";
import { Event } from "../../utils/Types";

const AdminEvents = () => {
  const [openForm, setOpenForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [refresh, setRefresh] = useState(false); // ✅ Trigger re-fetch

  useEffect(() => {
    // Fetch events when refresh state changes
    const fetchEvents = async () => {
      const data = await getAdminEvents();
      setEvents(data);
    };

    fetchEvents();
  }, [refresh]); // ✅ Re-fetch when refresh changes

  return (
    <Container className="admin-events" maxWidth={false}>
      <Container className="admin-events-inside" maxWidth="xl">
        <Paper elevation={6} className="admin-events-container">
          <Typography variant="h5" className="admin-events-title">
            Admin - Event Management
          </Typography>

          <div className="admin-events-actions">
            <Button 
              variant="contained"
              className="create-event-btn"
              onClick={() => setOpenForm(true)}
            >
              + Create New Event
            </Button>
          </div>

          {/* ✅ Pass events & refresh function to trigger update */}
          <AdminEventTable events={events} onRefresh={() => setRefresh(prev => !prev)} />

          {/* ✅ Pass setRefresh to trigger re-fetch on form close */}
          {openForm && (
            <AdminEventForm 
              onClose={() => {
                setOpenForm(false);
                setRefresh(prev => !prev); // Toggle refresh to trigger useEffect
              }} 
            />
          )}
        </Paper>
      </Container>
    </Container>
  );
};

export default AdminEvents;
