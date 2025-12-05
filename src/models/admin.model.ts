import mongoose, { Schema } from "mongoose";
import { IAdmin } from "../Interfaces/IAdmin"; 

const adminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    permissions: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedDate: {
        type: Date
    }
},{timestamps:true}) 

const Admin = mongoose.model<IAdmin>("Admin", adminSchema);

export default Admin;