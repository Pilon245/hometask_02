import {Response, Request, Router} from 'express';
import {blogsRepository} from "../repositories/blogsRepository";
import {blogsControllers} from "../controller/blogsControllers";
import {blogInputControlMiddleware, nameValidation} from "../middlewares/blogMiddlewares/blogInputControlMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {blogIdValodation, postValidation} from "../middlewares/postMiddlewares/postValidation";
import {blogValidation} from "../middlewares/blogMiddlewares/blogsValidation";
import {inputValidation} from "../middlewares/inputValidation";
import {postControllers} from "../controller/postControllers";
import {postOnblogIdValodation} from "../middlewares/postMiddlewares/postOnblogIdValodation";

export const blogsRouter = Router({})

blogsRouter.get('/blogs', blogsControllers.getBlogs)
blogsRouter.get('/blogs/:id',blogsControllers.getBlogsById)
blogsRouter.post('/blogs',authMiddleware,blogValidation,blogsControllers.createBlogs)
blogsRouter.put('/blogs/:id',authMiddleware,blogValidation,blogsControllers.updateBlogs)
blogsRouter.delete('/blogs/:id',authMiddleware,blogsControllers.deleteBlogs)
blogsRouter.get('/blogs/:blogId/posts',postOnblogIdValodation,postControllers.getPostOnBlog)
blogsRouter.post('/blogs/:blogId/posts',authMiddleware,postOnblogIdValodation,postValidation,postControllers.createPostonBlog)


