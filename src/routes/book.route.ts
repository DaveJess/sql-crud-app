import { Router } from "express"; 
import { BookController } from "./../controller/bookController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
const bookController = new BookController();

router
    .get("/", authMiddleware, (req, res) =>
        (bookController as any).getAllBooks(req, res))
    .get("/:id", authMiddleware, (req, res) =>
        (bookController as any).getBookById(req, res))
    .put("/:id", authMiddleware, (req,res) =>
        (bookController as any).updateBook(req, res))
    .delete("/:id", authMiddleware, (req, res) =>
    (bookController as any).deleteBook(req, res)
    );

export default router;