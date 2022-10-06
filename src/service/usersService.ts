import {ObjectId} from "mongodb";
import {OutputUsersDbType, UsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";

export const usersService = {
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        // const passwordHash = await _generatePasswordForDb(password)
        const passwordHash = await this._generatePasswordForDb(password)
        // if (user.passwordHash !== passwordHash) {
        const isValid = await bcrypt.compare(password, user.passwordHash)
        console.log("isValid", isValid)
        if (!isValid) {
            return false
        }
        return true
    },
    async _generatePasswordForDb(password: string, ) {
        // const salt = await bcrypt.genSalt(6)
        const hash = await bcrypt.hash(password, 6)
        return hash
    },
    async createUsers(login: string,password: string, email: string): Promise<OutputUsersDbType> {
        console.log("create password",password)
        const passwordHash = await this._generatePasswordForDb(password)
        console.log("create Hash",passwordHash)
        const newUsers: UsersDbType = {
            _id: new ObjectId(),
            id: String(+new Date()),
            login: login,
            passwordHash,
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