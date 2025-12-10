import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
    email: string;
    role?: string;
}

/**
 * Sign a JWT token with user payload
 * @param payload - User data to encode in token
 * @returns Signed JWT token
 */
export const signToken = (payload: TokenPayload): string => {
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign(payload, jwtSecret, { 
        expiresIn: "1d",
        algorithm: "HS256"
    });
};

/**
 * Verify and decode a JWT token
 * @param token - JWT token to verify
 * @returns Decoded payload or null if invalid
 */
export const verifyToken = (token: string): TokenPayload | null => {
    try {
        const jwtSecret = process.env.JWT_SECRET;
        
        if (!jwtSecret) {
            console.error("JWT_SECRET is not defined");
            return null;
        }

        const decoded = jwt.verify(token, jwtSecret) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error("Token verification failed:", error instanceof Error ? error.message : error);
        return null;
    }
};

/**
 * Decode a JWT token without verification (for inspection only)
 * @param token - JWT token to decode
 * @returns Decoded payload or null if invalid
 */
export const decodeToken = (token: string): TokenPayload | null => {
    try {
        const decoded = jwt.decode(token) as TokenPayload;
        return decoded;
    } catch (error) {
        console.error("Token decode failed:", error instanceof Error ? error.message : error);
        return null;
    }
};

/**
 * Check if a token is expired
 * @param token - JWT token to check
 * @returns true if expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
    const decoded = decodeToken(token);
    if (!decoded || !decoded.id) return true;
    return false;
};

