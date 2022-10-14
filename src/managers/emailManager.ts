import {Request, Response} from "express";
import {emailAdapter} from "../adapters/emailAdapter";
import {usersService} from "../service/usersService";

export const emailManager  = {
    async sendPasswordRecoveryMessage(user: any) {
        await emailAdapter.sendEmail(user.email, user.code)
    }
}