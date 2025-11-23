import { Document } from "mongoose";

export interface userToken extends Document {
    userId: string;
    role: string;
    email: string;
}