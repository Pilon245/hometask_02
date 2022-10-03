import {ObjectId} from "mongodb";
import {OutputBlogsDbType} from "./blogsTypes";

export type PostDbType = {
    _id: ObjectId
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}

export type OutputPostDbType = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
}
export type PagesPostDbType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<OutputPostDbType>
}