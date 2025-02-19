import * as yup from "yup";

export const eventSchema = yup.object().shape({
    name: yup.string().required("Event name is required"),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
    location: yup.string().required("Location is required"),
    thumbnail: yup
        .mixed<FileList>()
        .test("fileRequired", "Thumbnail is required", (value) => {
            return value && value.length > 0;
        }),
    status: yup.mixed<"Ongoing" | "Completed">().oneOf(["Ongoing", "Completed"]).required("Status is required"),
});
