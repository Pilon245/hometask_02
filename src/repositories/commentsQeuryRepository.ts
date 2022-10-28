import {commentsCollection, likeCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import { FindCommentsPayload} from "../types/commentsTypes";


export const commentsQueryRepository = {
    async findUsers({sortDirection, sortBy, pageSize, pageNumber}: FindCommentsPayload) {
        const comments = await commentsCollection
            .find({})
            .project({_id: 0})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await commentsCollection.countDocuments()

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: comments.map(c => (
                {
                    id: c.id,
                    content: c.content,
                    userId: c.userId,
                    userLogin: c.userLogin,
                    createdAt: c.createdAt
                }))
        }
    },
    async findCommentOnPostNoAuth (postId: string, {sortDirection, sortBy, pageSize, pageNumber}: FindCommentsPayload) {
        const comments = await commentsCollection
            .find({postId: postId})
            .project({_id: 0})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await commentsCollection.countDocuments({postId: postId})

        const Promises = comments.map(async (c) => {
            const likeCount = await likeCollection.countDocuments(
                {commentId: c.id, likesStatus: 1})
            const disLikeCount = await likeCollection.countDocuments(
                {$and: [{commentId: c.id}, {dislikesStatus: 1}]})
            return {
                id: c.id,
                content: c.content,
                userId: c.userId,
                userLogin: c.userLogin,
                createdAt: c.createdAt,
                likesInfo: {
                    likesCount: likeCount,
                    dislikesCount: disLikeCount,
                    myStatus: "None"
                }}})
        const items = await Promise.all(Promises)

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items
        }
    },
    async findCommentOnPost(postId: string, userId: string, {sortDirection, sortBy, pageSize, pageNumber}: FindCommentsPayload) {
        const comments = await commentsCollection
            .find({postId: postId})
            .project({_id: 0})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await commentsCollection.countDocuments({postId: postId})

        const Promises = comments.map(async (c) => {
            const likeCount = await likeCollection.countDocuments(
                {commentId: c.id, likesStatus: 1})
            const disLikeCount = await likeCollection.countDocuments(
                {$and: [{commentId: c.id}, {dislikesStatus: 1}]})
             const likeStatus = await likeCollection.findOne(
                 {$and: [{commentId: c.id}, {authUserId: userId}]})
            return {
                id: c.id,
                content: c.content,
                userId: c.userId,
                userLogin: c.userLogin,
                createdAt: c.createdAt,
                likesInfo: {
                    likesCount: likeCount,
                    dislikesCount: disLikeCount,
                    myStatus: likeStatus?.myStatus ? likeStatus.myStatus : "None"
                }}})
        const items = await Promise.all(Promises)

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items
        }
    },
    async findCommentsNotAuth(id: string ) {
        const comments = await commentsCollection
            .findOne({id: id})

        const totalLike = await likeCollection.countDocuments(
            {$and: [{commentId: id}, {likesStatus: 1}]})
        const totalDislike = await likeCollection.countDocuments(
            {$and: [{commentId: id}, {dislikesStatus: 1}]}
        )

        if (comments) {
            const outComment = {
                id: comments.id,
                content: comments.content,
                userId: comments.userId,
                userLogin: comments.userLogin,
                createdAt: comments.createdAt,
                likesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: "None"
                }
            }
            return outComment
        }
        return comments

    },
    async findComments(id: string, authUserId: string) {
        const comments = await commentsCollection
            .findOne({id: id})

        const totalLike = await likeCollection.countDocuments(
            {$and: [{commentId: id}, {likesStatus: 1}]})
        const totalDislike = await likeCollection.countDocuments(
            {$and: [{commentId: id}, {dislikesStatus: 1}]}
        )
        const likeStatus = await likeCollection.findOne(
            {$and: [{commentId: id}, {authUserId: authUserId}]})

        if (comments) {
            const outComment = {
                id: comments.id,
                content: comments.content,
                userId: comments.userId,
                userLogin: comments.userLogin,
                createdAt: comments.createdAt,
                likesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: likeStatus?.myStatus ? likeStatus?.myStatus : "None"
                }
            }
            return outComment
        }
        return comments

    }

}
