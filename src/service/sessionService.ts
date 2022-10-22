import {sessionRepository} from "../repositories/sessionRepository";
import {UserAccountDBType} from "../types/usersTypes";
import {v4 as uuidv4} from "uuid";
import {jwtService} from "./jwtService";
import {SessionDBType} from "../types/sessionTypes";



export const sessionService = {
    async findDevices(id: string) {
        const devices = await sessionRepository.findDevices(id)
        return devices
    },
    async findDevicesByDeviceId(deviceId: string) {
        const devices = await sessionRepository.findDevices(deviceId)
        return devices
    },
    async createSession(user: UserAccountDBType, ip: string, deviceName: string, token: string, device: string){
      const userId = user.id
      const deviceId = device
        console.log("deviceID create", deviceId)
      const payload = await jwtService.getUserIdByRefreshToken(token.split(" ")[0])
      const session: SessionDBType = {
          ip: ip,
          title: deviceName,
          lastActiveDate: new Date(payload.iat * 1000).toISOString(),
          expiresDate: new Date(payload.iat * 1000).toDateString(),
          deviceId: deviceId,
          userId: userId
      }
      await sessionRepository.createSecurityDevices(session)
    },
    async deleteDevices(id: string) {
        return  await sessionRepository.deleteDevices(id)
    },
    async deleteDevicesById(deviceId: string) {
        return  await sessionRepository.deleteDeviceById(deviceId)
    },
    async deleteAllSessions() {
        return await sessionRepository.deleteAllSessions()
    }
}