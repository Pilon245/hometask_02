import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";
import {jwtService} from "../service/jwtService";
import {emailAdapter} from "../adapters/emailAdapter";
import {usersRepository} from "../repositories/usersRepository";
import {v4 as uuidv4} from "uuid";
import {sessionService} from "../service/sessionService";
import {payloadRefreshToken} from "../helpers/getSkipNumber";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if (user) {
            const deviceId = String(uuidv4())
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user,deviceId)
            await sessionService.createSession(user, req.ip, req.headers['user-agent']!,refreshToken, deviceId)
            await usersRepository.createToken(user.id, refreshToken, deviceId)
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
            const token = await payloadRefreshToken(req.cookies.refreshToken)
            const accessToken = await jwtService.createdJWT(user)
            const refreshToken = await jwtService.createdRefreshJWT(user, token.deviceId)
            await sessionService.updateSession(user, refreshToken)
            await usersRepository.updateToken(user.id, refreshToken, token.deviceId)
            const result = {accessToken: accessToken}
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
    // async logOutAccount(req: Request, res: Response) {
    //         await usersRepository.deleteToken(req.user!.id)
    //         return res.sendStatus(204)
    //    },
    async logOutAccount(req: Request, res: Response) {
        const payload = await jwtService.getUserIdByRefreshToken(req.cookies.refreshToken.split(" ")[0])
        await sessionService.deleteDevicesById(payload.deviceId)
        await usersRepository.deleteToken(req.user!.id, req.cookies.refreshToken, payload.deviceId)
        return res.sendStatus(204)
       },

}
