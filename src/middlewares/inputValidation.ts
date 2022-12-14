import {Response, Request, NextFunction} from 'express';
import {validationResult} from "express-validator";
import {jwtService} from "../service/jwtService";
import {usersRepository} from "../repositories/usersRepository";
import {payloadRefreshToken} from "../helpers/getSkipNumber";
import {BlockIpModelClass, ConnectionsModelClass} from "../repositories/db";
import {sessionRepository} from "../repositories/sessionRepository";


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
    export const inputBodyNotViewValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(400)
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
    if (userId) {
        req.user = await usersRepository.findUserById(userId)
        next()
        return
    }
    res.sendStatus(401)
}
export const TokenOnCommentIdMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return next()
    }

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if (userId) {
        req.user = await usersRepository.findUserById(userId)
        next()
        return
    }
    return  next()
}
export const refreshTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const refToken = req.cookies.refreshToken
    if (!refToken) {
        res.sendStatus(401)
        return
    }
    const token = refToken.split(' ')[0]

    // const userId = await jwtService.getUserIdByToken(token)
    // if (!userId) return res.sendStatus(401)

    const foundUser = await jwtService.getUserIdByRefreshToken(token)
    if (!foundUser) return res.sendStatus(401)

    // console.log("foundUser", foundUser)

    const foundLastDate = await sessionRepository.findDevicesByDeviceId(foundUser.deviceId)
    // console.log("foundUser.iat", new Date(foundUser.iat * 1000).toISOString())
    // console.log("foundLastDate!.lastActiveDate", foundLastDate!.lastActiveDate)
    if(foundLastDate!.lastActiveDate !== new Date(foundUser.iat * 1000).toISOString()) return res.sendStatus(401)

    const user = await usersRepository.findUserById(foundUser.id)
    if (!user) return res.sendStatus(401)
    const payload = await payloadRefreshToken(refToken)
    // const isValid = await usersRepository.findTokenByUserIdAndDeviceId(user.id, payload.deviceId)
    // if(!isValid) return res.sendStatus(401)
    req.user = user
    return next()

}
export const connectionControlMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const maxCountOfConnections = 5
    const blockInterval = 10000

    const connectionAt = +new Date()
    const ip = req.ip
    const endpoint = req.url.split('/')[2]

    const isBlocked = await BlockIpModelClass.findOne({ip, endpoint,
        blockedAt: {$gte: (connectionAt - blockInterval)}})
    if (isBlocked) return res.sendStatus(429)

    const connectionsCount = await ConnectionsModelClass.countDocuments({ip, endpoint,
        connectionAt: {$gte: (connectionAt - blockInterval)}})
    if (connectionsCount + 1 > maxCountOfConnections) {
        await BlockIpModelClass.insertMany({ip, endpoint, blockedAt: connectionAt})
        return res.sendStatus(429)
    }

    await ConnectionsModelClass.insertMany({ip, endpoint, connectionAt})
    return next()
}
