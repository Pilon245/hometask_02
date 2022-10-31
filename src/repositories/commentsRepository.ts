import {UsersDbType} from "../types/usersTypes";
import {
    CommentsModelClass, LikeCommentModelClass, LikePostModelClass, SessionModelClass,

} from "./db";
import {CommentsDbType, LikeValue} from "../types/commentsTypes";
import {BlogsDbType} from "../types/blogsTypes";
import {commentsControllers} from "../controller/commentsControllers";
import {LikeCommentStatusDBType} from "../types/likeTypes";

export const commentsRepository = {
    async findCommentById(id: string) {
        return await CommentsModelClass.findOne({id: id})
    },
    async findLikeByIdAndCommentId(id: string, commentId: string): Promise<LikeCommentStatusDBType | null> {
        return await LikePostModelClass.findOne({$and: [{userId: id}, {commentId: commentId}]})
    },
    async createComment(newComment: CommentsDbType): Promise<CommentsDbType> {
        const commentInstance = new CommentsModelClass(newComment)
        await commentInstance.save()

        return commentInstance
        // await CommentsModelClass.insertOne(newComment)
        // return newComment
    },
    async createLike(like: LikeCommentStatusDBType) {
        const likeInstance = new LikeCommentModelClass(like)
        await likeInstance.save()

        return likeInstance
    },
    async updateComment(id: string, content: string) {
        const result = await CommentsModelClass.updateOne({id: id},
            {
                $set: {
                    content
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
        const result = await LikeCommentModelClass.updateOne({$and: [{commentId: comment}, {authUserId: authUserId}]},
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
        const result = await CommentsModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllComment() {
        await CommentsModelClass.deleteMany({})
        return true
    }
}