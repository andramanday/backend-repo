import { Express, Request } from "express";
import UserRepository from "../repositories/user.repository";
import ResponseApp from "../utils/response.interface";
import admin from "../config/firebase.config";

// Client-side Mustbe
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../config/firebase-client.config";

class UserService {
  userRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  showUsers = async (req: Request): Promise<ResponseApp<any>> => {
    try {
      const users = await this.userRepository.findAll();
      return new ResponseApp(200, `show users`, users)
    } catch (error) {
      console.error(error);
      return new ResponseApp(500, `Failed to fetch users`, null)
    }
  }

  showUserById = async (req: Request): Promise<ResponseApp<any>> => {
    const { id } = req.params;
    try {
      const users = await this.userRepository.findById(id);
      return new ResponseApp(200, `show users id ${id}`, users)
    } catch (error) {
      console.error(error);
      return new ResponseApp(404, `Failed to fetch users`, null)
    }
  }

  insertUser = async (req: Request): Promise<ResponseApp<any>> => {
    const { email, password, name } = req.body
    const existEmail = await this.userRepository.findByEmail(email);

    if (existEmail) {
      return new ResponseApp(400, `Email ${email} already registred`, null)
    }

    if (!email || !password || name) {
      return new ResponseApp(400, 'Validation Input Failed', null)
    }

    try {
      const insertUser = await admin.auth().createUser({
        email,
        password,
        displayName: name,
        emailVerified: false,
        disabled: false,
      })
      return new ResponseApp(201, "User created successfully!", insertUser)
    } catch (error) {
      return new ResponseApp(500, "Failed to create user", null)
    }
  }

  // Update User
  updateUser = async (req: Request): Promise<ResponseApp<any>> => {
    const { id } = req.params
    const { email, password, displayName } = req.body
    try {
      const updatedUser = await this.userRepository.udpate(id, { email, password, displayName });
      return new ResponseApp(200, "User updated successfully!", updatedUser);
    } catch (error) {
      console.error(error);
      return new ResponseApp(500, "Failed to update user", null);
    }
  };

  // Delete User
  deleteUser = async (req: Request): Promise<ResponseApp<any>> => {
    const { id } = req.params
    try {
      const result = await this.userRepository.delete(id);
      return new ResponseApp(200, `User with id ${id} deleted successfully`, null);
    } catch (error) {
      console.error(error);
      return new ResponseApp(500, `Failed to delete user with id ${id}`, null);
    }
  };
  

  signInUser = async (req: Request): Promise<ResponseApp<any>> => {
    const { email, password } = req.body
    if (!email || !password) {
      return new ResponseApp(400, 'Validation Input Failed', null)
    }
    return await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user
        if (user) {
          return new ResponseApp(400, 'User logged in successfully', user)
        } else {
          return new ResponseApp(500, 'Internal Server Error', null)
        }
      })
      .catch((error) => {
        console.error(error);
        const errorMessage = error.message || "An error occurred while logging in";
        return new ResponseApp(500, errorMessage, null)
      });
  }
}

export default UserService;