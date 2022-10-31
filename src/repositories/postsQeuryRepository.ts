import {FindPostsPayload, newestLikesType, OutputPostDbType} from "../types/postsTypes";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {LikeCommentModelClass, LikePostModelClass, PostsModelClass} from "./db";
import {postsRepository} from "./postsRepository";


export const postsQeuryRepository = {
    async findPostNoAuth({pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload) {
        const posts = await PostsModelClass
            .find({})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()

        const Promises = posts.map(async (p) => {
            const totalLike = await LikePostModelClass.countDocuments(
                {$and: [{postId: p.id}, {likesStatus: 1}]})
            const totalDislike = await LikePostModelClass.countDocuments(
                {$and: [{postId: p.id}, {dislikesStatus: 1}]})
            const lastLikes = await LikePostModelClass.find({$and: [{postId: p.id}, {likesStatus: 1}]})
                .sort({"addedAt": "desc"})
                .lean()
            return {
                id: p.id,
                title: p.title,
                shortDescription: p.shortDescription,
                content: p.content,
                blogId: p.blogId,
                blogName: p.blogName,
                createdAt: p.createdAt,
                extendedLikesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: "None",
                    newestLikes: lastLikes.slice(0, 3).map(l => ({
                        addedAt: l.addedAt,
                        userId: l.userId,
                        login: l.login
                    }))
                }
            }
        })
        const items = await Promise.all(Promises)

        const totalCount = await PostsModelClass.countDocuments()

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items
        }
    },
    async findPost(userId: string, {pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload) {
        const posts = await PostsModelClass
            .find({})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()

        const totalCount = await PostsModelClass.countDocuments()

        const Promises = posts.map(async (p) => {
            const totalLike = await LikePostModelClass.countDocuments(
                {$and: [{postId: p.id}, {likesStatus: 1}]})
            const totalDislike = await LikePostModelClass.countDocuments(
                {$and: [{postId: p.id}, {dislikesStatus: 1}]})
            const likeStatus = await LikePostModelClass.findOne(
                {$and: [{postId: p.id}, {userId: userId}]})
            const lastLikes = await LikePostModelClass.find({$and: [{postId: p.id}, {likesStatus: 1}]})
                .sort({"addedAt": "desc"})
                .lean()
            return {
                id: p.id,
                title: p.title,
                shortDescription: p.shortDescription,
                content: p.content,
                blogId: p.blogId,
                blogName: p.blogName,
                createdAt: p.createdAt,
                extendedLikesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: likeStatus?.myStatus ? likeStatus.myStatus : "None",
                    newestLikes: lastLikes.slice(0, 3).map(l => ({
                        addedAt: l.addedAt,
                        userId: l.userId,
                        login: l.login
                    }))
                }
            }
        })
        const items = await Promise.all(Promises)

        return {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: items
        }
    },
    async findPostByIdNoAuth(id: string): Promise<OutputPostDbType | null> {
        const post = await postsRepository.findPostById(id)

        const totalLike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {likesStatus: 1}]})
        const totalDislike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {dislikesStatus: 1}]}
        )
        const lastLikes = await LikePostModelClass.find({$and: [{postId: id}, {likesStatus: 1}]})
            .sort({"addedAt": "desc"})
            .lean()

        if (post) {
            const outPost: OutputPostDbType = {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: "None",
                    newestLikes: lastLikes.slice(0, 3).map(l => ({
                        addedAt: l.addedAt,
                        userId: l.userId,
                        login: l.login
                    }))
                }

            }
            return outPost
        }
        return post
    },
    async findPostById(id: string, userId: string): Promise<OutputPostDbType | null> {
        const post = await postsRepository.findPostById(id)

        const totalLike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {likesStatus: 1}]})
        const totalDislike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {dislikesStatus: 1}]}
        )
        const likeStatus = await LikePostModelClass.findOne(
            {$and: [{postId: id}, {userId: userId}]})

        const lastLikes = await LikePostModelClass.find({$and: [{postId: id}, {likesStatus: 1}]})
            .sort({"addedAt": "desc"})
            .lean()

        if (post) {
            const outPost: OutputPostDbType = {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: totalLike,
                    dislikesCount: totalDislike,
                    myStatus: likeStatus?.myStatus ? likeStatus.myStatus : "None",
                    newestLikes: lastLikes.slice(0, 3).map(l => ({
                        addedAt: l.addedAt,
                        userId: l.userId,
                        login: l.login
                    }))
                }

            }
            return outPost
        }
        return post
    },
    async findPostOnBlog(blogId: string, {pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload) {
        const posts = await PostsModelClass
            .find({blogId: blogId})
            .sort({[sortBy]: sortDirection})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()

        const totalCount = await PostsModelClass.countDocuments({blogId: blogId})

        return {
            pagesCount: (Math.ceil(totalCount / pageSize)),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: posts.map(p => (
                {
                    id: p.id,
                    title: p.title,
                    shortDescription: p.shortDescription,
                    content: p.content,
                    blogId: p.blogId,
                    blogName: p.blogName,
                    createdAt: p.createdAt
                }))
        }
    }
}

