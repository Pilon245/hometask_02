import {usersRepository} from "../repositories/usersRepository";
import {emailManager} from "../managers/emailManager";

export const authService = {
    async loginUsers(login: string, password: string): Promise<boolean> {
        const statusLoginUser = await usersRepository.findUsers(login,password)
        if(statusLoginUser){
            return true
        }else {
            return false
        }
    },
    async sendEmail(email: string) {
        // save to repo
        // get user to repo
      await emailManager.sendPasswordRecoveryMessage(email)
    },
    async confirmationEmail(code: string) {
        let user = await usersRepository.findUserByConfirmationCode(code)
        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return  false
        let result = await usersRepository.updateConfirmation(user.id)
        return result
    }
}