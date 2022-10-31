import {FindPostsPayload, newestLikesType, OutputPostDbType} from "../types/postsTypes";
import {getSkipNumber} from "../helpers/getSkipNumber";
import {LikeCommentModelClass, LikePostModelClass, PostsModelClass} from "./db";
import {postsRepository} from "./postsRepository";



export const postsQeuryRepository = {
    async findPost({pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload)
         {
        const posts = await PostsModelClass
            .find({})
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()

        const totalCount = await PostsModelClass.countDocuments()

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
    },
    async findPostById(id: string): Promise<OutputPostDbType | null> {
        const post = await postsRepository.findPostById(id)

        const totalLike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {likesStatus: 1}]})
        const totalDislike = await LikePostModelClass.countDocuments(
            {$and: [{postId: id}, {dislikesStatus: 1}]}
        )

        const lastLikes = await LikePostModelClass.find({postId: id})
            .sort({"addedAt": "asc"})
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
                    newestLikes: lastLikes.slice(0,3).map(l => ({
                        addedAt : l.addedAt,
                        userId: l.userId,
                        login: l.login
                    }))
                }

            }
            return outPost
        }
        return post
    },
    async findPostOnBlog(blogId: string,{pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload)
    {
            const posts =  await PostsModelClass
                .find({blogId: blogId})
                .sort({[sortBy]: sortDirection})
                .skip(getSkipNumber(pageNumber,pageSize))
                .limit(pageSize)
                .lean()

        const totalCount = await PostsModelClass.countDocuments({blogId: blogId})

        return  {
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

