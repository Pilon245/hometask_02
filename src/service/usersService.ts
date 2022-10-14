import {ObjectId} from "mongodb";
import {OutputUsersDbType, UserAccountDBType, UsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";
import add from "date-fns/add";
import {v4 as uuidv4} from "uuid";

export const usersService = {
    async findUserById(id: string, ) {
        const user = await usersRepository.findUserById(id)
        return user
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        const passwordHash = await _generatePasswordForDb(password)
        // if (user.passwordHash !== passwordHash) {
        const isValid = await bcrypt.compare(password, user.passwordHash)
        console.log("isValid", isValid)
        if (!isValid) {
            return false
        }
        return user
    },
    async createUsers(login: string,password: string, email: string): Promise<UserAccountDBType> {
        const passwordHash = await _generatePasswordForDb(password)
        const newUsers: UserAccountDBType = {
            id: String(+new Date()),
            accountData: {
                login: login,
                email: email,
                passwordHash,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                isConfirmed: false
            }}

        const createdUser = await usersRepository.createUsers(newUsers)

        return newUsers
    },
    async deleteUsers(id: string): Promise<boolean> {
        return await usersRepository.deleteUsers(id)
    },
    async deleteAllUsers() {
        return await usersRepository.deleteAllUsers()
    }

}