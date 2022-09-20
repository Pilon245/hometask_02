import {postRepository} from "../repositories/postRepository";
import {blogsRepository} from "../repositories/blogsRepository";
import {Router, Request, Response} from "express";

export const delControllers = {
    async deleteAllData(req: Request, res: Response ) {
        const delBlog = await blogsRepository.deleteAllBlogs()
        const delPost = await postRepository.deleteAllPost()
        return res.sendStatus(204)
    }
}