import {Request, Response} from "express";
import {sessionService} from "../service/sessionService";
import {payloadRefreshToken} from "../helpers/getSkipNumber";

export const sessionControllers = {
    async getDevices(req: Request, res: Response) {
        const devices =  await sessionService.findDevices(req.user!.id)
        res.status(200).send(devices)
    },
    async deleteDevices(req: Request, res: Response) {
        const refToken = await payloadRefreshToken(req.cookies.refreshToken)
        const devices =  await sessionService.deleteDevices(req.user!.id, refToken.deviceId)
        res.sendStatus(204)
    },
    async deleteDevicesById(req: Request, res: Response) {
        const devices =  await sessionService.deleteDevicesById(req.params.deviceId)
        if (devices) res.sendStatus(204)

    },

}