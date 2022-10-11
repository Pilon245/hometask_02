import {OutputUsersDbType, UsersDbType} from "../types/usersTypes";
import {_generatePasswordForDb} from "../helpers/getSkipNumber";
import {ObjectId} from "mongodb";
import {usersRepository} from "../repositories/usersRepository";
import {BlogsDbType, OutputBlogsDbType} from "../types/blogsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {CommentsDbType} from "../types/commentsTypes";
import {commentsRepository} from "../repositories/commentsRepository";
import {postsRepository} from "../repositories/postsRepository";


export const commentsService = {
    async findCommentById(id: string) {
        const comment =  await commentsRepository.findCommentById(id)
        if(comment){
            const outComment = {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: new Date().toISOString()
            }
            return outComment
        }
        return comment

    },
    async createComment(postId:string, content: string, userId: string, userLogin: string) {
        const newComment = {
            id: String(+new Date()),
            content: content,
            userId: userId,
            postId: postId,
            userLogin: userLogin,
            createdAt: new Date().toISOString()
        }
        const createdComment = await commentsRepository.createComment(newComment)
        const outCreateComment = {
            id: createdComment.id,
            content: createdComment.content,
            userId: createdComment.userId,
            userLogin: createdComment.userLogin,
            createdAt: createdComment.createdAt
        }
        return outCreateComment
    },
    async updateComment(id: string, content: string) {
        return await commentsRepository.updateComment(id,content)
    },
    async deleteComment(id: string): Promise<boolean> {
        return await commentsRepository.deleteComment(id)
    },

}