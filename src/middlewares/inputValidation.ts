import {Response, Request, NextFunction} from 'express';
import {validationResult} from "express-validator";
import {jwtService} from "../service/jwtService";
import {usersService} from "../service/usersService";
import {usersRepository} from "../repositories/usersRepository";
import {v4 as uuidv4} from "uuid";
import {ObjectId} from "mongodb";
import {blogsQueryRepository} from "../repositories/blogsQeuryRepository";
import cookieParser from "cookie-parser";
import {blockIpCollection, connectionsCountCollection} from "../repositories/db";
import { secondsToMilliseconds } from 'date-fns'


export const inputBodyValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map((error) => {
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
export const inputQueryValidation = (req: Request, res: Response, next: NextFunction) => {
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
        res.sendStatus(401)
        return
    }
    const token = refToken.split(' ')[0]


    // const findRefToken = await usersRepository.findRefreshToken(refToken)
    // if(!findRefToken) {
    //     res.sendStatus(401)
    //     return
    // }

    const userId = await jwtService.getUserIdByToken(token)
    if (!userId) return res.sendStatus(401)
    const user = await usersRepository.findUserById(userId)
    if (!user) return res.sendStatus(401)
    req.user = user
    return next()

}
export const connectionControlMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const maxCountOfConnections = 4
    const blockInterval = 10000

    const connectionAt = +new Date()
    const ip = req.ip
    const endpoint = req.url.split('/')[2]

    const isBlocked = await blockIpCollection.findOne({ip, endpoint,
        blockedAt: {$gte: (connectionAt - blockInterval)}})
    if (isBlocked) return res.sendStatus(429)
    const connectionsCount = await connectionsCountCollection.countDocuments({ip, endpoint,
        connectionAt: {$gte: (connectionAt - blockInterval)}})
    if (connectionsCount + 1 > maxCountOfConnections) {
        await blockIpCollection.insertOne({ip, endpoint, blockedAt: connectionAt})
        return res.sendStatus(429)
    }
    await connectionsCountCollection.insertOne({ip, endpoint, connectionAt})
    return next()
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
