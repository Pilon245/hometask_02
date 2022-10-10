import {Request, Response} from "express";
import {authService} from "../service/authService";
import {usersService} from "../service/usersService";
import {jwtService} from "../service/jwtService";
import {ObjectId} from "mongodb";

export const authControllers = {
    async singInAccount(req: Request, res: Response) {
        const user = await usersService.checkCredentials(req.body.login, req.body.password)
        if(user) {
            const token = await jwtService.createdJWT(user)
            return res.status(200).send(token)
        }else {
            return res.sendStatus(401)
        }
    },
    async myAccount(req: Request, res: Response) {
    const Account = await usersService.findUserById(req.user!.id)
    return  res.status(200).send(Account)

}
}