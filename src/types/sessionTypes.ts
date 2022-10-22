import {SortDirection} from "../middlewares/queryValidation";



export type SessionDBType = {
    ip: string
    title: string
    lastActiveDate: string
    expiresDate: string
    deviceId: string
    userId: string
}

export type SessionType = {
    ip: string
    title: string
    lastActiveDate: Date
    deviceId: string
}