import { UserModel } from "../3-models/user-model";
import jwt, { JsonWebTokenError, SignOptions, TokenExpiredError } from "jsonwebtoken";
import { appConfig } from "./app-config";
import { RoleModel } from "../3-models/role-model";
import crypto from "crypto";

class Cyber {

    public hash(plainText: string): string {

        if (!plainText) return null;

        // Hashing with salt: 
        return crypto.createHmac("sha512", appConfig.hashingSalt).update(plainText).digest("hex");
    }

    public getNewToken(user: UserModel): string {

        // Remove password: 
        delete user.password;

        // Create payload to save inside the token:
        const payload = { user };

        // Create options: 
        const options: SignOptions = { expiresIn: "3h" };

        // Create token: 
        const token = jwt.sign(payload, appConfig.jwtSecret, options);

        // Return: 
        return token;
    }

    public validateToken(token: string): boolean {
        try {
            if (!token) return false;
            jwt.verify(token, appConfig.jwtSecret);
            return true;
        }
        catch (err: any) {
            if (err instanceof TokenExpiredError) {
                console.log("Token expired");
            } else if (err instanceof JsonWebTokenError) {
                console.log("Invalid token");
            } else {
                console.log("Unknown error occurred during token validation");
            }
            return false;
        }
    }

    public validateAdmin(token: string): boolean {
        try {
            if (!token) return false;

            const payload = jwt.decode(token) as { user: UserModel };
            if (!payload || !payload.user) return false;

            const user = payload.user;
            return user.roleId === RoleModel.Admin;
        } catch (err) {
            console.log("Error decoding token", err);
            return false;
        }
    }
}

export const cyber = new Cyber();
