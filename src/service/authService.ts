import {usersRepository} from "../repositories/usersRepository";
import {emailManager} from "../managers/emailManager";
import {v4 as uuidv4} from "uuid";

export const authService = {
    async confirmationEmail(code: string) {
        let user = await usersRepository.findUserByConfirmationCode(code)
        let result = await usersRepository.updateConfirmation(user!.id)
        return result
    },
    async updateCode(email: string) {
        let user = await usersRepository.findLoginOrEmail(email)
        const newCode = uuidv4()
        let result = await usersRepository.updateCode(user!.id, newCode)
        return result
    }
}