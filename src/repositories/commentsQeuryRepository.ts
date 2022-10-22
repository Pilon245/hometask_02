import {commentsCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {FindCommentsPayload} from "../types/commentsTypes";

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
    }
}
