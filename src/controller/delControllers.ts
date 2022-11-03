import {Request, Response} from "express";
// import {blogsService} from "../service/blogsService";
import {postsService} from "../service/postsService";
import {usersService} from "../service/usersService";
import {sessionService} from "../service/sessionService";
import {commentsService} from "../service/commentsService";
import {blogsService} from "../compositionRoot";

export const delControllers = {
    async deleteAllData(req: Request, res: Response ) {
        const delBlog = await blogsService.deleteAllBlogs()
        const delPost = await postsService.deleteAllPost()
        const delUsers = await usersService.deleteAllUsers()
        const delComment = await commentsService.deleteAllComment()
        const delSession = await sessionService.deleteAllSessions()
        return res.sendStatus(204)
    }
}