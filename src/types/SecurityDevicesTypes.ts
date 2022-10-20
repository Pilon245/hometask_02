import {SortDirection} from "../middlewares/queryValidation";
import {UsersDbType} from "./usersTypes";

export type PagesUsersType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<UsersDbType>
}
export type OutputUsersDbType = {
    id: string
    login: string
    email: string
    createdAt: string
}
export type FindUsersPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm?: string
    searchEmailTerm?: string
}
export type UserAccountDBType = {
    ip: string
    title: string
    lastActiveDate: string
    deviceId: string
}