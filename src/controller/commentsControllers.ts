import {Request, Response} from "express";
import {blogsService} from "../service/blogsService";
import {commentsService} from "../service/commentsService";
import {queryValidation} from "../middlewares/queryValidation";
import {postsQeuryRepository} from "../repositories/postsQeuryRepository";
import {commentsQueryRepository} from "../repositories/commentsQeuryRepository";
import {postsService} from "../service/postsService";
import {usersService} from "../service/usersService";

export const commentsControllers = {
    async getComment(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        const foundComments = await commentsQueryRepository.findCommentOnPost(req.params.postId,{
            pageNumber,
            pageSize,
            sortBy,
            sortDirection
        })
        return res.status(200).send(foundComments)
    },
    async getCommentById(req: Request, res: Response) {
        const comment = await commentsService.findCommentById(req.params.id)
        if(comment) {
            res.status(200).send(comment)
        } else {
            res.send(404)
        }
    },
    async createComment(req: Request, res: Response) {
        const newComment = await commentsService.createComment(
            req.body.content,
            req.user!.id,
            req.user!.login,
            req.params.postId)
        if (newComment) {
            res.status(201).send(newComment)
        }
    },
    async updateComment(req: Request, res: Response) {
        const isUpdate = await commentsService.updateComment(req.params.commentId, req.body.content )
        if (isUpdate) {
            res.send(204)
        } else {
            res.sendStatus(404)
        }
    },
    async deleteComment( req: Request, res: Response) {
        const isDelete = await commentsService.deleteComment(req.params.commentId)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}