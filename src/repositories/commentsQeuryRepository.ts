import {commentsCollection, likeCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {FindCommentsPayload} from "../types/commentsTypes";
import {commentsRepository} from "./commentsRepository";

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

    async findCommentOnPost(postId: string, {sortDirection, sortBy, pageSize, pageNumber}: FindCommentsPayload) {
        const comments = await commentsCollection
            .find({postId: postId})
            .project({_id: 0})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await commentsCollection.countDocuments({postId: postId})

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
                likeInfo: {
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
        console.log("likeStatus?.myStatus", likeStatus?.myStatus)

        if (comments) {
            const outComment = {
                id: comments.id,
                content: comments.content,
                userId: comments.userId,
                userLogin: comments.userLogin,
                createdAt: comments.createdAt,
                likeInfo: {
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
