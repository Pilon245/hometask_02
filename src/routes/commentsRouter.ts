import {Router} from "express";
import {
    authTokenMiddleware,
    inputBodyValidation,
    inputQueryValidation,
    refreshTokenMiddleware, TokenOnCommentIdMiddleware
} from "../middlewares/inputValidation";
import {commentOnPostValidation, likeValidation} from "../middlewares/bodyValidation";
import {commentsControllers} from "../controller/commentsControllers";
import {commentIdValidation} from "../middlewares/paramsValidation";
import {forbiddenValidation} from "../middlewares/forbiddenValidation";

export const commentsRouter = Router({})

commentsRouter.get('/comments/:id',TokenOnCommentIdMiddleware, commentsControllers.getCommentById)//refresh авторизация
commentsRouter.put('/comments/:commentId', authTokenMiddleware, commentIdValidation, inputQueryValidation,
    forbiddenValidation, commentOnPostValidation,inputBodyValidation, commentsControllers.updateComment)
commentsRouter.put('/comments/:commentId/like-status',commentIdValidation,
    inputQueryValidation, likeValidation, inputBodyValidation,refreshTokenMiddleware, commentsControllers.updateLike)
commentsRouter.delete('/comments/:commentId', authTokenMiddleware, commentIdValidation, inputQueryValidation,
    forbiddenValidation, commentsControllers.deleteComment)
