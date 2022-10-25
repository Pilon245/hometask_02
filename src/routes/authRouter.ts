import {Router} from "express";
import {
    authTokenMiddleware,
    connectionControlMiddleware, inputBodyNotViewValidation,
    inputBodyValidation,
    refreshTokenMiddleware
} from "../middlewares/inputValidation";
import {authControllers} from "../controller/authControllers";
import {
    authValidation,
    confirmationValidation, newPassCodeValidation, newPassValidation, recoveryPassValidation, registrationValidation,
    resendingValidation,
} from "../middlewares/bodyValidation";

export const authRouter = Router({})

authRouter.get('/auth/me',authTokenMiddleware, authControllers.myAccount)
authRouter.post('/auth/refresh-token',refreshTokenMiddleware, authControllers.updateResfreshToken)
authRouter.post('/auth/login',connectionControlMiddleware,authValidation,inputBodyValidation,
    authControllers.singInAccount)
authRouter.post('/auth/registration',connectionControlMiddleware,registrationValidation, inputBodyValidation,
    authControllers.createRegistrationUser)
authRouter.post('/auth/registration-confirmation',connectionControlMiddleware,confirmationValidation, inputBodyValidation,
    authControllers.confirmationEmail)
authRouter.post('/auth/registration-email-resending',connectionControlMiddleware,resendingValidation, inputBodyValidation,
    authControllers.resendingEmail)
authRouter.post('/auth/password-recovery',connectionControlMiddleware,recoveryPassValidation,inputBodyValidation,
    authControllers.recoveryPassword)
authRouter.post('/auth/new-password',connectionControlMiddleware,newPassValidation, inputBodyValidation,
    newPassCodeValidation, inputBodyNotViewValidation, authControllers.confirmationRecoveryPassword)
authRouter.post('/auth/logout', refreshTokenMiddleware,authControllers.logOutAccount)
