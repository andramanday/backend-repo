import { Express, Request, Response } from "express";
import UserService from "../service/user.service";

class UserController {
    userService;
    constructor(){
        this.userService = new UserService();
    }

    showUsers = async (req: Request, res: Response) => {
        const result = await this.userService.showUsers();

        res.status(result.code).send(result);
    }

    showUserById = async (req: Request, res: Response) => {
        const userId = req.params.id;
        const result = await this.userService.showUserById(userId);

        res.status(result.code).send(result);
    }

}

export default UserController;