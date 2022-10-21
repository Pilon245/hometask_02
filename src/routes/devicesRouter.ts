import {Router} from "express";
import {sessionService} from "../service/sessionService";
import {sessionControllers} from "../controller/sessionControllers";
import {refreshTokenMiddleware} from "../middlewares/inputValidation";
import {findDeviceIdOnUserId} from "../middlewares/forbiddenValidation";

export const devicesRouter = Router({})

devicesRouter.get('/security/devices',refreshTokenMiddleware,sessionControllers.getDevices)
devicesRouter.delete('/security/devices',refreshTokenMiddleware,sessionControllers.deleteDevices)
devicesRouter.delete('/security/devices/:deviceId',refreshTokenMiddleware,findDeviceIdOnUserId,
    sessionControllers.deleteDevicesById)
