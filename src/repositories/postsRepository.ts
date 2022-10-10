import {postsCollection} from "./db";
import {ObjectId} from "mongodb";
import {PostDbType} from "../types/postsTypes";

export const postsRepository = {
    async findPost(skip: number, pageSize: number, sortBy: string, sortDirection: any): Promise<PostDbType []> {
        return postsCollection
            .find({})
            .sort(sortBy, sortDirection)
            .skip(skip)
            .limit(pageSize)
            .toArray()
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        let post: PostDbType | null = await postsCollection.findOne({id: id})
        return post
    },
    async findPostOnBlog(blogId: string, skip: number, pageSize: number, sortBy: string, sortDirection: any)
        : Promise<PostDbType [] | null> {
        return await postsCollection
            .find({blogId: blogId})
            .sort(sortBy, sortDirection)
            .skip(skip)
            .limit(pageSize)
            .toArray()
    },
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const result = await postsCollection.updateOne({id: id},
            {
                $set: {
                    title: title, shortDescription: shortDescription,
                    content: content, blogId: blogId
                }
            })
        return result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async countPosts(sortBy: string, sortDirection: any) {
        return await postsCollection.countDocuments({})
    },
    async countPostsByBlogId(blogId: string, sortBy: string, sortDirection: any): Promise<number> {
        const count = await postsCollection.countDocuments({blogId: blogId})
        return count
    },
    async deleteAllPost() {
        const deleteAllPost = await postsCollection.deleteMany({})
        return true
    }
}