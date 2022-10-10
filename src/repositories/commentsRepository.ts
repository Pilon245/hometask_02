import {UsersDbType} from "../types/usersTypes";
import {commentsCollection, usersCollection} from "./db";
import {CommentsDbType} from "../types/commentsTypes";

export const commentsRepository = {
    async createComment(newComment: CommentsDbType): Promise<CommentsDbType> {
        await commentsCollection.insertOne(newComment)
        return newComment
    },
}