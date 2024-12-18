import { NextFunction, Request, Response } from "express";

class LoggerMiddleware {
    
    public consoleLogRequest(request: Request, response: Response, next: NextFunction): void {
        
        console.log("Method: ", request.method);
        console.log("Route: ", request.originalUrl);
        console.log("Body: ", request.body);

        // Continue to next middleware or controller:
        next();
    }

}

export const loggerMiddleware = new LoggerMiddleware();
