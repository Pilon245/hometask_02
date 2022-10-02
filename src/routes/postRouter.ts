import {Request, Response, Router} from "express";
import {postControllers} from "../controller/postControllers";
import {postInputControlMiddleware} from "../middlewares/postMiddlewares/postInputControlMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {blogIdValodation, postValidation} from "../middlewares/postMiddlewares/postValidation";


export const postRouter = Router({})

postRouter.get('/posts',postControllers.getPost)
postRouter.get('/posts/:id',postControllers.getPostById)
postRouter.post('/posts',authMiddleware,postValidation,blogIdValodation,postControllers.createPost)
postRouter.put('/posts/:id',authMiddleware,postValidation,blogIdValodation,postControllers.updatePost)
postRouter.delete('/posts/:id',authMiddleware,postControllers.deletePost)