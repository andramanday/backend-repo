import express from "express";
import UserController from "../controllers/user.controller";


const UserRoute = express.Router()
const userController = new UserController();

UserRoute.get('/', userController.showUsers)
UserRoute.get('/:id', userController.showUserById)
UserRoute.post('/', userController.addUser)
UserRoute.put('/:id', userController.editUser)
UserRoute.delete('/:id', userController.deleteUser)

export default UserRoute;