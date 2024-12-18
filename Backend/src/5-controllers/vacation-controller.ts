import express, { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { fileSaver } from "uploaded-file-saver";
import { StatusCode } from "../3-models/enums";
import { VacationModel } from "../3-models/vacation-model";
import { vacationService } from "../4-services/vacation-service";
import { securityMiddleware } from "../6-middleware/security-middleware";

class VacationController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations", this.getAllVacations);
        this.router.get("/vacations/:id", this.getOneVacation);
        this.router.post("/vacations", securityMiddleware.validateAdmin, this.addVacation);
        this.router.put("/vacations/:id", securityMiddleware.validateToken, this.updateVacation);
        this.router.delete("/vacations/:id", securityMiddleware.validateAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImage);
        this.router.get("/vacations/search", this.searchVacations);

    }

    private async getAllVacations(request: Request, response: Response, next: NextFunction) {
        try {

            const vacations = await vacationService.getAllVacations();
            response.json(vacations);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getOneVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const vacation = await vacationService.getOneVacation(id);
            response.json(vacation);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async addVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const image = request.files?.image as UploadedFile;
            if (!image) {
                return response.status(StatusCode.BadRequest).json({ message: '"image" is required' });
            }

            request.body.image = image;
            const vacation = new VacationModel(request.body);

            const dbVacation = await vacationService.addVacation(vacation);

            response.status(StatusCode.Created).json(dbVacation);
        } catch (err: any) {
            response.status(StatusCode.BadRequest).json(err);
            next(err);
        }
    }

    private async updateVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            request.body.vacationId = id;

            const image = request.files?.image as UploadedFile;
            if (image) {
                request.body.image = image;
            }

            const vacation = new VacationModel(request.body);
            const dbVacation = await vacationService.updateVacation(vacation);

            response.status(StatusCode.OK).json(dbVacation);
        } catch (err: any) {
            response.status(StatusCode.BadRequest).json(err);
            next(err);
        }
    }

    private async deleteVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            await vacationService.deleteVacation(id);
            response.sendStatus(StatusCode.NoContent);
        }
        catch (err: any) {
            next(err);
        }
    }

    private async getImage(request: Request, response: Response, next: NextFunction) {
        try {
            const imageName = request.params.imageName;
            const absolutePath = fileSaver.getFilePath(imageName);
            response.status(StatusCode.OK).sendFile(absolutePath);
        }
        catch (err: any) {
            response.status(StatusCode.NotFound).send("Image not found");
            next(err);
        }
    }

    private async searchVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const searchValue = request.query.search as string || "";
            const page = +request.query.page || 1;
            const pageSize = +request.query.pageSize || 10;

            const result = await vacationService.searchVacations(searchValue, page, pageSize);
            response.json(result);
        } catch (err: any) {
            next(err);
        }
    }

}
export const vacationController = new VacationController();

