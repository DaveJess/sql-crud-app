import { Document } from "mongoose";

export interface IAdmin extends Document {
    firstName: string;
    lastName: string;
    email: string;
    role: "admin";
    password: string;
    phoneNumber?: string;
    isActive?: boolean;
    permissions?: string[];
    createdAt?: Date;
    updatedAt?: Date;
} 

