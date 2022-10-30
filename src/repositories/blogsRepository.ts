import {BlogsDbType} from "../types/blogsTypes";
import {BlogsModelClass} from "./db";

export const blogsRepository = {
    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        return await BlogsModelClass.findOne({id: id}).lean()
    },
    async createBlogs(newBlogs: BlogsDbType): Promise<BlogsDbType> {
        await BlogsModelClass.insertMany([newBlogs])
        return newBlogs
    },
    async updateBlogs(id: string,name: string, youtubeUrl: string) : Promise<boolean> {
        const result = await BlogsModelClass.updateOne({id: id}, {name, youtubeUrl})
        return result.matchedCount === 1
    },
    async deleteBlogs(id: string) : Promise<boolean> {
        const result = await BlogsModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllBlogs() {
        await BlogsModelClass.deleteMany({})
        return true
    }

}
