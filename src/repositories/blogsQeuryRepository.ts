import {FindBlogsPayload, PagesBlogType} from "../types/blogsTypes";
// import {blogsCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {BlogsModelClass, UsersModelClass} from "./db";



export const blogsQueryRepository = {
    async findBlogs({searchNameTerm, sortDirection, sortBy, pageSize, pageNumber}: FindBlogsPayload)
        : Promise<PagesBlogType> {
        const regExp = new RegExp(`${searchNameTerm || ''}`, 'i')

        let filter = {name: regExp}

        const blogs = await BlogsModelClass
            .find(filter)
            .sort({[sortBy]: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()

        // const query = await blogs.where(sortBy).sort([sortBy: sortDirection])

        const totalCount = await BlogsModelClass.countDocuments(filter)

        return  {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: blogs.map(b => (
                {
                    id: b.id,
                    name: b.name,
                    youtubeUrl: b.youtubeUrl,
                    createdAt: b.createdAt
                }))}
    },
}