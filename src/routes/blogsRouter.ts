import {Response, Request, Router} from 'express';
import {blogsRepository} from "../repositories/blogsRepository";
import {blogsControllers} from "../controller/blogsControllers";
import {blogInputControlMiddleware} from "../middlewares/blogMiddlewares/blogInputControlMiddleware";
import {inputBlogValidationMiddleware} from "../middlewares/input-validation-middleware";

export const blogsRouter = Router({})

blogsRouter.get('/blogs',blogsControllers.getBlogs)
blogsRouter.get('/blogs/:id',blogsControllers.getBlogsById)
blogsRouter.post('/blogs',inputBlogValidationMiddleware,blogInputControlMiddleware,blogsControllers.createBlogs)
blogsRouter.put('/blogs/:id',inputBlogValidationMiddleware,blogInputControlMiddleware,blogsControllers.updateBlogs)
blogsRouter.delete('/blogs/:id',inputBlogValidationMiddleware,blogsControllers.deleteBlogs)

