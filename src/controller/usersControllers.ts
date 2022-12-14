import {Request, Response} from "express";
import {queryValidation} from "../middlewares/queryValidation";
import {usersQueryRepository} from "../repositories/usersQueryRepository";
import {UsersService, usersService} from "../service/usersService";
import {OutputUsersDbType} from "../types/usersTypes";


export class UsersControllers  {
    userService: UsersService
    constructor() {
        this.userService = new UsersService()
    }
    async getUsers ( req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection, searchLoginTerm, searchEmailTerm} = queryValidation(req.query)
        const foundUsers = await usersQueryRepository.findUsers({
            searchLoginTerm, searchEmailTerm, sortDirection, sortBy, pageSize, pageNumber
        })
        return res.status(200).send(foundUsers)
    }
    async createUsers ( req: Request, res: Response) {
        const newUsers = await usersService.createUsers(req.body.login,req.body.password, req.body.email)
        const outCreateUser: OutputUsersDbType = {
            id: newUsers.id,
            login: newUsers.accountData.login,
            email: newUsers.accountData.email,
            createdAt: newUsers.accountData.createdAt
        }
        return res.status(201).send(outCreateUser)

    }
    async deleteUsers( req: Request, res: Response) {
        const isDelete = await usersService.deleteUsers(req.params.id)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}

export const usersControllers =  new UsersControllers()