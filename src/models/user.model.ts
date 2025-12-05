import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../Interfaces/IUser";

const userSchema = new Schema<IUser>({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type: String,
    },
    address:{
        type: String
    },
    password:{
        type: String,
        required: true
    },
    isVerified:{
        type:Boolean,
        default: false
    },
    token:{
        type:String
    }
    
},{timestamps:true})


const User = mongoose.model<IUser>("User", userSchema);

export default User; 