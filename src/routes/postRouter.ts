import {Request, Response, Router} from "express";
import {postControllers} from "../controller/postControllers";
import {postInputControlMiddleware} from "../middlewares/postMiddlewares/postInputControlMiddleware";
import {inputBlogValidationMiddleware} from "../middlewares/input-validation-middleware";


export const postRouter = Router({})

postRouter.get('/posts',postControllers.getPost)
postRouter.get('/posts/:id',postControllers.getPostById)
postRouter.post('/posts',inputBlogValidationMiddleware,postInputControlMiddleware,postControllers.createPost)
postRouter.put('/posts/:id',inputBlogValidationMiddleware,postInputControlMiddleware,postControllers.updatePost)
postRouter.delete('/posts/:id',inputBlogValidationMiddleware,postControllers.deletePost)