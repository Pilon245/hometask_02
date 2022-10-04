import {Router} from "express";
import {postControllers} from "../controller/postControllers";
import {authMiddleware} from "../middlewares/authMiddleware";
import {postsValidation} from "../middlewares/bodyValidation";
import {inputBodyValidation} from "../middlewares/inputValidation";


export const postRouter = Router({})

postRouter.get('/posts',postControllers.getPost)
postRouter.get('/posts/:id',postControllers.getPostById)
postRouter.post('/posts',authMiddleware,postsValidation,inputBodyValidation,postControllers.createPost)
postRouter.put('/posts/:id',authMiddleware,postsValidation,inputBodyValidation,postControllers.updatePost)
postRouter.delete('/posts/:id',authMiddleware,postControllers.deletePost)