import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { CredentialsModel } from "../3-models/credentials-model";
import { StatusCode } from "../3-models/enums";

class UserController {

    public readonly router = express.Router();

    public constructor() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
        this.router.post("/contact-us", this.saveContactForm);
    }

    public async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = new UserModel(request.body);
            const token = await userService.register(user);
            response.status(StatusCode.Created).json(token);
        }
        catch (err: any) {
            next(err); 
        }
    }
    
    
    public async login(request: Request, response: Response, next: NextFunction) {
        try {
            const credentials = new CredentialsModel(request.body);
            console.log("Credentials received:", credentials);
            const token = await userService.login(credentials);
            console.log("Generated token:", token);

            response.json(token);
        }
        catch (err: any) {
            response.status(StatusCode.BadRequest).json(err);
            console.error("Login error:", err);
            next(err);
        }
    }

    public async saveContactForm(request: Request, response: Response, next: NextFunction) {
        try {
            const formData = request.body; // מקבל את הנתונים מהבקשה
            await userService.saveContactForm(formData); // קורא לפונקציה בשירות
            response.status(StatusCode.Created).json({ message: "Contact form saved successfully." });
        } catch (err: any) {
            console.error("Error saving contact form:", err);
            response.status(StatusCode.InternalServerError).json({ error: "Failed to save contact form." });
            next(err);
        }
    }

}

export const userController = new UserController();
