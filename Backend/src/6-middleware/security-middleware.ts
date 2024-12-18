import { NextFunction, Request, Response } from "express";
import striptags from "striptags";
import { cyber } from "../2-utils/cyber";
import { BadRequestError, ForbiddenError, UnauthorizedError } from "../3-models/error-models";


class SecurityMiddleware {

    public validateToken(request: Request, response: Response, next: NextFunction): void {

        const header = request.headers.authorization;

        // "Bearer the-token..."
        //  01234567
        const token = header?.substring(7);

        if (!cyber.validateToken(token)) {
            next(new UnauthorizedError("You are not logged-in."));
            return;
        }
        
        next();
    }

    public validateAdmin(request: Request, response: Response, next: NextFunction): void {

        const header = request.headers.authorization;

        const token = header?.substring(7);

        if (!cyber.validateAdmin(token)) {
            next(new UnauthorizedError("You are not authorized."));
            return;
        }

        next();
    }

    public preventXssAttack(request: Request, response: Response, next: NextFunction): void {
        for (const prop in request.body) {
            const value = request.body[prop];
            if (typeof value === "string") {
                request.body[prop] = striptags(value);
            }
        }
        next();
    }

}

export const securityMiddleware = new SecurityMiddleware();
