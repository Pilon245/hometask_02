import {commentsCollection, sessionCollection, usersCollection} from "./db";
import {SessionDBType} from "../types/sessionTypes";

export const sessionRepository = {
    async findDevices(userId: string): Promise<SessionDBType> {
        // console.log("find", await sessionCollection.find({userId: userId}))
        const result =  await sessionCollection.find({userId: userId}).toArray()
        return result//todo На что он ругается?
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