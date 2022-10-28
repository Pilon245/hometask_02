import {commentsRepository} from "../repositories/commentsRepository";
import {CommentsDbType, LikeValue} from "../types/commentsTypes";
import {LikeStatusDBType} from "../types/likeTypes";


export const commentsService = {
    async findCommentById(id: string) {
        const comment = await commentsRepository.findCommentById(id)
        if (comment) {
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
        const newComment: CommentsDbType = {
            id: String(+new Date()),
            content: content,
            userId: userId,
            postId: postId,
            userLogin: userLogin,
            createdAt: new Date().toISOString(),
            likesInfo: {
                likesCount:0,
                dislikesCount: 0,
                myStatus:  "None",
            }

        }
        const createdComment = await commentsRepository.createComment(newComment)
        const outCreateComment = {
            id: createdComment.id,
            content: createdComment.content,
            userId: createdComment.userId,
            userLogin: createdComment.userLogin,
            createdAt: createdComment.createdAt,
            likesInfo: {
                 dislikesCount: 0,
                 likesCount:0,
                 myStatus:  "None",
               }
        }
        return outCreateComment
    },
    async updateComment(id: string, content: string) {
        return await commentsRepository.updateComment(id, content)
    },
    async updateLike(userId: string, commentId: string, value: LikeValue) {
        const user = await commentsRepository.findLikeByIdAndCommentId(userId, commentId)
        console.log("user:", user)
        // console.log("user!.likesStatus", user!.likesStatus)
        console.log("value", value)

        if (!user) {
            if (value === "Like") {
                const newLike: LikeStatusDBType = {
                    likesStatus: 1,
                    dislikesStatus: 0,
                    myStatus: value,
                    authUserId: userId,
                    commentId: commentId
                }
                return await commentsRepository.createLike(newLike)
            }
            if (value === "Dislike") {
                const newLike: LikeStatusDBType = {
                    likesStatus: 0,
                    dislikesStatus: 1,
                    myStatus: value,
                    authUserId: userId,
                    commentId: commentId
                }
                return await commentsRepository.createLike(newLike)
            }
            if (value === "None") {
                const newLike: LikeStatusDBType = {
                    likesStatus: 0,
                    dislikesStatus: 0,
                    myStatus: value,
                    authUserId: userId,
                    commentId: commentId
                }
                return await commentsRepository.createLike(newLike)

            }
        }
        //
        // if(user!.likesStatus === 1 &&  user!.dislikesStatus === 1 ) {
        //     if (value === "Like") {
        //         const likesStatus = 0
        //         const dislikesStatus = 0
        //         const myStatus = value
        //         const authUserId = userId
        //         const comment = commentId
        //         return await commentsRepository.updateLike(
        //             authUserId, comment, likesStatus, dislikesStatus, myStatus
        //         )
        //     }
        //     if (value === "Dislike") {
        //         const likesStatus = 0
        //         const dislikesStatus = 0
        //         const myStatus = value
        //         const authUserId = userId
        //         const comment = commentId
        //         return await commentsRepository.updateLike(
        //             authUserId, comment, likesStatus, dislikesStatus, myStatus
        //         )
        //     }
        // }
        if (value === "Like" && user!.likesStatus === 0) {

            const likesStatus = 1
            const dislikesStatus = 0
            const myStatus = value
            const authUserId = userId
            const comment = commentId
            return await commentsRepository.updateLike(
                authUserId, comment, likesStatus, dislikesStatus, myStatus
            )
        }
        if (value === "Dislike" && user!.dislikesStatus === 0) {
            console.log("value22", value)
            const likesStatus = 0
            const dislikesStatus = 1
            const myStatus = value
            const authUserId = userId
            const comment = commentId
            return await commentsRepository.updateLike(
                authUserId, comment, likesStatus, dislikesStatus, myStatus
            )
        }

        if (value === "None") {
            const likesStatus = 0
            const dislikesStatus = 0
            const myStatus = value
            const authUserId = userId
            const comment = commentId
            return await commentsRepository.updateLike(
                authUserId, comment, likesStatus, dislikesStatus, myStatus
            )
        }
        return false
    },
    async deleteComment(id: string): Promise<boolean> {
        return await commentsRepository.deleteComment(id)
    },
    async deleteAllComment() {
        return await commentsRepository.deleteAllComment()
    }

}