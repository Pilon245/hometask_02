import {UsersDbType} from "../types/usersTypes";
import {blogsCollection, commentsCollection, likeCollection, postsCollection, usersCollection} from "./db";
import {CommentsDbType, LikeValue} from "../types/commentsTypes";
import {BlogsDbType} from "../types/blogsTypes";
import {commentsControllers} from "../controller/commentsControllers";
import {LikeStatusDBType} from "../types/likeTypes";

export const commentsRepository = {
    async findCommentById(id: string) {
        return await commentsCollection.findOne({id: id})
    },
    async findLikeByIdAndCommentId(id: string, commentId: string): Promise<LikeStatusDBType | null> {
        return await likeCollection.findOne({$and: [{authUserId: id}, {commentId: commentId}]})
    },
    async createComment(newComment: CommentsDbType): Promise<CommentsDbType> {
        await commentsCollection.insertOne(newComment)
        return newComment
    },
    async createLike(like: LikeStatusDBType) {
        const result = await likeCollection.insertOne(like)
        return result
    },
    async updateComment(id: string, content: string) {
        const result = await commentsCollection.updateOne({id: id},
            {
                $set: {
                    content: content
                }
            })
        return result.matchedCount === 1
    },
    async updateLike(
        authUserId: string,
        comment: string,
        likesStatus: number,
        dislikesStatus: number,
        myStatus: LikeValue) {
        const result = await likeCollection.updateOne({$and: [{commentId: comment}, {authUserId: authUserId}]},
            {
                $set: {
                    likesStatus: likesStatus,
                    dislikesStatus: dislikesStatus,
                    myStatus: myStatus
                }
            })
        return result.matchedCount === 1
    },
    async deleteComment(id: string): Promise<boolean> {
        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllComment() {
        await commentsCollection.deleteMany({})
        return true
    }
}