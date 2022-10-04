import {PagesPostType, PostDbType} from "../types/postsTypes";
import {postsCollection} from "./db";
import {SortDirection} from "../middlewares/queryValidation";
import {getSkipNumber} from "../helpers/getSkipNumber";

type FindPostsPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
}

export const postsQeuryRepository = {
    async findPost({pageSize, pageNumber, sortBy, sortDirection}: FindPostsPayload)
        : Promise<PagesPostType> {
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
                    id: p._id,
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
    :Promise <PagesPostType | null > {
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
                    id: p._id,
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
