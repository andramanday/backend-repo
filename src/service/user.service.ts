import { Express, Request, Response } from "express";
import UserRepository from "../repositories/user.repository";
import ResponseApp from "../utils/response.interface";

class UserService {
    userRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }

    showUsers = async ():Promise<ResponseApp<any>> =>{
        const result = await this.userRepository.findAll();

        return new ResponseApp(200, `show users`, result)
    }

    showUserById = async (id: string):Promise<ResponseApp<any>> =>{
        const result = await this.userRepository.findById(id);
        return new ResponseApp(200, `show user by id ${id}`, null)
    }

}

export default UserService;