import {SortDirection} from "../middlewares/queryValidation";

export type CommentsDbType = {
    id: string
    content: string
    userId: string
    postId: string
    userLogin: string
    createdAt: string
    likesInfo?: LikeInfoType []
}
export type FindCommentsPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
}
export type LikeInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: LikeValue | 'None' | 'Like' | 'Dislike'
    // authUserId: string
    // commentId: string
}
export enum LikeValue {
    none = 'None',
    like = 'Like',
    dislike = 'Dislike'
}
