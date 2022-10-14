import {Request, Response} from "express";
import {emailAdapter} from "../adapters/emailAdapter";
import {usersService} from "../service/usersService";

export const emailManager  = {
    async sendPasswordRecoveryMessage(user: any) {
        await emailAdapter.sendEmail(user.accountData.email, user.emailConfirmation.confirmationCode)
    }
}