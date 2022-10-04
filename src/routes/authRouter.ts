import {Router} from "express";
import {inputBodyValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {authValidation} from "../middlewares/bodyValidation";

export const authRouter = Router({})

authRouter.post('/auth/login', authValidation,inputBodyValidation,authControllers.singInAccount)
