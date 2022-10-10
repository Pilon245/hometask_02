import {ObjectId} from "mongodb";

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