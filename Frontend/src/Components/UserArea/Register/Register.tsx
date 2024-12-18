import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserModel } from "../../../Models/UserModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import "./Register.css";
import { Button, TextField } from "@mui/material";

export function Register(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();

    async function send(user: UserModel) {
        try {
            await userService.register(user);
            notify.success("Welcome " + user.firstName);
            navigate("/login");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Register">
			
            <form onSubmit={handleSubmit(send)}>

                <TextField fullWidth label="First Name" type="text" {...register("firstName")} />
                <br /><br />
                <TextField fullWidth label="Last Name" type="text" {...register("lastName")} />
                <br /><br />
                <TextField fullWidth label="Email" type="email" {...register("email")} />
                <br /><br />
                <TextField fullWidth label="Password" type="password" {...register("password")} />
                <br /><br />
                <Button type="submit" variant="contained" color="primary">Register</Button>

            </form>

        </div>
    );
}
