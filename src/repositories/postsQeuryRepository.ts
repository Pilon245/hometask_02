import {FindPostsPayload} from "../types/postsTypes";
import {getSkipNumber} from "../helpers/getSkipNumber";
import {PostsModelClass} from "./db";



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
