import {Request, Response} from "express";
import {blogsService} from "../service/blogsService";
import {postsService} from "../service/postsService";
import {usersService} from "../service/usersService";

export const delControllers = {
    async deleteAllData(req: Request, res: Response ) {
        const delBlog = await blogsService.deleteAllBlogs()
        const delPost = await postsService.deleteAllPost()
        const delUsers = await usersService.deleteAllUsers()
        return res.sendStatus(204)
    }
}