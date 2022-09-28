import {Response, Request, Router} from 'express';
import {blogsRepository} from "../repositories/blogsRepository";
import {blogsControllers} from "../controller/blogsControllers";
import {blogInputControlMiddleware, nameValidation} from "../middlewares/blogMiddlewares/blogInputControlMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {PostValidation} from "../middlewares/postMiddlewares/postValidation";
import {blogValidation} from "../middlewares/blogMiddlewares/blogsValidation";
import {inputValidation} from "../middlewares/inputValidation";

export const blogsRouter = Router({})

blogsRouter.get('/blogs',blogsControllers.getBlogs)
blogsRouter.get('/blogs/:id',blogsControllers.getBlogsById)
blogsRouter.post('/blogs',authMiddleware,inputValidation,blogsControllers.createBlogs)
blogsRouter.put('/blogs/:id',authMiddleware,blogValidation,blogsControllers.updateBlogs)
blogsRouter.delete('/blogs/:id',authMiddleware,blogsControllers.deleteBlogs)

