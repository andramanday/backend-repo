import express from "express";
import UserController from "../controllers/user.controller";


const AuthRoute = express.Router()
const userController = new UserController();

AuthRoute.post('/login', userController.signInUser)
// AuthRoute.post('/logout', userController.signOutUser)

export default AuthRoute;