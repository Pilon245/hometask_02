import {Router} from "express";
import {postControllers} from "../controller/postControllers";
import {authMiddleware} from "../middlewares/authMiddleware";
import {commentOnPostValidation, postsValidation} from "../middlewares/bodyValidation";
import {
    authTokenMiddleware,
    inputBodyValidation,
    inputQueryValidation,
    TokenOnCommentIdMiddleware
} from "../middlewares/inputValidation";
import {commentsControllers} from "../controller/commentsControllers";
import {commentOnPostIdValidation} from "../middlewares/paramsValidation";


export const postRouter = Router({})

postRouter.get('/posts',postControllers.getPost)
postRouter.get('/posts/:id',postControllers.getPostById)
postRouter.post('/posts',authMiddleware,postsValidation,inputBodyValidation,postControllers.createPost)
postRouter.put('/posts/:id',authMiddleware,postsValidation,inputBodyValidation,postControllers.updatePost)
postRouter.delete('/posts/:id',authMiddleware,postControllers.deletePost)
postRouter.get('/posts/:postId/comments',TokenOnCommentIdMiddleware,commentOnPostIdValidation, inputQueryValidation,
    commentsControllers.getComment)
postRouter.post('/posts/:postId/comments', authTokenMiddleware,commentOnPostIdValidation, inputQueryValidation,
commentOnPostValidation,inputBodyValidation,commentsControllers.createComment)