import {ObjectId} from "mongodb";

export type CommentsDbType = {
    id: string
    content: string
    userId: string
    postId: string
    userLogin: string
    createdAt: string
}

export type PagesUsersType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<CommentsDbType>
}
