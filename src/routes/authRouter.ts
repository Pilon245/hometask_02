import {Router} from "express";
import {authTokenMiddleware, inputBodyValidation, refreshTokenMiddleware} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {
    authValidation,
    confirmationValidation, registrationValidation,
    resendingValidation,
    usersValidation
} from "../middlewares/bodyValidation";

export const authRouter = Router({})

authRouter.get('/auth/me',authTokenMiddleware, authControllers.myAccount)
authRouter.post('/auth/refresh-token',refreshTokenMiddleware, authControllers.updateResfreshToken)
authRouter.post('/auth/login',authValidation,inputBodyValidation,authControllers.singInAccount)
authRouter.post('/auth/registration',registrationValidation, inputBodyValidation, authControllers.createRegistrationUser)
authRouter.post('/auth/registration-confirmation',confirmationValidation, inputBodyValidation,
    authControllers.confirmationEmail)
authRouter.post('/auth/registration-email-resending',resendingValidation, inputBodyValidation,
    authControllers.resendingEmail)
authRouter.post('/auth/logout', authControllers.logOutAccount)
