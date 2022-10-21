import {Router} from "express";
import {
    authTokenMiddleware,
    connectionControlMiddleware,
    inputBodyValidation,
    refreshTokenMiddleware
} from "../middlewares/inputValidation";
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
authRouter.post('/auth/login',connectionControlMiddleware,authValidation,inputBodyValidation,authControllers.singInAccount)
authRouter.post('/auth/registration',connectionControlMiddleware,registrationValidation, inputBodyValidation, authControllers.createRegistrationUser)
authRouter.post('/auth/registration-confirmation',connectionControlMiddleware,confirmationValidation, inputBodyValidation,
    authControllers.confirmationEmail)
authRouter.post('/auth/registration-email-resending',connectionControlMiddleware,resendingValidation, inputBodyValidation,
    authControllers.resendingEmail)
authRouter.post('/auth/logout', refreshTokenMiddleware,authControllers.logOutAccount)
