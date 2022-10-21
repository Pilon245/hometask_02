import {Router} from "express";
import {sessionService} from "../service/sessionService";
import {devicesControllers} from "../controller/devicesControllers";
import {refreshTokenMiddleware} from "../middlewares/inputValidation";

export const devicesRouter = Router({})

devicesRouter.get('/security/devices',refreshTokenMiddleware,devicesControllers.getDevices)
devicesRouter.delete('/security/devices',refreshTokenMiddleware,devicesControllers.deleteDevices)
devicesRouter.delete('/security/devices/:deviceId',refreshTokenMiddleware,
    devicesControllers.deleteDevicesById)
