import {PostDbType} from "../types/postsTypes";
import {LikeCommentModelClass, LikePostModelClass, PostsModelClass} from "./db";
import {LikeCommentStatusDBType, LikePostStatusDBType} from "../types/likeTypes";
import {LikeValue} from "../types/commentsTypes";

class PostsRepository {
    async findPostById(id: string): Promise<PostDbType | null> {
        let post: PostDbType | null = await PostsModelClass.findOne({id: id})
        return post
    }
    async findLikeByIdAndPostId(id: string, postId: string): Promise<LikePostStatusDBType | null> {
        return await LikePostModelClass.findOne({$and: [{userId: id}, {postId: postId}]})
    }
    async createPost(newPost: PostDbType): Promise<PostDbType> {
        const result = await PostsModelClass.insertMany(newPost)
        return newPost
    }
    async createLike(like: LikePostStatusDBType) {
        const likeInstance = new LikePostModelClass(like)
        await likeInstance.save()

        return likeInstance
    }
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        const result = await PostsModelClass.updateOne({id: id},
            {
                $set: {
                    title, shortDescription, content, blogId
                }
            })
        return result.matchedCount === 1
    }
    async updateLike(
        userId: string,
        postId: string,
        likesStatus: number,
        dislikesStatus: number,
        myStatus: LikeValue,
        login: string,
        addedAt: string
    ) {
        const result = await LikePostModelClass.updateOne({$and: [{postId: postId}, {userId: userId}]},
            {
                likesStatus,
                dislikesStatus,
                myStatus,
                login,
                addedAt

            })
        return result.matchedCount === 1
    }
    async deletePost(id: string) {
        const result = await PostsModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async deleteAllPost() {
        return await PostsModelClass.deleteMany({})
    }
}

export const postsRepository = new PostsRepository()