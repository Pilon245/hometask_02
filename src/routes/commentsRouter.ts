import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation, inputQueryValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {authValidation, commentOnPostValidation} from "../middlewares/bodyValidation";
import {commentsControllers} from "../controller/commentsControllers";
import {commentIdValidation} from "../middlewares/paramsValidation";

export const commentsRouter = Router({})

commentsRouter.get('/comments/:id', commentsControllers.getCommentById)
commentsRouter.put('/comments/:commentId', authTokenMiddleware, //commentIdValidation, inputQueryValidation,
    commentOnPostValidation,inputBodyValidation, commentsControllers.updateComment)
commentsRouter.delete('/comments/:commentId', authTokenMiddleware,commentsControllers.deleteComment)
