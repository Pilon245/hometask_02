import {LikeValue} from "./commentsTypes";

export type LikeStatusDBType = {
    likesStatus: number | 0 | 1
    dislikesStatus: number | 0 | 1
    myStatus: LikeValue | "None"
    authUserId: string
    commentId: string
}