import {strict} from "assert";
import {blogsCollection} from "./db";
import {BlogsDbType} from "./db";
import {ObjectId} from "mongodb";

// export const blogFindId = {
//     async blogId(id: string) {
//         const result = await blogsCollection.findOne({_id: new ObjectId(id)})
//         if(result) {
//             return result
//         } else {
//             return true
//         }
//     }
// }

export const blogsRepository = {
    async findBlogs(title: string | null | undefined): Promise<BlogsDbType []> {
        const filter: any = {}
        if(title){
            filter.title = {$regex: title} // regex должен найти title в занчениях базы данных
        }
        return blogsCollection.find(filter).toArray()
    },
    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        return await blogsCollection.findOne({_id: new ObjectId(id)})
    },
    async createBlogs(newBlogs: BlogsDbType): Promise<BlogsDbType> {
        const result = await blogsCollection.insertOne(newBlogs)
        return newBlogs
    },
    async updateBlogs(id: string,name: string, youtubeUrl: string) {
        const result = await blogsCollection.updateOne({_id:new ObjectId(id)}, {$set: {name:name}})
        return result.matchedCount === 1
    },
    async deleteBlogs(id: string) {
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllBlogs() {
        const deleteAllBlogs = await blogsCollection.deleteMany({})
        return true
    }

}
