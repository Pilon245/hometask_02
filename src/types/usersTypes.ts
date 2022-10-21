import {ObjectId} from "mongodb";
import {SortDirection} from "../middlewares/queryValidation";

export type UsersDbType = {
        id: string
        login: string
        passwordHash: any
        // passwordSalt: any
        email: string
        createdAt: string
}

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
        id: string
        accountData: UsersAccountDataType
        emailConfirmation: EmailConfirmationType
}
export type UsersAccountDataType = {
        login: string
        email: string
        passwordHash: string
        accessToken: string
        refreshToken: string
        createdAt: string
}
export type EmailConfirmationType = {
        confirmationCode: string
        expirationDate: Date
        isConfirmed: boolean
}
