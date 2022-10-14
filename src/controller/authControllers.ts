import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";
import {jwtService} from "../service/jwtService";
import nodemailer from 'nodemailer'
import {emailAdapter} from "../adapters/emailAdapter";
import {OutputUsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const token = await jwtService.createdJWT(user)
            const result = {accessToken: token}
            return res.status(200).send(result)
        } else {
            return res.sendStatus(401)
        }
    },
    async myAccount(req: Request, res: Response) {
        const Account = await usersService.findUserById(req.user!.id)
        return res.status(200).send(Account)
    },
    async createRegistrationUser(req: Request, res: Response) {
        const newUsers = await usersService.createUsers(req.body.login, req.body.password, req.body.email)
        const emailSend = await emailAdapter.sendEmail(newUsers.accountData.email, newUsers.emailConfirmation.confirmationCode)
        return res.sendStatus(204)
    },
    async confirmationEmail(req: Request, res: Response) {
        const result = await authService.confirmationEmail(req.body.code)
        res.sendStatus(204)
    },
    async resendingEmail(req: Request, res: Response) {
        const user = await usersRepository.findLoginOrEmail(req.body.email)
        const emailSend = await emailAdapter.sendEmail(user!.accountData.email, user!.emailConfirmation.confirmationCode)
        return res.sendStatus(204)

    },
}
