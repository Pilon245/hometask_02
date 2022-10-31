import {Request, Response} from "express";
import {postsService} from "../service/postsService";
import {queryValidation} from "../middlewares/queryValidation";
import {postsQeuryRepository} from "../repositories/postsQeuryRepository";
import {commentsService} from "../service/commentsService";
import {commentsQueryRepository} from "../repositories/commentsQeuryRepository";

export const postControllers = {
    async getPost(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        if(req.user) {
            const foundRepository = await postsQeuryRepository.findPost(req.user.id, {
                pageNumber,
                pageSize,
                sortBy,
                sortDirection
            })
            return res.status(200).send(foundRepository)
        }
        if(!req.user) {
            const foundRepository = await postsQeuryRepository.findPostNoAuth({
                pageNumber,
                pageSize,
                sortBy,
                sortDirection
            })
            return res.status(200).send(foundRepository)
        }

    },
    async getPostById(req: Request, res: Response) {
        if(req.user) {
            const post = await postsQeuryRepository.findPostById(req.params.id, req.user.id)
            if (post) {
                res.status(200).send(post)
            } else {
                res.send(404)
            }
        }
        if(!req.user) {
            const post = await postsQeuryRepository.findPostByIdNoAuth(req.params.id)
            if (post) {
                res.status(200).send(post)
            } else {
                res.send(404)
            }
        }
    },
    async getPostOnBlog(req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection} = queryValidation(req.query)
        if(req.user) {
            const posts = await postsQeuryRepository.findPostOnBlog(
                req.params.blogId,
                req.user.id,
                {
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortDirection
                })
            if (posts) {
                res.status(200).send(posts)
            } else {
                res.sendStatus(404)
            }
        }
        if(!req.user) {
            const posts = await postsQeuryRepository.findPostOnBlogNoAuth(
                req.params.blogId,
                {
                    pageNumber,
                    pageSize,
                    sortBy,
                    sortDirection
                })
            if (posts) {
                res.status(200).send(posts)
            } else {
                res.sendStatus(404)
            }
        }
    },
    async createPost(req: Request, res: Response) {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if (newPost) {
            res.status(201).send(newPost)
        }
    },
    async createPostonBlog(req: Request, res: Response) {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.params.blogId)
        if (newPost) {
            res.status(201).send(newPost)
        }
    },
    async updatePost(req: Request, res: Response) {
        const isUpdate = await postsService.updatePost(req.params.id, req.body.title,
            req.body.shortDescription, req.body.content, req.body.blogId)
        if (isUpdate) {
            res.send(204)
        } else {
            res.sendStatus(404)
        }
    },
    async updateLike(req: Request, res: Response) {
        const isUpdate = await postsService.updateLike(
            req.user!.id,
            req.params.postId,
            req.body.likeStatus,
            req.user!.accountData.login )
        res.send(204)
    },
    async deletePost(req: Request, res: Response) {
        const isDelete = await postsService.deletePost(req.params.id)
        if (isDelete) {
            res.send(204)
        } else {
            res.sendStatus(404)
        }
    }
}

