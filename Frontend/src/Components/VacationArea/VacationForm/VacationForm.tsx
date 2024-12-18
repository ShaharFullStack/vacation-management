import { Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import "./VacationForm.css";
import { send } from "process";
import { VacationModel } from "../../../Models/VacationModel";


export function VacationForm(): JSX.Element {

    const { register, handleSubmit, setValue, control } = useForm<VacationModel>();

    return (
        <div className="VacationForm">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
                <form onSubmit={handleSubmit(send)}>
                    <TextField
                        label="Destination"
                        fullWidth
                        {...register("destination", { required: "Destination is required" })}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Description"
                        fullWidth
                        {...register("description", { required: "Description is required" })}
                    />
                    <br />
                    <br />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        {...register("price", { required: "Price is required", min: 0 })}
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
