import { v4 as uuidv4 } from "uuid";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credentials-model";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../3-models/error-models";
import { RoleModel } from "../3-models/role-model";
import { UserModel } from "../3-models/user-model";
import path from "path";

class UserService {

    public async register(user: UserModel): Promise<string> {
        const sqlCheck = "SELECT COUNT(*) as count FROM users WHERE email = ?";
        const emailExists = await dal.execute(sqlCheck, [user.email]);
        if (emailExists[0].count > 0) {
            throw new BadRequestError("Email already exists.");
        }

        user.roleId = RoleModel.User;
        user.password = cyber.hash(user.password);

        user.id = uuidv4();
        user.insertValidation();
        const sql = "INSERT INTO users (id, firstName, lastName, email, password, roleId) VALUES (?, ?, ?, ?, ?, ?)";
        const values = [user.id, user.firstName, user.lastName, user.email, user.password, user.roleId];
        await dal.execute(sql, values);

        const token = cyber.getNewToken(user);

        return token;
    }

    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.password = cyber.hash(credentials.password);

        const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
        const values = [credentials.email, credentials.password];
        const users = await dal.execute(sql, values);

        if (users.length === 0) {
            throw new ForbiddenError("Incorrect email or password.");
        }

        const user = users[0];

        return cyber.getNewToken(user);
    }

    public async deleteUser(userId: string): Promise<void> {
        const sql = "DELETE FROM users WHERE id = ?";
        await dal.execute(sql, [userId]);
    }

        public async saveContactForm(data: any): Promise<void> {
            const fs = require('fs');
            const filePath = path.join(__dirname, "../data/contactForms.json");
    
            const fileData = fs.existsSync(filePath)
                ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
                : [];
    
            fileData.push({ ...data, timestamp: new Date().toISOString() });
    
            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 4));
        }

}

export const userService = new UserService();
