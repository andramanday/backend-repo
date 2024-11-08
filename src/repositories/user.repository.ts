import admin, { db } from '../config/firebase.config';
import { User } from '../entites/user.entity';
import ResponseApp from '../utils/response.interface';

class UserRepository {
    findAll = async (): Promise<User[]> => {
        const users: User[] = [];
        try {
            const listUsers = await admin.auth().listUsers();
            listUsers.users.forEach((doc) => {
                users.push({ uid: doc.uid, name: doc.displayName, email: doc.email, disabled: doc.disabled } as User);
            });
            return users;
        } catch (error) {
            console.error('Error fetching all users:', error);
            throw new Error('Failed to fetch users');
        }
    }

    findById = async (uid: string): Promise<User | null> => {
        const resUser = await admin.auth().getUser(uid)
        if(!resUser){
            return null;
        }
        const user: User = {
            uid: resUser.uid,
            name: resUser.displayName || "",
            email: resUser.email || "",
            emailVerified: resUser.emailVerified,
            disabled: resUser.disabled
        }
        return user;
    }
    
    findByEmail = async (email: string): Promise<User | null> => {
        const resUser = await admin.auth().getUserByEmail(email)
        if(!resUser){
            return null;
        }
        const user: User = {
            uid: resUser.uid,
            name: resUser.displayName || "",
            email: resUser.email || "",
            emailVerified: resUser.emailVerified,
            disabled: resUser.disabled
        }
        return user;
    }

    udpate = async (id: string, updateData: { email?: string; password?: string; displayName?: string }): Promise<any> => {
        return await admin.auth().updateUser(id, updateData);
    }

    delete = async (id: string,): Promise<any> => {
        return await admin.auth().deleteUser(id);
    }

}

export default UserRepository;