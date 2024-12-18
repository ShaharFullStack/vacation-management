import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";
import { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userActions } from "../Redux/UserSlice";
import { appConfig } from "../Utils/AppConfig";

class UserService {

    public constructor() {
        const token = sessionStorage.getItem("token");
        if (token) this.initUser(token);
    }

    public async register(user: UserModel): Promise<void> {
        try {
            const response = await axios.post<string>(appConfig.registerUrl, user);
            const token = response.data;
            this.initUser(token);
            sessionStorage.setItem("token", token);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Registration failed";
            console.error("Registration Error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    public async login(credentials: CredentialsModel): Promise<void> {
        try {
            const response = await axios.post<string>(appConfig.loginUrl, credentials);
            const token = response.data;
            this.initUser(token);
            sessionStorage.setItem("token", token);
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Login failed";
            console.error("Login Error:", errorMessage);
            throw new Error(errorMessage);
        }
    }

    public logout(): void {
        store.dispatch(userActions.logoutUser());
        sessionStorage.removeItem("token");
    }

    private initUser(token: string): void {
        try {
            const container = jwtDecode<{ user: UserModel }>(token);
            const dbUser = container.user;
            store.dispatch(userActions.initUser(dbUser));
        } catch (error) {
            console.warn("Invalid token detected:", error);
            sessionStorage.removeItem("token");
        }
    }
}

export const userService = new UserService();
