import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../3-models/error-models";

function routeNotFound(request: Request, response: Response, next: NextFunction) {
    const err = new NotFoundError(request.originalUrl);
    next(err);
}

export default routeNotFound;
