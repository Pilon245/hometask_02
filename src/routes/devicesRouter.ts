import {Router} from "express";
import {sessionControllers} from "../controller/sessionControllers";
import {inputQueryValidation, refreshTokenMiddleware} from "../middlewares/inputValidation";
import {findDeviceIdOnUserId} from "../middlewares/forbiddenValidation";
import {deviceIdValidation} from "../middlewares/paramsValidation";

export const devicesRouter = Router({})

devicesRouter.get('/security/devices',refreshTokenMiddleware,sessionControllers.getDevices)
devicesRouter.delete('/security/devices',refreshTokenMiddleware,sessionControllers.deleteDevices)
devicesRouter.delete('/security/devices/:deviceId',refreshTokenMiddleware,deviceIdValidation,
    inputQueryValidation,findDeviceIdOnUserId,sessionControllers.deleteDevicesById)
