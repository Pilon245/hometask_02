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
    }
}