import {NextFunction, Request, Response} from "express";
import {jwtService} from "../service/jwtService";
import {usersRepository} from "../repositories/usersRepository";
import {commentsRepository} from "../repositories/commentsRepository";
import {sessionRepository} from "../repositories/sessionRepository";

export const forbiddenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = await commentsRepository.findCommentById(req.params.commentId)

    if(req.user!.accountData.login === commentId?.userLogin){
        next()
        return
    }
    res.sendStatus(403)
}
export const findDeviceIdOnUserId = async (req: Request, res: Response, next: NextFunction) => {
    const deviceId = await sessionRepository.findDevicesByDeviceId(req.user!.id, req.params.deviceId)
    if (deviceId) {
        next()
        return
    }
    res.sendStatus(403)
}