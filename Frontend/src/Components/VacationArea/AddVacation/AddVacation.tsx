import { Button, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { VacationModel } from "../../../Models/VacationModel";
import { vacationService } from "../../../Services/VacationService";
import { imageUtil } from "../../../Utils/ImageUtil";
import { notify } from "../../../Utils/Notify";
import { useTitle } from "../../../Utils/UseTitle";
import "./AddVacation.css";

export function AddVacation(): JSX.Element {
    useTitle("Shahar Travels - Add Vacation");

    const { register, handleSubmit } = useForm<VacationModel>();
    const navigate = useNavigate();

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

            if (!vacation.image) {
                notify.error("Image is required");
                return;
            }

            // Format startDate and endDate
            vacation.startDate = dayjs(vacation.startDate).format("YYYY-MM-DD HH:mm:ss");
            vacation.endDate = dayjs(vacation.endDate).format("YYYY-MM-DD HH:mm:ss");

            // Handle image file
            const imageFiles = vacation.image as unknown as FileList | undefined;
            const imageFile = imageFiles && imageFiles.length > 0 ? imageFiles[0] : undefined;

            if (imageFile && !imageUtil.isImageFileType(imageFile.name)) {
                notify.error("Invalid image file type");
                return;
            }

            // verify that startDate is before endDate
            if (dayjs(vacation.startDate).isAfter(vacation.endDate)) {
                notify.error("Start date must be before end date");
                return;
            }

            await vacationService.addVacation(vacation, imageFile);
            notify.success("Vacation has been added successfully");
            navigate("/vacations");
        } catch (err: any) {
            notify.error(err.message);
        }
    }

    return (
        <div className="AddVacation">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(send)}>
                    <TextField
                        label="Destination"
                        fullWidth
                        {...register("destination")}
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
                        type="number"
                        fullWidth
                        {...register("price")}
                    />
                    <br />
                    <br />
                    <div className="date-input">
                        <label>Start Date and Time:</label>
                        <input
                            type="datetime-local"
                            {...register("startDate")}
                            className="custom-datetime"
                        />
                    </div>
                    <br />
                    <div className="date-input">
                        <label>End Date and Time:</label>
                        <input
                            type="datetime-local"
                            {...register("endDate")}
                            className="custom-datetime"
                        />
                    </div>
                    <br />
                    <br />
                    <input type="file" {...register("image")} accept="image/*" />
                    <br />
                    <br />
                    <Button type="submit" variant="contained" fullWidth>
                        Add Vacation
                    </Button>
                </form>
            </LocalizationProvider>
        </div>
    );
}