//define your user repository here
import User from "../models/user.model";
import { CreateUserDTO } from "../Interfaces/auth.interface";

export class UserRepository {
    async findByEmail(email:string):Promise<typeof User | null> {
        return User.findOne({email});
    }

    async createUser(user:CreateUserDTO):Promise<any> {
      const newUser = new User({
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.email,
        password:user.password
      });
      return newUser.save();
    }
}