export interface CreateUserDTO {
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

export interface IAuthService {
    createUser(input:CreateUserDTO):Promise<any>;
    login(email: string, password: string): Promise<string>;
};
