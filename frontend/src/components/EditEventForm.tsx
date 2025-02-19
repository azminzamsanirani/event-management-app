import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventSchema } from "../utils/Validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "../api/events";
import { Event, EventFormData } from "../utils/Types";
import { Button, TextField, Container, Typography, Input } from "@mui/material";

interface EditEventFormProps {
  event: Event;
  onClose: () => void; // Function to close modal after updating
}

const EditEventForm: React.FC<EditEventFormProps> = ({ event, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: yupResolver(eventSchema),
    defaultValues: {
      name: event.name,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      status: event.status,
    },
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: (updatedEvent: Event) => {
      queryClient.setQueryData(["events"], (oldEvents: Event[] | undefined) =>
        oldEvents
          ? oldEvents.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
          : [updatedEvent]
      );
      onClose(); // Close the modal after update
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
      formData.append("thumbnail", data.thumbnail[0]); // Only append new image if selected
    }

    mutation.mutate({ id: event.id, formData });
  };

  return (
    <Container>
      <Typography variant="h5">Edit Event</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Event Name" {...register("name")} fullWidth />
        <Typography color="error">{errors.name?.message}</Typography>

        <TextField
          type="date"
          label="Start Date"
          {...register("startDate")}
          fullWidth
        />
        <Typography color="error">{errors.startDate?.message}</Typography>

        <TextField
          type="date"
          label="End Date"
          {...register("endDate")}
          fullWidth
        />
        <Typography color="error">{errors.endDate?.message}</Typography>

        <TextField label="Location" {...register("location")} fullWidth />
        <Typography color="error">{errors.location?.message}</Typography>

        <Input type="file" {...register("thumbnail")} />
        <Typography color="error">{errors.thumbnail?.message}</Typography>

        <Button type="submit" variant="contained" color="primary">
          Update Event
        </Button>
      </form>
    </Container>
  );
};

export default EditEventForm;
