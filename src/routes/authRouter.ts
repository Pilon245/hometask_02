import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {
    authValidation,
    confirmationValidation,
    resendingValidation,
    usersValidation
} from "../middlewares/bodyValidation";

export const authRouter = Router({})

authRouter.get('/auth/me',authTokenMiddleware, authControllers.myAccount)
authRouter.post('/auth/login',authValidation,inputBodyValidation,authControllers.singInAccount)
authRouter.post('/auth/registration',usersValidation, inputBodyValidation, authControllers.createRegistrationUser)
authRouter.post('/auth/registration-confirmation',confirmationValidation, inputBodyValidation,
    authControllers.confirmationEmail)
authRouter.post('/auth/registration-email-resending',resendingValidation, inputBodyValidation,
    authControllers.resendingEmail)
