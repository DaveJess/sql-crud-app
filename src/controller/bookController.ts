import { Request, Response } from "express";
import { BookService } from "../service/user/book.service"; 
import Book from "../models/book.model";

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    async getAllBooks(req: Request, res: Response): Promise<void> {
        try {
            const books = await this.bookService.getAllBooks();
            res.status(200).json({ 
                success: true, 
                data: books });
        } catch (err) {
            console.error("Error fetching books:", err);
            res.status(500).json({ 
                success: false, 
                message: "Failed to fetch books" });
        }
    }

    async getBookById(req: Request, res: Response): Promise<void> {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            if (!book) {
                res.status(404).json({ 
                    success: false, 
                    message: "Book not found" });
                return;
            }
            res.status(200).json({ success: true, data: book });
        } catch (err) {
            console.error("Error fetching book:", err);
            res.status(500).json({ 
                success: false, 
                message: "Failed to fetch book" });
        }
    }

    async createBook(req: Request, res: Response): Promise<void> {
        try {
            const saved = await this.bookService.createBook(req.body);
            res.status(201).json({ 
                success: true, 
                message: "Book created successfully", data: saved });
        } catch (err) {
            console.error("Error creating book:", err);
            res.status(400).json({ 
                success: false, 
                message: "Failed to create book" });
        }
    }

    async updateBook(req: Request, res: Response): Promise<void> {
        try {
            const updatedBook = await this.bookService.updateBook(req.params.id, req.body);
            if (!updatedBook) {
                res.status(404).json({ success: false,
                    message: "Book not found" });
                return;
            }
            res.status(200).json({ success: true, 
                message: "Book updated successfully", data: updatedBook });
        } catch (err) {
            console.error("Error updating book:", err);
            res.status(500).json({ success: false, 
                message: "Failed to update book" });
        }
    }

    async deleteBook(req: Request, res: Response): Promise<void> {
        try {
            const deletedBook = await this.bookService.deleteBook(req.params.id);
            if (!deletedBook) {
                res.status(404).json({ 
                    success: false, 
                    message: "Book not found" });
                return;
            }
            res.status(200).json({ 
                success: true, 
                message: "Book deleted successfully" });
        } catch (err) {
            console.error("Error deleting book:", err);
            res.status(500).json({ 
                success: false, 
                message: "Failed to delete book" });
        }
    }
}

export default new BookController();

