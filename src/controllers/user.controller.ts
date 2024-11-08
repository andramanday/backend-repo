import { Express, Request, Response } from "express";
import UserService from "../service/user.service";

class UserController {
    userService;
    constructor(){
        this.userService = new UserService();
    }

    showUsers = async (req: Request, res: Response) => {
        const result = await this.userService.showUsers(req);

        res.status(result.code).send(result);
    }

    showUserById = async (req: Request, res: Response) => {
        const result = await this.userService.showUserById(req);

        res.status(result.code).send(result);
    }

    addUser = async (req: Request, res: Response):Promise<any> => {
        const result = await this.userService.insertUser(req);

        res.status(result.code).send(result);
    }

    editUser = async (req: Request, res: Response):Promise<any> => {
        const result = await this.userService.updateUser(req);

        res.status(result.code).send(result);
    }

    deleteUser = async (req: Request, res: Response):Promise<any> => {        
        const result = await this.userService.deleteUser(req);

        res.status(result.code).send(result);
    }

    signInUser  = async (req: Request, res: Response) => {
        const result = await this.userService.signInUser(req);

        res.status(result.code).send(result);
    }

    // signOutUser  = async (req: Request, res: Response) => {
    //     const result = await this.userService.signOutUser(req);

    //     res.status(result.code).send(result);
    // }

}

export default UserController;