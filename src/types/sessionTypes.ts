import {SortDirection} from "../middlewares/queryValidation";


export type FindUsersPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm?: string
    searchEmailTerm?: string
}
export type SessionDBType = {
    ip: string
    title: string
    lastActiveDate: Date
    expiresDate: Date
    deviceId: string
    userId: string
}
