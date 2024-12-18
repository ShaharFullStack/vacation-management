import { useForm } from "react-hook-form";
import "./Login.css";
import { CredentialsModel } from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";

export function Login(): JSX.Element {

    const { register, handleSubmit, formState: { errors } } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome back!");
            const targetUrl = sessionStorage.getItem("targetUrl") || "/home";
            sessionStorage.removeItem("targetUrl");
            navigate(targetUrl);
        }
        catch (err: any) {
            const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
            notify.error(errorMessage);
        }
    }

    return (
        <div className="Login">

            <form onSubmit={handleSubmit(send)}>

                <TextField
                    label="Email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format"
                        }
                    })}
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                />
                <br /><br />
                <TextField
                    type="password"
                    label="Password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 5,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    fullWidth
                    error={!!errors.password}
                    helperText={errors.password?.message}
                />
                <br /><br />
                <Button type="submit">Login</Button>

            </form>

        </div>
    );
}
