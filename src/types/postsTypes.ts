import {SortDirection} from "../middlewares/queryValidation";

// export type PostDbType = {
//     id: string
//     title: string
//     shortDescription: string
//     content: string
//     blogId: string
//     blogName: string
//     createdAt: string
//     extendedLikesInfo: extendedLikesInfoType
// }
export class PostDbType {
    constructor(
        public id: string,
        public title: string,
        public shortDescription: string,
        public content: string,
        public blogId: string,
        public blogName: string,
        public createdAt: string,
        public extendedLikesInfo: extendedLikesInfoType
    ) {
    }

}

export type OutputPostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string
    extendedLikesInfo: extendedLikesInfoType
}

export type FindPostsPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
}
export type extendedLikesInfoType = {
    likesCount: number,
    dislikesCount: number,
    myStatus: string,
    newestLikes: newestLikesType []
}
export type newestLikesType = {
    addedAt: string,
    userId: string,
    login: string,
}