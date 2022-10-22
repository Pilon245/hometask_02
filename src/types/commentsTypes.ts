import {SortDirection} from "../middlewares/queryValidation";

export type CommentsDbType = {
    id: string
    content: string
    userId: string
    postId: string
    userLogin: string
    createdAt: string
}

export type FindCommentsPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
}