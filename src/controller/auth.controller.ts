import { Request, Response } from "express";
import { AuthenticationService } from "../service/authentication/auth.service";

export class AuthController {
    private authenticationService: AuthenticationService;

    constructor() {
        this.authenticationService = new AuthenticationService();
    }

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, lastName, email, password } = req.body;
            const newUser = await this.authenticationService.createUser({ firstName, lastName, email, password });
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: newUser
            });
        } catch (error) {
            console.error(`Error creating user: ${error}`);
            res.status(500).json({
                success: false,
                message: "Failed to create user"
            });
        }
    }

    async loginUser(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            
            // Validate input
            if (!email || !password) {
                res.status(400).json({
                    success: false,
                    message: "Email and password are required"
                });
                return;
            }

            // Call service to authenticate user and get token
            const token = await this.authenticationService.login(email, password);
            res.status(200).json({
                success: true,
                message: "Login successful",
                token: token
            });
        } catch (error) {
            console.error(`Error logging in user: ${error}`); 
            res.status(401).json({
                success: false,
                message: "Invalid email or password" 
            });
        }
    }
}