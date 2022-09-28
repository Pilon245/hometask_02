import {Request, Response, Router} from "express";
import {postControllers} from "../controller/postControllers";
import {postInputControlMiddleware} from "../middlewares/postMiddlewares/postInputControlMiddleware";
import {authMiddleware} from "../middlewares/authMiddleware";
import {PostValidation} from "../middlewares/postMiddlewares/postValidation";


export const postRouter = Router({})

postRouter.get('/posts',postControllers.getPost)
postRouter.get('/posts/:id',postControllers.getPostById)
postRouter.post('/posts',authMiddleware,PostValidation,postControllers.createPost)
postRouter.put('/posts/:id',authMiddleware,PostValidation,postControllers.updatePost)
postRouter.delete('/posts/:id',authMiddleware,postControllers.deletePost)