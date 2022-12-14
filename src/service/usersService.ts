import {UserAccountDBType} from "../types/usersTypes";
import bcrypt from "bcrypt";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";
import add from "date-fns/add";
import {v4 as uuidv4} from "uuid";
import {UsersRepository} from "../repositories/usersRepository";

export class UsersService {
    usersRepository: UsersRepository
    constructor() {
        this.usersRepository =  new UsersRepository()
    }

    async findUserById(id: string, ) {
        const user = await this.usersRepository.findUserById(id)
        //todo тут как правильнее выводить
        const userOutput = {
            email: user?.accountData.email,
            login: user?.accountData.login,
            userId: user?.id
        }
        return userOutput
    }
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await this.usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        const passwordHash = await _generatePasswordForDb(password)
        const isValid = await bcrypt.compare(password, user.accountData.passwordHash)
        if (!isValid) {
            return false
        }
        return user
    }
    async checkRefreshToken(loginOrEmail: string){
        const user = await this.usersRepository.findLoginOrEmail(loginOrEmail)
        if (!user) {
            return false
        }
        return user
    }
    async createUsers(login: string,password: string, email: string): Promise<UserAccountDBType> {
        const passwordHash = await _generatePasswordForDb(password)
        // const newUsers : UserAccountDBType = {
        //     id: String(+new Date()),
        //     accountData: {
        //         login: login,
        //         email: email,
        //         passwordHash,
        //         createdAt: new Date().toISOString()
        //     },
        //     emailConfirmation: {
        //         confirmationCode: uuidv4(),
        //         expirationDate: add(new Date(), {hours: 1, minutes: 1}),
        //         isConfirmed: false
        //     },
        //     passwordConfirmation: {
        //         confirmationCode: uuidv4(),
        //         expirationDate: add(new Date(), {hours: 1, minutes: 1}),
        //         isConfirmed: false
        //     }
        // }
        const newUsers = new UserAccountDBType(
             String(+new Date()),
            {
                login: login,
                email: email,
                passwordHash,
                createdAt: new Date().toISOString()
            },
             {
                 confirmationCode: uuidv4(),
                 expirationDate: (add(new Date(), {hours: 1, minutes: 1})),
                 isConfirmed: false
            },
             {
                 confirmationCode: uuidv4(),
                 expirationDate: add(new Date(), {hours: 1, minutes: 1}),
                 isConfirmed:  false
            }
        )

        const createdUser = await this.usersRepository.createUsers(newUsers)
        // try {
        //     await emailManager.sendPasswordRecoveryMessage(newUsers)
        //
        // }catch (error) {
        //     await usersRepository.deleteUsers(newUsers.id)
        //     return null
        // }
        return newUsers
    }

    async deleteUsers(id: string): Promise<boolean> {
        return await this.usersRepository.deleteUsers(id)
    }
    async deleteAllUsers() {
        return await this.usersRepository.deleteAllUsers()
    }
}

export const usersService = new UsersService()