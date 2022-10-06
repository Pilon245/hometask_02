import {ObjectId} from "mongodb";

export type UsersDbType = {
        _id: ObjectId
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
        items: Array<OutputUsersDbType>
}
export type OutputUsersDbType = {
        id: ObjectId
        login: string
        email: string
        createdAt: string
}