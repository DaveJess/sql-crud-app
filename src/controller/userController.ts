import { Request, Response } from "express";
import { UserService } from "../service/user/user.service";

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    // ✅ Get all users (admin use case)
    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch users"
            });
        }
    }

    // ✅ Get a single user by ID
    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const user = await this.userService.getUserById(id);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error("Error fetching user:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch user"
            });
        }
    }

    // ✅ Update user profile
    async updateUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updatedUser = await this.userService.updateUser(id, updates);

            if (!updatedUser) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: updatedUser
            });
        } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to update user"
            });
        }
    }

    // ✅ Delete a user
    async deleteUser(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const deletedUser = await this.userService.deleteUser(id);

            if (!deletedUser) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        } catch (error) {
            console.error("Error deleting user:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to delete user"
            });
        }
    }

    // ✅ Get current logged-in user (from JWT middleware)
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id; // set by authMiddleware

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
                return;
            }

            const user = await this.userService.getUserById(userId);

            if (!user) {
                res.status(404).json({
                    success: false,
                    message: "User not found"
                });
                return;
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : "Failed to fetch profile"
            });
        }
    }
}

export default new UserController();
