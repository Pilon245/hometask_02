import {Request, Response} from "express";
import {blogsService} from "../service/blogsService";
import {commentsService} from "../service/commentsService";
import {queryValidation} from "../middlewares/queryValidation";
import {postsQeuryRepository} from "../repositories/postsQeuryRepository";
import {commentsQueryRepository} from "../repositories/commentsQeuryRepository";

export const commentsControllers = {
    async getComment(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const foundComments = await commentsQueryRepository.findUsers({
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        })
        return res.status(200).send(foundComments)
    },
    async createComment(req: Request, res: Response) {
        const newComment = await commentsService.createComment(req.body.content, req.user!.id, req.user!.login)
        if (newComment) {
            res.status(201).send(newComment)
        }
    },
}