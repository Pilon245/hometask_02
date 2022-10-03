import {blogsCollection, postsCollection} from "./db";
import {ObjectId} from "mongodb";
import {PostDbType} from "../types/postsTypes";

export const postRepository = {
    async findPost(skip: number, pageSize: number, sortBy: string, sortDirection: any): Promise<PostDbType []>{
        return postsCollection
            .find({})
            .sort(sortBy, sortDirection)
            .skip(skip)
            .limit(pageSize)
            .toArray()
    },
    async findPostById(id: string): Promise<PostDbType | null>{
        let post: PostDbType | null = await postsCollection.findOne({_id: new ObjectId(id)})
        return post
    },
    async findPostOnBlog(blogId: string,skip: number, pageSize: number, sortBy: string, sortDirection: any)
        : Promise<PostDbType [] | null>{
      let posts: PostDbType [] | null = await postsCollection
          .find({blogId: {$regex: blogId}})
          .sort(sortBy, sortDirection)
          .skip(skip)
          .limit(pageSize)
          .toArray()
      return posts
    },
    async createPost(newPost: PostDbType): Promise<PostDbType>{
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
    async countPosts(sortBy: string, sortDirection: any) {
        return await postsCollection.find().sort(sortBy, sortDirection).count()
    },
    // async countPostsById(blogId: string, sortBy: string, sortDirection: any) {
    //     const filter: any ={}
    //     if(blogId){
    //         filter.blogId = {$regex: blogId}
    //     }
    //     return await postsCollection.find({_id: new ObjectId(blogId)}).sort(sortBy, sortDirection).count()
    // },
    async deleteAllPost() {
        const deleteAllPost = await postsCollection.deleteMany({})
        return true
    }

}