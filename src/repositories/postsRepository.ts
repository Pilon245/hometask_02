import {PostDbType} from "../types/postsTypes";
import {PostsModelClass} from "./db";

export const postsRepository = {
    async findPostById(id: string): Promise<PostDbType | null> {
        let post: PostDbType | null = await PostsModelClass.findOne({id: id})
        return post
    },
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        const result = await PostsModelClass.insertMany(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const result = await PostsModelClass.updateOne({id: id},
            {
                $set: {
                    title, shortDescription, content, blogId
                }
            })
        return result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await PostsModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllPost() {
        return await PostsModelClass.deleteMany({})
    }
}