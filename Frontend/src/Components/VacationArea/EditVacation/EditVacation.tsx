import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { imageUtil } from "../../../Utils/ImageUtil";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import "./EditVacation.css";

export function EditVacation(): JSX.Element {
    useTitle("Shahar Travels - Edit Vacation");

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<VacationModel>();
    const params = useParams();
    const id = params.vacationId!;
    const navigate = useNavigate();

    // Fetch vacation data on component mount
    useEffect(() => {
        vacationService
            .getVacationById(id)
            .then((vacation: VacationModel) => {
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("image", null);
            })
            .catch((err: unknown) => notify.error(err));
    }, [id, setValue]);

    async function send(vacation: VacationModel) {
        try {
            // Validate required fields
            if (!vacation.destination) {
                notify.error("Destination is required");
                return;
            }
            if (!vacation.description) {
                notify.error("Description is required");
                return;
            }
            if (!vacation.startDate) {
                notify.error("Start date is required");
                return;
            }
            if (!vacation.endDate) {
                notify.error("End date is required");
                return;
            }
            if (!vacation.price) {
                notify.error("Price is required");
                return;
            }

            vacation.vacationId = id;

            // Format startDate and endDate
            vacation.startDate = dayjs(vacation.startDate).format("YYYY-MM-DD HH:mm:ss");
            vacation.endDate = dayjs(vacation.endDate).format("YYYY-MM-DD HH:mm:ss");

            // Verify that startDate is before endDate
            if (dayjs(vacation.startDate).isAfter(vacation.endDate)) {
                notify.error("Start date must be before end date");
                return;
            }
            // Handle image file
            const imageFiles = vacation.image as unknown as FileList | undefined;
            const imageFile = imageFiles && imageFiles.length > 0 ? imageFiles[0] : undefined;

            if (imageFile && !imageUtil.isImageFileType(imageFile.name)) {
                notify.error("Illegal image file type.");
                return;
            }

            await vacationService.updateVacation(vacation, imageFile);
            notify.success("Vacation has been updated.");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="EditVacation">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(send)}>
                    <TextField
                        label="Destination"
                        fullWidth
                        margin="normal"
                        {...register("destination", {
                            required: "Destination is required",
                            minLength: { value: 2, message: "Minimum length is 2 characters" },
                            maxLength: { value: 100, message: "Maximum length is 100 characters" },
                        })}
                        error={!!errors.destination}
                        helperText={errors.destination?.message}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Description"
                        fullWidth
                        {...register("description")}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Price"
                        fullWidth
                        type="number"
                        inputProps={{ step: 0.01, min: 0, max: 10000 }} 
                        margin="normal"
                        {...register("price", {
                            required: "Price is required",
                            min: { value: 0, message: "Price must be at least 0" },
                            max: { value: 10000, message: "Price must be at most 10000" },
                            valueAsNumber: true, 
                        })}
                        error={!!errors.price}  
                        helperText={errors.price?.message}
                    />
                    <br />
                    <br />
                    <Controller
                        name="startDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DateTimePicker
                                label="Start Date"
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(newValue) =>
                                    field.onChange(newValue ? newValue.format("YYYY-MM-DDTHH:mm:ss") : null)
                                }
                                slotProps={{
                                    textField: { fullWidth: true },
                                }}
                            />
                        )}
                    />
                    <br />
                    <br />
                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue={null}
                        render={({ field }) => (
                            <DateTimePicker
                                label="End Date"
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(newValue) =>
                                    field.onChange(newValue ? newValue.format("YYYY-MM-DDTHH:mm:ss") : null)
                                }
                                slotProps={{
                                    textField: { fullWidth: true },
                                }}
                            />
                        )}
                    />
                    <br />
                    <br />
                    <input type="file" {...register("image")} accept="image/*" />
                    <br />
                    <br />
                    <Button type="submit" variant="contained" fullWidth>
                        Update Vacation
                    </Button>
                </form>
            </LocalizationProvider>
        </div>
    );
}