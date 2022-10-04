import {usersRepository} from "../repositories/usersRepository";

export const authService = {
    async loginUsers(login: string, password: string): Promise<boolean> {
        const statusLoginUser = await usersRepository.findUsers(login,password)
        if(statusLoginUser){
            return true
        }else {
            return false
        }
    }
}