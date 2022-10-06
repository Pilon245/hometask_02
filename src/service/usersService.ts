import {ObjectId} from "mongodb";
import {OutputUsersDbType, UsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {generatePasswordForDb} from "../helpers/getSkipNumber";

export const usersService = {
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        console.log("login",password)
        const passwordHash = await generatePasswordForDb(password)
        console.log("auth", passwordHash)
        if (user.passwordHash !== passwordHash) {
            return false
        }
        return true
    },
    async createUsers(login: string,password: string, email: string): Promise<OutputUsersDbType> {
        // const passwordSalt = await bcrypt.genSalt(10)
        console.log("create password",password)
        const passwordHash = await generatePasswordForDb(password)
        console.log("create Hash",passwordHash)
        const newUsers: UsersDbType = {
            _id: new ObjectId(),
            id: String(+new Date()),
            login: login,
            passwordHash: passwordHash,
            // passwordSalt: passwordSalt,
            email: email,
            createdAt: new Date().toISOString()
        }
        const createdUser = await usersRepository.createUsers(newUsers)
        const outCreateUser: OutputUsersDbType = {
            id: createdUser._id,
            login: createdUser.login,
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