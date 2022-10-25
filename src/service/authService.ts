import {usersRepository} from "../repositories/usersRepository";
import {emailManager} from "../managers/emailManager";
import {v4 as uuidv4} from "uuid";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";

export const authService = {
    async confirmationEmail(code: string) {
        let user = await usersRepository.findUserByConfirmationEmailCode(code)
        let result = await usersRepository.updateEmailConfirmation(user!.id)
        return result
    },
    async confirmationPassword(code: string) {
        let user = await usersRepository.findUserByConfirmationEmailCode(code)
        let result = await usersRepository.updateEmailConfirmation(user!.id)
        return result
    },
    async updateEmailCode(email: string) {
        let user = await usersRepository.findLoginOrEmail(email)
        const newCode = uuidv4()
        let result = await usersRepository.updateEmailCode(user!.id, newCode)
        return result
    },
    async updatePasswordCode(email: string) {
        let user = await usersRepository.findLoginOrEmail(email)
        const newCode = uuidv4()
        let result = await usersRepository.updatePasswordCode(user!.id, newCode)
        return result
    },
    async updatePasswordUsers(code: string, password: string) {
        let user = await usersRepository.findUserByConfirmationPasswordCode(code)
        const passwordHash = await _generatePasswordForDb(password)
        const update = usersRepository.updatePasswordUsers(user!.id, password)
        return update
    },
}