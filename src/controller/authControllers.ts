import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";
import {jwtService} from "../service/jwtService";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const authAccount = await usersService.checkCredentials(req.body.login, req.body.password)
        if(authAccount) {
            const token = await jwtService.createdJWT(authAccount)
            return res.send(token)
        }else {
            return res.sendStatus(401)
        }
    },
    async myAccount(req: Request, res: Response) {
    const Account = await usersService.findUserById(req.user!._id)
    return res.sendStatus(204).send(Account)

}
}