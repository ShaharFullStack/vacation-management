import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../3-models/enums";
import { NotFoundError } from "../3-models/error-models";
import { appConfig } from "../2-utils/app-config";
import { logger } from "../2-utils/logger";

class ErrorMiddleware {

    public catchAll(err: any, request: Request, response: Response, next: NextFunction): void {

        // Display error: 
        console.log(err);
        logger.logError(err);

        // Extract status code (if no status, it means server crash): 
        const status = err.status || StatusCode.InternalServerError;

        // Extract message: 
        const isCrash = status >= 500 && status <= 599;
        const message = isCrash && appConfig.isProduction ? "Some error, please try again." : err.message;

        // Send error back to client: 
        response.status(status).send(message);
    }

    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        next(new NotFoundError(`Route ${request.originalUrl} not found.`));
    }

}

export const errorMiddleware = new ErrorMiddleware();
