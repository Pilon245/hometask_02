import {commentsRepository} from "../repositories/commentsRepository";


export const commentsService = {
    async findCommentById(id: string) {
        const comment =  await commentsRepository.findCommentById(id)
        if(comment){
            const outComment = {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: comment.createdAt
            }
            return outComment
        }
        return comment

    },
    async createComment(postId: string, content: string, userId: string, userLogin: string) {
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
    async deleteAllComment() {
        return await commentsRepository.deleteAllComment()
    }

}