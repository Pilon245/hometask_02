import {OutputUsersDbType, UsersDbType} from "../types/usersTypes";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";
import {ObjectId} from "mongodb";
import {usersRepository} from "../repositories/usersRepository";
import {BlogsDbType, OutputBlogsDbType} from "../types/blogsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {CommentsDbType} from "../types/commentsTypes";
import {commentsRepository} from "../repositories/commentsRepository";


export const commentsService = {
    async createComment(content: string, userId: string, userLogin: string): Promise<CommentsDbType> {
        const newComment = {
            id: String(+new Date()),
            content: content,
            userId: userId,
            userLogin: userLogin,
            createdAt: new Date().toISOString()
        }
        const createdComment = await commentsRepository.createComment(newComment)
        const outCreateComment: CommentsDbType = {
            id: createdComment.id,
            content: createdComment.content,
            userId: createdComment.userId,
            userLogin: createdComment.userLogin,
            createdAt: createdComment.createdAt
        }
        return outCreateComment
    }
}