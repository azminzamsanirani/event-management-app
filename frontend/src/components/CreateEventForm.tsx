import "../styles/CreateEventForm.scss"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../utils/Validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../api/events";
import { EventFormData, Event } from "../utils/Types";
import { Button, TextField, Container, Typography, Input } from "@mui/material";
import { Link } from "react-router-dom";

const CreateEventForm = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: (newEvent: Event) => {
      queryClient.setQueryData(["events"], (oldEvents: Event[] | undefined) => {
        return oldEvents ? [...oldEvents, newEvent] : [newEvent];
      });
      reset();
    },
  });

  const onSubmit = async (data: EventFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("startDate", data.startDate);
    formData.append("endDate", data.endDate);
    formData.append("location", data.location);
    formData.append("status", data.status);

    if (data.thumbnail instanceof FileList && data.thumbnail.length > 0) {
      formData.append("thumbnail", data.thumbnail[0]); // ✅ Correct FileList handling
    }

    mutation.mutate(formData);
  };

  return (
    <Container className="create-event-form-container">
      <Typography variant="h5">Create New Event</Typography>
      <Link to="/admin/events">
        <Button variant="outlined" color="secondary">
          Manage Events
        </Button>
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="create-event-form">
        <TextField label="Event Name" {...register("name")} fullWidth />
        <Typography color="error">{errors.name?.message}</Typography>

        <TextField
          className="text-field"
          type="date"
          label="Start Date"
          {...register("startDate")}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Typography color="error">{errors.startDate?.message}</Typography>

        <TextField
          className="text-field"
          type="date"
          label="End Date"
          {...register("endDate")}
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <Typography color="error">{errors.endDate?.message}</Typography>

        <TextField
          className="text-field"
          label="Location"
          {...register("location")}
          fullWidth
        />
        <Typography color="error">{errors.location?.message}</Typography>

        {/* ✅ Properly register file input */}
        <Input
          className="text-field"
          type="file"
          {...register("thumbnail", { required: "Thumbnail is required" })}
        />
        <Typography color="error">{errors.thumbnail?.message}</Typography>

        <Button
          className="text-field"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Event
        </Button>
      </form>
    </Container>
  );
};

export default CreateEventForm;