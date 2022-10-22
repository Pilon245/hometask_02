import {sessionCollection} from "./db";
import {SessionDBType, SessionType} from "../types/sessionTypes";

export const sessionRepository = {
    async findDevices(userId: string): Promise<SessionType []> {
        const result =  await sessionCollection.find({userId: userId})
            .project({_id:0, userId: 0, expiresDate: 0})
            .toArray()
        return result as SessionType []
    },
    async findDevicesByDeviceIdAndUserId(userId: string, deviceId: string) {
        const result =  await sessionCollection.findOne( {
        $and: [{userId: userId},{deviceId: deviceId}]})
        return result
    },
    async findDevicesByDeviceId(deviceId: string) {
        const result =  await sessionCollection.findOne(
            {deviceId: deviceId})
        return result
    },
    async createSecurityDevices(device: SessionDBType){
        return await sessionCollection.insertOne(device)
    },
    async updateSecurityDevices(userId: string, deviceId: string, lastActiveDate: string){
        return await sessionCollection.updateOne({userId: userId, deviceId: deviceId},
                            {$set: {lastActiveDate: lastActiveDate}})
    },
    async deleteDevices(userId: string, deviceId: string){
        const result = await sessionCollection.deleteMany(
            {userId: userId, deviceId: {$ne: deviceId}})
        return result.deletedCount === 1
    },
    async deleteDeviceById(deviceId: string){
        const result = await sessionCollection.deleteOne({deviceId: deviceId})
        return result.deletedCount === 1
    },
    async deleteAllSessions() {
        await sessionCollection.deleteMany({})
        return true
    },
}