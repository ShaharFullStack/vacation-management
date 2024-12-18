import Joi from "joi";
import { BadRequestError } from "./error-models";
import { UploadedFile } from "express-fileupload";

export class VacationModel {
    public vacationId: string;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: UploadedFile;
    public imageUrl: string;


    public constructor(vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
    }
    public formatDateForMySQL(date: string): string {
        const isoDate = new Date(date);
        return isoDate.toISOString().slice(0, 19).replace('T', ' ');
    }

    private static insertValidationSchema = Joi.object({
        vacationId: Joi.string().forbidden().uuid(),
        destination: Joi.string().required().min(2).max(255),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required().greater(Joi.ref("startDate")),
        price: Joi.number().required().min(100).max(10000),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),
    });

    // Validate insert: 
    public validateInsert(): void {
        const result = VacationModel.insertValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }

    private static updateValidationSchema = Joi.object({
        vacationId: Joi.string().optional().uuid(),
        destination: Joi.string().optional().max(255),
        description: Joi.string().optional().max(1000),
        startDate: Joi.date().optional(),
        endDate: Joi.date().optional().greater(Joi.ref("startDate")),
        price: Joi.number().optional().min(100).max(10000),
        image: Joi.object().optional(),
        imageUrl: Joi.string().optional().max(200),
    });

    
    // Validate update: 
    public validateUpdate(): void {
        const result = VacationModel.updateValidationSchema.validate(this);
        if (result.error) throw new BadRequestError(result.error.message);
    }
}
