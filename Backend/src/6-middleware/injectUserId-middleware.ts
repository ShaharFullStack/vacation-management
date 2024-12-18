
import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";

export function injectUserId(req: Request, res: Response, next: NextFunction) {
    // Assuming the token validation has already happened
    // and `req.user` or similar property holds the user's info.
    const userId = (req as any).user?.id; // This assumes your token validation populates `req.user`.
    
    if (!userId) {
        return res.status(StatusCode.Unauthorized).json({ message: "You are Unauthorized" });
    }

    (req as any).userId = userId; // Add `userId` directly to the request
    next();
}
