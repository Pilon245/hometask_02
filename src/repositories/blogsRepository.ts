import "reflect-metadata";
import {BlogsDbType} from "../types/blogsTypes";
import {BlogsModelClass, SessionModelClass} from "./db";
import {injectable} from "inversify";

@injectable()
export class AdminBlogsRepository {
}

@injectable()
export class BlogsRepository {


    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        return await BlogsModelClass.findOne({id}).lean()
    }
    async createBlogs(newBlogs: BlogsDbType): Promise<BlogsDbType> {
        // await BlogsModelClass.create({...newBlogs})
        // return newBlogs
        const blogsInstance = new BlogsModelClass(newBlogs)

        // blogsInstance.id = newBlogs.id
        // blogsInstance.name = newBlogs.name
        // blogsInstance.youtubeUrl = newBlogs.youtubeUrl
        // blogsInstance.createdAt = newBlogs.createdAt

        await blogsInstance.save()
        return blogsInstance
    }
    async updateBlogs(id: string,name: string, youtubeUrl: string) : Promise<boolean> {
        const result = await BlogsModelClass.updateOne({id: id}, {name, youtubeUrl})
        return result.matchedCount === 1
    }
    async deleteBlogs(id: string) : Promise<boolean> {
        const result = await BlogsModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async deleteAllBlogs() {
        await BlogsModelClass.deleteMany({})
        return true
    }
}


