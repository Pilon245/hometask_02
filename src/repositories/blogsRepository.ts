import {blogsCollection} from "./db";
import {ObjectId} from "mongodb";
import {BlogsDbType} from "../types/blogsTypes";

export const blogsRepository = {
    async findBlogs(skip: number, pageSize: number, sortBy: string, sortDirection: any, searchNameTerm: string)
        : Promise<BlogsDbType []> {
        return  await blogsCollection
            .find({name: {$regex: searchNameTerm}})
            .sort(sortBy, sortDirection)
            .skip(skip)
            .limit(pageSize)
            .toArray()
    },
    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        return await blogsCollection.findOne({id: id})
    },
    async createBlogs(newBlogs: BlogsDbType): Promise<BlogsDbType> {
        await blogsCollection.insertOne(newBlogs)
        return newBlogs
    },
    async updateBlogs(id: string,name: string, youtubeUrl: string) : Promise<boolean> {
        const result = await blogsCollection.updateOne({id: id}, {$set: {name:name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1
    },
    async deleteBlogs(id: string) : Promise<boolean> {
        const result = await blogsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async countBlogs(sortBy: string, sortDirection: any, searchNameTerm: string) {
      return await blogsCollection
          .countDocuments({name: {$regex: searchNameTerm}})
    },
    async sortBlogsByName(skip: number, PageSize: number): Promise<BlogsDbType []> {
        const result = await blogsCollection.find({}).skip(skip).limit(PageSize).toArray()
        return result
    },
    async deleteAllBlogs() {
        await blogsCollection.deleteMany({})
        return true
    }

}
