import {commentsRepository} from "../repositories/commentsRepository";
import {Request, Response} from "express";
import {sessionService} from "../service/sessionService";

export const devicesControllers = {
    async getDevices(req: Request, res: Response) {
        const devices =  await sessionService.findDevices(req.user!.id)
        res.status(200).send(devices)
    },
    async deleteDevices(req: Request, res: Response) {
        const devices =  await sessionService.deleteDevices(req.user!.id)
        res.sendStatus(204)
    },
    async deleteDevicesById(req: Request, res: Response) {
        const devices =  await sessionService.deleteDevicesById(req.params.deviceId)
        res.sendStatus(204)
    },

}