import Admin from "../../models/admin.model";
import { IAdmin } from "../../Interfaces/IAdmin";
import type { LeanDocument } from "mongoose";

export class AdminService {
    async getAllAdmins(): Promise<LeanDocument<IAdmin>[]> {
        try {
            const admins = await Admin.find().select("-password").lean();
            return admins;
        } catch (err) {
            throw new Error(`Failed to get all admins: ${err}`);
        }
    }
    async getAdmin(adminId: string): Promise<LeanDocument<IAdmin> | null > {
        try{
            const admin = await Admin.findById(adminId).select("-password").lean();
            return admin;
        } catch (err) {
            throw new Error(`Admin not found: ${err}`);
        }
    }
    async createAdmin(adminData: Partial<IAdmin>): Promise<LeanDocument<IAdmin>> {
        try {
            const newAdmin = await Admin.create(adminData);
            return (newAdmin as any).toObject({ versionKey: false }) as LeanDocument<IAdmin>;
        } catch (err) {
            throw new Error(`Failed to create a new admin: ${err}`);
        }
    }
    async updateAdmin(adminId: string, updateData: Partial<IAdmin>): Promise<LeanDocument<IAdmin> | null> {
        try {
            const updated = await Admin.findByIdAndUpdate(adminId,  updateData, {
                new: true,
                runValidators: true
            })
            .select("-password")
            .lean()
            .exec();
            return updated;
        } catch (err) {
            throw new Error(`Failed to update admin: ${err}`);
        }
    }
    async deleteAdmin(adminId: string): Promise<LeanDocument<IAdmin> | null> {
        try {
            const deleted = await Admin.findByIdAndDelete(adminId).exec();
            if (!deleted) return null ;
            return deleted.toObject({ versionKey: false }) as LeanDocument<IAdmin>;
        } catch (err) {
            throw new Error(`Failed to delete admin: ${err}`);
        }
    }
}