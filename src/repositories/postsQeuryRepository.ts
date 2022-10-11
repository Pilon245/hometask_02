import {FindPostsPayload, PagesPostType, PostDbType} from "../types/postsTypes";
import {postsCollection} from "./db";
import {SortDirection} from "../middlewares/queryValidation";
import {getSkipNumber} from "../helpers/getSkipNumber";



export const postsQeuryRepository = {
    async findPost({pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload)
         {
        const posts = await postsCollection
            .find({})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await postsCollection.countDocuments()

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
    async findPostOnBlog(blogId: string,{pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload)
    {
            const posts =  await postsCollection
                .find({blogId: blogId})
                .sort(sortBy, sortDirection)
                .skip(getSkipNumber(pageNumber,pageSize))
                .limit(pageSize)
                .toArray()

        const totalCount = await postsCollection.countDocuments({blogId: blogId})

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
