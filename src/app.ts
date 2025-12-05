import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./database/db";
import authRoutes from "./routes/auth.route";
import bookRoutes from "./routes/book.route";
import userRoutes from "./routes/user.routes";
import adminRoutes from "./routes/admin.route";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes 
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);

connectToDatabase();

app.get("/test", (req, res)=>{
    res.status(200).json({
        success:true,
        message:"APP is running healthy"
    })
});

app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})