import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string;
    role: string;
    iat: number;
    exp: number;
} 

export function authMiddleware( req: Request, res: Response, next: NextFunction ): void {
    const authHeader = req.headers.authorization;
    if (!authHeader || typeof authHeader !== "string") {
        res.status(401).json({ error: "No token provided" });
        return;
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}

