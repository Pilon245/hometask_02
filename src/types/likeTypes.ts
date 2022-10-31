import {LikeValue} from "./commentsTypes";

export type LikeCommentStatusDBType = {
    likesStatus: number | 0 | 1
    dislikesStatus: number | 0 | 1
    myStatus: LikeValue | "None"
    authUserId: string
    commentId: string
}
export type LikePostStatusDBType = {
    likesStatus: number | 0 | 1
    dislikesStatus: number | 0 | 1
    myStatus: LikeValue | "None"
    userId: string
    postId: string
    login: string
    addedAt: string
}