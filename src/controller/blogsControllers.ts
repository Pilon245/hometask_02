import {Router, Request, Response} from "express";
import {blogs, blogsRepository} from "../repositories/blogsRepository";



export const blogsControllers = {
    async getBlogs( req: Request, res: Response) {
        const foundRepository = await blogsRepository.findBlogs(req.params.id)
        return res.status(200).send(foundRepository)
    },
    async getBlogsById(req: Request, res: Response) {
        const blog = await blogsRepository.findBlogsById(req.params.id)
        if(blog) {
            res.status(200).send(blog)
        } else {
            res.send(404)
        }
    },
    async createBlogs( req: Request, res: Response) {
        const newBlog = await blogsRepository.makeBlogs(req.body.name, req.body.youtubeUrl)
        if(newBlog){
            res.status(201).send(newBlog)
        }
    },
    async updateBlogs( req: Request, res: Response) {
        const isUpdate = await blogsRepository.replaceBlogs(req.params.id, req.body.name, req.body.youtubeUrl)
        if(isUpdate) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    },
    async deleteBlogs( req: Request, res: Response) {
        const isDelete = blogsRepository.removeBlogs(req.params.id)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}

