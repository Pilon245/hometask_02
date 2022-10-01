import {Router, Request, Response} from "express";
import { blogsRepository} from "../repositories/blogsRepository";
import {postRepository} from "../repositories/postRepository";
import {postsService} from "../service/postsService";

export const postControllers = {
    async getPost( req: Request, res: Response) {
        const foundRepository = await postsService.findPost()
        return res.status(200).send(foundRepository)
    },
    async getPostById(req: Request, res: Response) {
        const post = await postsService.findPostById(req.params.id)
        if(post) {
            res.status(200).send(post)
        } else {
            res.send(404)
        }
    },
    async createPost( req: Request, res: Response) {
        const newPost = await postsService.createPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
        if(newPost){
            res.status(201).send(newPost)
        }
    },
    async updatePost( req: Request, res: Response) {
        const isUpdate = await postsService.updatePost(req.params.id,req.body.title,
            req.body.shortDescription, req.body.content, req.body.blogId)
        if(isUpdate) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    },
    async deletePost( req: Request, res: Response) {
        const isDelete = await postsService.deletePost(req.params.id)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}

