import Joi from "joi";
import { BadRequestError } from "./error-models";
import { RoleModel } from "./role-model";

export class UserModel {
    public id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public roleId: RoleModel;

    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static validationSchema = Joi.object({
        id: Joi.string().optional().uuid(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(20),
        email: Joi.string().email().required().min(5).max(100),
        password: Joi.string().required().min(6).max(500),        
        roleId: Joi.number().required().min(1).max(2),
    })

    public insertValidation(): void {
        const result = UserModel.validationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}