import {PagesBlogType} from "../types/blogsTypes";
import {blogsCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {SortDirection} from "../middlewares/queryValidation";

type FindBlogsPayload = {
    pageSize: number,
     pageNumber: number,
     sortBy: string,
     sortDirection: SortDirection,
     searchNameTerm?: string
}

export const blogsQueryRepository = {
    async findBlogs({searchNameTerm, sortDirection, sortBy, pageSize, pageNumber}: FindBlogsPayload)
        : Promise<PagesBlogType> {
        const regExp = new RegExp(`${searchNameTerm || ''}`, 'i')

        let filter = {name: regExp}

        const blogs = await blogsCollection
            .find(filter)
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await blogsCollection.countDocuments(filter)

        return  {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: blogs.map(b => (
                {
                    id: b._id,
                    name: b.name,
                    youtubeUrl: b.youtubeUrl,
                    createdAt: b.createdAt
                }))}
    },
}