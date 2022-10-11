import {ObjectId} from "mongodb";
import {SortDirection} from "../middlewares/queryValidation";

export type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type OutputPostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export type PagesPostType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<PostDbType>
}
export type FindPostsPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
}