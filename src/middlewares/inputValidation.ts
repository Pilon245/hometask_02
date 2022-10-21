import {Response, Request, NextFunction} from 'express';
import {validationResult} from "express-validator";
import {jwtService} from "../service/jwtService";
import {usersService} from "../service/usersService";
import {usersRepository} from "../repositories/usersRepository";
import {v4 as uuidv4} from "uuid";
import {ObjectId} from "mongodb";
import {blogsQueryRepository} from "../repositories/blogsQeuryRepository";
import cookieParser from "cookie-parser";


export const inputBodyValidation = (req: Request, res: Response, next: NextFunction)  => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map( (error)  => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(400).send({"errorsMessages": errorsArray})
    } else {
       next()
}
}
export const inputQueryValidation = (req: Request, res: Response, next: NextFunction)  => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.sendStatus(404)
    } else {
        next()
    }
}
export const authTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    const payload = await jwtService.getUserIdByRefreshToken(token.split(".")[1])
    if (userId) {
        req.user = await usersRepository.findUserById(userId)
            next()
        return
    }
    res.sendStatus(401)
}
export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.send(401)
        return
    }
    const token = refToken.split(' ')[0]




    const findRefToken = await usersRepository.findRefreshToken(refToken)
    if(!findRefToken) {
        res.sendStatus(401)
        return
    }

    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersRepository.findUserById(userId)
        next()
        return
    }
    res.sendStatus(401)
}
//todo перенести авторизацю

// export const inputAuthValidation = (req: Request, res: Response, next: NextFunction) => {
//     export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//         const creds = 'admin:qwerty'
//         const authHeader = req.headers.authorization
//         const base64Data = new Buffer(creds);
//         let base64String = base64Data.toString('base64');
//         const validAuthHeader = `Basic ${base64String}`
//
//         if (!authHeader || typeof authHeader !== "string" || authHeader !== validAuthHeader) {
//             res.sendStatus(401);
//         } else {
//             next()
//         }
//     }
