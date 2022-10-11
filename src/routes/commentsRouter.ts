import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation, inputQueryValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {authValidation, commentOnPostValidation} from "../middlewares/bodyValidation";
import {commentsControllers} from "../controller/commentsControllers";
import {commentIdValidation} from "../middlewares/paramsValidation";
import {forbiddenValidation} from "../middlewares/forbiddenValidation";

export const commentsRouter = Router({})

commentsRouter.get('/comments/:id', commentsControllers.getCommentById)
commentsRouter.put('/comments/:commentId', authTokenMiddleware, commentIdValidation, inputQueryValidation,forbiddenValidation,
    commentOnPostValidation,inputBodyValidation, commentsControllers.updateComment)
commentsRouter.delete('/comments/:commentId', authTokenMiddleware, commentIdValidation, inputQueryValidation,forbiddenValidation,
    commentsControllers.deleteComment)
