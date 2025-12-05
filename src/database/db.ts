//i want you to create a mongoDB connection here and export it.
//first install mongoose ny running npm i mongoose on your terminal
import mongoose from "mongoose"
import dotenv from "dotenv";


dotenv.config();

const dbUrl= process.env.DB_URL;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbUrl!);
        console.log("Connected to the db");
    } catch (err) {
        console.error("Failed to connect to the db", err);
        process.exit(1);
    }
};

export default connectToDatabase;