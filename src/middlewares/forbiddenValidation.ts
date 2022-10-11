import {NextFunction, Request, Response} from "express";
import {jwtService} from "../service/jwtService";
import {usersRepository} from "../repositories/usersRepository";
import {commentsRepository} from "../repositories/commentsRepository";

export const forbiddenValidation = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = await commentsRepository.findCommentById(req.params.commentId)

    if(req.user!.login === commentId?.userLogin){
        next()
        return
    }
    res.sendStatus(403)
}