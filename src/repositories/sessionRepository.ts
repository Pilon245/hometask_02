import {SessionDBType, SessionType} from "../types/sessionTypes";
import {SessionModelClass} from "./db";

export const sessionRepository = {
    async findDevices(userId: string): Promise<SessionType []> {
        let result: SessionType [] =  await SessionModelClass.find({userId: userId}).lean()
        return result as SessionType []
    },
    async findDevicesByDeviceIdAndUserId(userId: string, deviceId: string) {
        const result =  await SessionModelClass.findOne( {
        $and: [{userId: userId},{deviceId: deviceId}]}).lean()
        return result
    },
    async findDevicesByDeviceId(deviceId: string) {
        const result =  await SessionModelClass.findOne(
            {deviceId: deviceId}).lean()
        return result
    },
    async createSecurityDevices(device: SessionDBType){
        const sessionInstance = new SessionModelClass()

        sessionInstance.ip = device.ip
        sessionInstance.title = device.title
        sessionInstance.lastActiveDate = device.lastActiveDate
        sessionInstance.expiresDate = device.expiresDate
        sessionInstance.deviceId = device.deviceId
        sessionInstance.userId = device.userId

        await sessionInstance.save()

        // return await SessionModelClass.insertMany(device)
        return device
    },

    async updateSecurityDevices(userId: string, deviceId: string, lastActiveDate: string){
        const sessionInstance = await SessionModelClass.findOne({userId: userId, deviceId: deviceId})
        if (!sessionInstance) return false

        sessionInstance.lastActiveDate = lastActiveDate

        await sessionInstance.save()

        return true
        // return await SessionModelClass.updateOne({userId: userId, deviceId: deviceId},
        //                     {$set: {lastActiveDate: lastActiveDate}})
    },
    async deleteDevices(userId: string, deviceId: string){
        // const sessionInstance = await SessionModelClass.find({userId: userId, deviceId: deviceId})
        // if (!sessionInstance) return false
        //
        // await sessionInstance.deleteMany({userId: userId, deviceId: deviceId})

        const result = await SessionModelClass.deleteMany(
            {userId: userId, deviceId: {$ne: deviceId}})
        return result.deletedCount === 1
    },
    async deleteDeviceById(deviceId: string){
        const sessionInstance = await SessionModelClass.findOne({deviceId: deviceId})
        if (!sessionInstance) return false

        await sessionInstance.deleteOne()

        return true
        // const result = await SessionModelClass.deleteOne({deviceId: deviceId})
        // return result.deletedCount === 1
    },
    async deleteAllSessions() {
        await SessionModelClass.deleteMany({})
        return true
    },
}