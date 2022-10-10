import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {authValidation} from "../middlewares/bodyValidation";

export const authRouter = Router({})

authRouter.get('/auth/me',authTokenMiddleware, authControllers.myAccount)
authRouter.post('/auth/login',authValidation,inputBodyValidation,authControllers.singInAccount )
