import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";
import {BlogsDbType} from "../types/blogsTypes";

export const blogsRepository = {
    async findBlogs(): Promise<BlogsDbType []> {
        return blogsCollection.find().toArray()
    },
    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        return await blogsCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlogs(newBlogs: BlogsDbType): Promise<BlogsDbType> {
        await blogsCollection.insertOne(newBlogs)
        return newBlogs
    },
    async updateBlogs(id: string,name: string, youtubeUrl: string) : Promise<boolean> {
        const result = await blogsCollection.updateOne({_id:new ObjectId(id)}, {$set: {name:name}})
        return result.matchedCount === 1
    },
    async deleteBlogs(id: string) : Promise<boolean> {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllBlogs() {
        await blogsCollection.deleteMany({})
        return true
    }

}
