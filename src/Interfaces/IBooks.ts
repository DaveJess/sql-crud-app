import { Document } from "mongoose";

export interface IBook  extends Document {
    title: String,
    author: String,
    isbn: String,
    price: Number,
    genre: String,
    publishedYear: Number
}

