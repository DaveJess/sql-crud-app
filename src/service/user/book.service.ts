import Book from "../../models/book.model";
import { IBook } from "../../Interfaces/IBooks";

export class BookService {
    async getAllBooks(): Promise<IBook[]> {
        try {
            const books = await Book.find().lean();
            return books;
        } catch (err) {
            throw new Error(`Failed to fetch books: ${err}`);
        }
    }

    async getBookById(bookId: string): Promise<IBook | null> {
        try {
            const book = await Book.findById(bookId).lean<IBook>();
            return book;
        } catch (err) {
            throw new Error(`Failed to fetch this book: ${err}`);
        }
    }

    async createBook(bookData: Partial<IBook>): Promise<IBook> {
        try {
            const newBook = new Book(bookData);
            const savedBook = await newBook.save();
            return (savedBook && (savedBook as any)
            .toObject) ? (savedBook as any)
            .toObject() as IBook : (savedBook as unknown as IBook);
        } catch (err) {
            throw new Error(`Failed to create book: ${err}`);
        }
    }

    async updateBook(bookId: string, updateData: Partial<IBook>): Promise<IBook | null> {
        try {
            const updatedBook = await Book.findByIdAndUpdate(
                bookId,
                updateData,
                { new: true, runValidators: true }
            ).lean<IBook>();
            return updatedBook;
        } catch (err) {
            throw new Error(`Failed to update book: ${err}`);
        }
    }

    async deleteBook(bookId: string): Promise<IBook | null> {
        try {
            const deletedBook = await Book.findByIdAndDelete(bookId);
            return deletedBook ? ((deletedBook as any).toObject ? (deletedBook as any)
            .toObject() as IBook : deletedBook as unknown as IBook) : null; 
        } catch (err) {
            throw new Error(`Failed to delete book: ${err}`);
        }
    }
};

