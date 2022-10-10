import {ObjectId} from "mongodb";

export type BlogsDbType = {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export type PagesBlogType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<BlogsDbType>
}
export type OutputBlogsDbType = {
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}