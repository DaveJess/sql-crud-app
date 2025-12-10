import { Request, Response, NextFunction } from "express";
import { LendingService } from "../service/authentication/lending.service";

export class LendingController {
    private lendingService: LendingService;

    constructor() {
        this.lendingService = new LendingService();
    }

    // Borrow a book
    async borrowBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).user?.id; // from authMiddleware
            const { bookId } = req.params;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized: User not found"
                });
                return;
            }

            if (!bookId) {
                res.status(400).json({
                    success: false,
                    message: "Book ID is required"
                });
                return;
            }

            const result = await this.lendingService.borrowBook(userId, bookId);

            res.status(201).json({
                success: true,
                message: "Book borrowed successfully",
                data: result
            });
        } catch (error) {
            console.error("Error borrowing book:", error);
            next(error);
        }
    }

    // Return a borrowed book
    async returnBook(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { lendingId } = req.params;

            if (!lendingId) {
                res.status(400).json({
                    success: false,
                    message: "Lending ID is required"
                });
                return;
            }

            const result = await this.lendingService.returnBook(lendingId);

            res.status(200).json({
                success: true,
                message: "Book returned successfully",
                data: result
            });
        } catch (error) {
            console.error("Error returning book:", error);
            next(error);
        }
    }

    // Get lending history for a user
    async getLendingHistory(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).user?.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized: User not found"
                });
                return;
            }

            const history = await this.lendingService.getLendingHistory(userId);

            res.status(200).json({
                success: true,
                data: history
            });
        } catch (error) {
            console.error("Error fetching lending history:", error);
            next(error);
        }
    }

    // Get all active borrows for a user
    async getActiveBorrows(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).user?.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized: User not found"
                });
                return;
            }

            const activeBorrows = await this.lendingService.getActiveBorrows(userId);

            res.status(200).json({
                success: true,
                data: activeBorrows
            });
        } catch (error) {
            console.error("Error fetching active borrows:", error);
            next(error);
        }
    }

    // Get all overdue books
    async getOverdueBooks(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = (req as any).user?.id;

            if (!userId) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized: User not found"
                });
                return;
            }

            const overdueBooks = await this.lendingService.getOverdueBooks(userId);

            res.status(200).json({
                success: true,
                data: overdueBooks
            });
        } catch (error) {
            console.error("Error fetching overdue books:", error);
            next(error);
        }
    }
}

export default new LendingController(); 

