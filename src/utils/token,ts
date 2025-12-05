import jwt from 'jsonwebtoken';
import { userToken } from "./userToken";

interface UserToken {
    userId: string;
    role: string;
    email: string;
}

export function generateToken(payload: UserToken): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not set in environment variables');
    }
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    return jwt.sign(payload, secret, {
        expiresIn
    });
}

