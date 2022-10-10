import {UsersDbType} from "../types/usersTypes";
import {blogsCollection, commentsCollection, postsCollection, usersCollection} from "./db";
import {CommentsDbType} from "../types/commentsTypes";
import {BlogsDbType} from "../types/blogsTypes";
import {commentsControllers} from "../controller/commentsControllers";

export const commentsRepository = {
    async findCommentById(id: string) {
        return await commentsCollection.findOne({id: id})
    },
    async createComment(newComment: CommentsDbType): Promise<CommentsDbType> {
        await commentsCollection.insertOne(newComment)
        return newComment
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
    async deleteComment(id: string): Promise<boolean> {
        const result = await commentsCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
}