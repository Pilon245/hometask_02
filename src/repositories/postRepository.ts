// import {blogs} from "./blogsRepository";
import {blogsCollection, PostDbType, postsCollection} from "./db";
import {ObjectId} from "mongodb";

export const postRepository = {
    async findPost(title: string | null | undefined): Promise<PostDbType []>{
        const filter: any = {}
        if(title){
            filter.title = {$regex: title} // regex должен найти title в занчениях базы данных
        }
        return postsCollection.find(filter).toArray()
    },

    async findPostById(id: string): Promise<PostDbType | null>{
        let post: PostDbType | null = await postsCollection.findOne({_id: new ObjectId(id)})
        return post
    },
    async createPost(newPost: PostDbType){
        const result = await postsCollection.insertOne(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const result = await postsCollection.updateOne({_id: new ObjectId(id)},
            {$set: {title: title , shortDescription:shortDescription,
                    content: content, blogId: blogId}})
        return result.matchedCount === 1
    },
    async deletePost(id: string) {
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllPost() {
        const deleteAllPost = await postsCollection.deleteMany({})
        return true
    }

}