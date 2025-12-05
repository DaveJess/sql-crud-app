import User from "../../models/user.model";
import { IUser } from "../../Interfaces/IUser";
import { LeanDocument } from "mongoose";

export class UserService {
    // Get all users
    async getAllUsers(): Promise<LeanDocument<IUser>[]> {
        try {
            const users = await User.find().select("-password").lean().exec();
            return users;
        } catch (err) {
            throw new Error(`Failed to fetch users: ${err}`);
        }
    }

    // Get user by ID
    async getUserById(userId: string): Promise<LeanDocument<IUser> | null> {
        try {
            const user = await User.findById(userId).select("-password").lean().exec();
            return user;
        } catch (err) {
            throw new Error(`Failed to fetch user: ${err}`);
        }
    }

    // Create new user
    async createUser(userData: Partial<IUser>): Promise<LeanDocument<IUser>> {
        try {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser.toObject({ versionKey: false }) as LeanDocument<IUser>;
        } catch (err) {
            throw new Error(`Failed to create user: ${err}`);
        }
    }

    // Update user
    async updateUser(userId: string, updateData: Partial<IUser>): Promise<LeanDocument<IUser> | null> {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                updateData,
                { new: true, runValidators: true }
            ).select("-password").lean().exec();
            return updatedUser;
        } catch (err) {
            throw new Error(`Failed to update user: ${err}`);
        }
    }

    // Delete user
    async deleteUser(userId: string): Promise<LeanDocument<IUser> | null> {
        try {
            const deletedUser = await User.findByIdAndDelete(userId).exec();
            if (!deletedUser) return null;
            return deletedUser.toObject({ versionKey: false }) as LeanDocument<IUser>;
        } catch (err) {
            throw new Error(`Failed to delete user: ${err}`);
        }
    }
};
