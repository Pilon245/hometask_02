import {sessionRepository} from "../repositories/sessionRepository";
import {UserAccountDBType} from "../types/usersTypes";
import {v4 as uuidv4} from "uuid";
import {jwtService} from "./jwtService";
import {SessionDBType} from "../types/sessionTypes";


class SessionService {
    async findDevices(id: string) {
        const devices = await sessionRepository.findDevices(id)
        return devices
    }
    async findDevicesByDeviceId(deviceId: string) {
        const devices = await sessionRepository.findDevices(deviceId)
        return devices
    }
    async createSession(user: UserAccountDBType, ip: string, deviceName: string, token: string, device: string) {
        const userId = user.id
        const deviceId = device
        const payload = await jwtService.getUserIdByRefreshToken(token.split(" ")[0])
        // const session: SessionDBType = {
        //     ip: ip,
        //     title: deviceName,
        //     lastActiveDate: new Date(payload.iat * 1000).toISOString(),
        //     expiresDate: new Date(payload.iat * 1000).toDateString(),
        //     deviceId: deviceId,
        //     userId: userId
        // }
        const session = new SessionDBType(
            ip,
            deviceName,
            new Date(payload.iat * 1000).toISOString(),
            new Date(payload.iat * 1000).toDateString(),
            deviceId,
            userId
        )
        await sessionRepository.createSecurityDevices(session)
    }
    async updateSession(user: UserAccountDBType, token: string,) {
        const userId = user.id
        const payload = await jwtService.getUserIdByRefreshToken(token.split(" ")[0])
        const lastActiveDate = new Date(payload.iat * 1000).toISOString()
        await sessionRepository.updateSecurityDevices(userId, payload.deviceId, lastActiveDate)
    }
    async deleteDevices(id: string, deviceId: string) {
        return await sessionRepository.deleteDevices(id, deviceId)
    }
    async deleteDevicesById(deviceId: string) {
        return await sessionRepository.deleteDeviceById(deviceId)
    }
    async deleteAllSessions() {
        return await sessionRepository.deleteAllSessions()
    }
}

export const sessionService = new SessionService()