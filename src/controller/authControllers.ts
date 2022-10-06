import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const authAccount = await usersService.checkCredentials(req.body.login, req.body.password)
        if(authAccount) {
            return res.sendStatus(204)
        }else {
            return res.sendStatus(401)
        }
    }
}