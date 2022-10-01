import {ObjectId} from "mongodb";

export type BlogsDbType = {
    _id: ObjectId
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}
export type OutputBlogsDbType = {
    id: ObjectId
    name: string
    youtubeUrl: string
    createdAt: string
}