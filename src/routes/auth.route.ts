import express from "express";
import UserController from "../controllers/user.controller";


const AuthRoute = express.Router()
const userController = new UserController();

AuthRoute.get('', userController.showUsers)
AuthRoute.get('/:id', userController.showUserById)

export default AuthRoute;