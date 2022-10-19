import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";
import {jwtService} from "../service/jwtService";
import nodemailer from 'nodemailer'
import {emailAdapter} from "../adapters/emailAdapter";
import {OutputUsersDbType} from "../types/usersTypes";
import {usersRepository} from "../repositories/usersRepository";
import {v4 as uuidv4} from "uuid";
import cookieParser from "cookie-parser";
import {strict} from "assert";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user)
            await usersRepository.createToken(user.id, accessToken, refreshToken) //todo  через  сервис нужно делать?
            const result = {accessToken: accessToken}
            return res.status(200).cookie("refreshToken", refreshToken,
                {expires: new Date(Date.now()+ 20000), httpOnly: true, secure: true})
                .send(result)
        } else {
            return res.sendStatus(401)
        }
    },
    async updateResfreshToken(req: Request, res: Response) {
        const user = await usersService.checkRefreshToken(req.user!.accountData.login)
        if (user) {
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user)
            await usersRepository.createToken(user.id, accessToken, refreshToken)
            const result = {accessToken: accessToken}
            console.log("user.accountData.refreshToken", user.accountData.refreshToken)
            console.log("user.accountData.accessToken", user.accountData.accessToken)
            return res.status(200).cookie("refreshToken", refreshToken,
                {expires: new Date(Date.now()+ 20000), httpOnly: true, secure: true})
                .send(result)
            //todo cookie parser
        } else {
            return res.sendStatus(401)
        }},
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
        const updateCode = await authService.updateCode(req.body.email)
        const user = await usersRepository.findLoginOrEmail(req.body.email)
        const emailSend = await emailAdapter.sendEmail(user!.accountData.email, user!.emailConfirmation.confirmationCode)
        return res.sendStatus(204)
    },
    async logOutAccount(req: Request, res: Response) {
            await usersRepository.deleteToken(req.user!.id)
            return res.sendStatus(204)
       },
}
