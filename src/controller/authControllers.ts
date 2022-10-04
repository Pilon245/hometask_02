import {Request, Response} from "express";
import {authService} from "../service/authService";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const authAccount = await authService.loginUsers(req.body.login, req.body.password)
        if(authAccount) {
            return res.sendStatus(204)
        }else {
            return res.sendStatus(401)
        }
    }
}