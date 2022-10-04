import {ObjectId} from "mongodb";
import {OutputUsersDbType, UsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";

export const usersService = {
    async createUsers(login: string,password: string, email: string): Promise<OutputUsersDbType> {
        const newUsers: UsersDbType = {
            _id: new ObjectId(),
            id: String(+new Date()),
            login: login,
            password: password,
            email: email,
            createdAt: new Date().toISOString()
        }
        const createdUser = await usersRepository.createUsers(newUsers)
        const outCreateUser: OutputUsersDbType = {
            id: createdUser._id,
            login: createdUser.login,
            password: createdUser.password,
            email: createdUser.email,
            createdAt: createdUser.createdAt
        }
        return outCreateUser
    },
    async deleteUsers(id: string): Promise<boolean> {
        return await usersRepository.deleteUsers(id)
    },
    async deleteAllUsers() {
        return await usersRepository.deleteAllUsers()
    }

}