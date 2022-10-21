import {OutputBlogsDbType} from "../types/blogsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {sessionRepository} from "../repositories/sessionRepository";
import {usersRepository} from "../repositories/usersRepository";
import {UserAccountDBType} from "../types/usersTypes";
import {v4 as uuidv4} from "uuid";
import {jwtService} from "./jwtService";
import {SessionDBType} from "../types/sessionTypes";
import {postsRepository} from "../repositories/postsRepository";



export const sessionService = {
    async findDevices(id: string) {
        const devices = await sessionRepository.findDevices(id)
        return devices
    },
    async findDevicesByDeviceId(deviceId: string) {
        const devices = await sessionRepository.findDevices(deviceId)
        return devices
    },
    async createSession(user: UserAccountDBType, ip: string, deviceName: string, token: string){
      const userId = user.id
      const deviceId = uuidv4()
      const payload = await jwtService.getUserIdByRefreshToken(token.split(" ")[0])
      const session: SessionDBType = {
          ip: ip,
          title: deviceName,
          lastActiveDate: new Date(payload.iat * 1000),
          expiresDate: new Date(payload.iat * 1000),
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