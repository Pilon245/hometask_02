import {ObjectId} from "mongodb";
import {OutputUsersDbType, UserAccountDBType, UsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";
import bcrypt from "bcrypt";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";
import add from "date-fns/add";
import {v4 as uuidv4} from "uuid";
import {emailManager} from "../managers/emailManager";
import {jwtService} from "./jwtService";

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

        // if (!user.emailConfirmation.isConfirmed){
        //     return null
        // }

        const passwordHash = await _generatePasswordForDb(password)
        // if (user.passwordHash !== passwordHash) {
        const isValid = await bcrypt.compare(password, user.accountData.passwordHash)
        console.log("isValid", isValid)
        if (!isValid) {
            return false
        }
        return user
    },
    async checkRefreshToken(loginOrEmail: string){
        const user = await usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        return user
    },
    async createUsers(login: string,password: string, email: string): Promise<UserAccountDBType> {
        const passwordHash = await _generatePasswordForDb(password)
        const newUsers : UserAccountDBType = {
            id: String(+new Date()),
            accountData: {
                login: login,
                email: email,
                passwordHash,
                accessToken: "",
                refreshToken: "",
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                isConfirmed: false
            }}

        const createdUser = await usersRepository.createUsers(newUsers)
        // try {
        //     await emailManager.sendPasswordRecoveryMessage(newUsers)
        //
        // }catch (error) {
        //     await usersRepository.deleteUsers(newUsers.id)
        //     return null
        // }
        return newUsers
    },
    async deleteUsers(id: string): Promise<boolean> {
        return await usersRepository.deleteUsers(id)
    },
    async deleteAllUsers() {
        return await usersRepository.deleteAllUsers()
    }

}