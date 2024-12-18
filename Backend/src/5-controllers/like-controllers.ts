import express, { NextFunction, Request, Response } from "express";
import { likeService } from "../4-services/like-service";
import { securityMiddleware } from "../6-middleware/security-middleware";
import { likeReportService } from "../4-services/like-report-service";
import { StatusCode } from "../3-models/enums";
import { BadRequestError, UnauthorizedError } from "../3-models/error-models";
import jwt from "jsonwebtoken";

class LikeController {
    public readonly router = express.Router();

    public constructor() {
        this.router.get(
            "/likes",
            securityMiddleware.validateToken,
            this.getAllLikes.bind(this)
        );

        this.router.post(
            "/vacations/:vacationId/likes",
            securityMiddleware.validateToken,
            this.addLike.bind(this)
        );

        this.router.delete(
            "/vacations/:vacationId/likes",
            securityMiddleware.validateToken,
            this.removeLike.bind(this)
        );

        this.router.get(
            "/vacations/:vacationId/likes/count",
            this.getLikesByVacation.bind(this)
        );

        this.router.get(
            "/users/likes/",
            securityMiddleware.validateToken,
            this.getUserLikedVacations.bind(this)
        );

        this.router.get(
            "/likes/report",
            securityMiddleware.validateAdmin,
            this.getLikesReport.bind(this)
        );
        this.router.get("/likes/report/csv", 
            securityMiddleware.validateAdmin,
            this.downloadLikesCSV
        );
        
    }

    private getUserIdFromToken(request: Request): string {
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) throw new UnauthorizedError("Authorization token is missing");

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { user: { id: string } };
            return decoded.user.id;
        } catch (err) {
            throw new UnauthorizedError("Invalid or expired token");
        }
    }

    private async getAllLikes(request: Request, response: Response, next: NextFunction) {
        try {
            const likes = await likeService.getAllLikes();
            response.json(likes.length ? likes : []);
        } catch (err: any) {
            next(err);
        }
    }

    private async addLike(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = this.getUserIdFromToken(request);
            const vacationId = request.params.vacationId;

            if (!vacationId) {
                throw new BadRequestError("Vacation ID is required");
            }

            const like = await likeService.addLike(userId, vacationId);
            response.status(StatusCode.Created).json(like);
        } catch (err: any) {
            next(err);
        }
    }

    private async removeLike(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = this.getUserIdFromToken(request);
            const vacationId = request.params.vacationId;

            if (!vacationId) {
                throw new BadRequestError("Vacation ID is required");
            }

            await likeService.removeLike(userId, vacationId);
            response.status(StatusCode.NoContent).send();
        } catch (err: any) {
            next(err);
        }
    }

    private async getLikesByVacation(request: Request, response: Response, next: NextFunction) {
        try {
            const vacationId = request.params.vacationId;

            if (!vacationId) {
                throw new BadRequestError("Vacation ID is required");
            }

            const count = await likeService.getLikesByVacation(vacationId);
            response.json({ vacationId, count });
        } catch (err: any) {
            next(err);
        }
    }

    private async getUserLikedVacations(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = this.getUserIdFromToken(request);
            const vacations = await likeService.getUserLikedVacations(userId);
            response.json(vacations);
        } catch (err: any) {
            next(err);
        }
    }

    private async getLikesReport(request: Request, response: Response, next: NextFunction) {
        try {
            const reportData = await likeReportService.generateGlobalLikesReport();
            response.json(reportData);
        } catch (err: any) {
            next(err);
        }
    }

    private async downloadLikesCSV(request: Request, response: Response, next: NextFunction) {
        try {
            const csvData = await likeReportService.generateLikesCSV();
            response.setHeader("Content-Type", "text/csv");
            response.setHeader("Content-Disposition", "attachment; filename=vacations_likes_report.csv");
            response.send(csvData);
        } catch (err: any) {
            next(err);
        }
    }
    
}


export const likeController = new LikeController();
