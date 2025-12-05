//create a class that implements the AuthService interface
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/user.model";
import { UserRepository } from "../../repository/user.repository";
import { IAuthService, CreateUserDTO } from "./auth.interface";
import dotenv from "dotenv"; 

dotenv.config(); 
export class AuthenticationService implements IAuthService {
    private userRepository:UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async createUser(input:CreateUserDTO):Promise<any> {
        //validate the input
      try{
        const {firstName, lastName, email, password} = input;

        if(!firstName || !lastName || !email || !password) {
            throw new Error("All fields are required");
        }

        //check if the user is already existing
        //we are going to use a repository pattern to check if the user is already existing
        const existingUser = await this.userRepository.findByEmail(email);
        if(existingUser){
            throw new Error("User already exists with this email, please use a different email or login");
        }

        //hash the password
        const saltRounds = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //create the user
        const newUser = await this.userRepository.createUser({
            firstName,
            lastName,
            email,
            password:hashedPassword
        });

        return await newUser.save();

      } catch(error) {
        console.log(`Error creating user: ${error}`);
        throw error;
      }

    }

    async login(email: string, password: string): Promise<string> {
        const user = await User.findOne({ email }); 
        if (!user) throw new Error("Invalid email or password");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");

        // Generate JWT
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET as string,
          { expiresIn: '1h' }
        );
        return token;
    }


};
