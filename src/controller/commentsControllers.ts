import {Request, Response} from "express";
import {commentsService} from "../service/commentsService";
import {queryValidation} from "../middlewares/queryValidation";
import {commentsQueryRepository} from "../repositories/commentsQeuryRepository";
import {LikeValue} from "../types/commentsTypes";

export const commentsControllers = {
    async getComment(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        if(req.user) {
            const foundComments = await commentsQueryRepository.findCommentOnPost(req.params.postId, req.user.id,
                {
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortDirection
                })
            return res.status(200).send(foundComments)
        }
        if(!req.user){
            const foundComments = await commentsQueryRepository.findCommentOnPostNoAuth(req.params.postId,
                {
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortDirection
                })
            return res.status(200).send(foundComments)
        }
    },
    async getCommentById(req: Request, res: Response) {
        console.log("req.user", req.user)
        if(req.user) {
            const comment = await commentsQueryRepository.findComments(req.params.id, req.user.id)
            if(comment) {
                res.status(200).send(comment)
            } else {
                res.send(404)
            }
        }
        if(!req.user) {
            const comment = await commentsQueryRepository.findCommentsNotAuth(req.params.id)
            if(comment) {
                res.status(200).send(comment)
            } else {
                res.send(404)
            }
        }

        // const comment = await commentsService.findCommentById(req.params.id)
        // if(comment) {
        //     res.status(200).send(comment)
        // } else {
        //     res.send(404)
        // }
    },
    async createComment(req: Request, res: Response) {
        const newComment = await commentsService.createComment(
            req.params.postId,
            req.body.content,
            req.user!.id,
            req.user!.accountData.login
            )
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
    async updateLike(req: Request, res: Response) {


        const isUpdate = await commentsService.updateLike(req.user!.id, req.params.commentId, req.body.likeStatus )
        console.log("isUpdate", isUpdate)
        res.send(204)
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