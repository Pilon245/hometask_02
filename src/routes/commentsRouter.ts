import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {authValidation} from "../middlewares/bodyValidation";

export const commentsRouter = Router({})

commentsRouter.get('/',authTokenMiddleware, authControllers.myAccount)
commentsRouter.post('/auth/login',authControllers.singInAccount, authValidation,inputBodyValidation)
