import {commentsCollection, sessionCollection, usersCollection} from "./db";
import {SessionDBType, SessionType} from "../types/sessionTypes";

export const sessionRepository = {
    async findDevices(userId: string): Promise<SessionType []> {
        const result =  await sessionCollection.find({userId: userId})
            .project({_id:0, userId: 0, expiresDate: 0, ip: 0, title: 0, lastActiveDate: 0})
            .toArray()
        return result as SessionType []
    },
    async findDevicesByDeviceId(userId: string, deviceId: string): Promise<SessionType | null> {
        const result =  await sessionCollection.findOne( {
        $and: [{userId: userId},{deviceId: deviceId}]})
        return result
    },
    async createSecurityDevices(device: SessionDBType){
        return await sessionCollection.insertOne(device)
    },
    async deleteDevices(userId: string){
        const result = await sessionCollection.deleteMany({userId: userId})
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