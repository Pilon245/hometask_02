import {postRepository} from "../repositories/postRepository";
import {blogsRepository} from "../repositories/blogsRepository";
import {Router, Request, Response} from "express";
import {blogsService} from "../service/blogsService";
import {postsService} from "../service/postsService";

export const delControllers = {
    async deleteAllData(req: Request, res: Response ) {
        const delBlog = await blogsService.deleteAllBlogs()
        const delPost = await postsService.deleteAllPost()
        return res.sendStatus(204)
    }
}