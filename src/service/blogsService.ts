import {blogsRepository} from "../repositories/blogsRepository";
import {BlogsDbType, OutputBlogsDbType, PagesBlogType} from "../types/blogsTypes"
import {ObjectId} from "mongodb";

export const blogsService = {
    // async findBlogs(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string, searchNameTerm: string)
    //     : Promise<PagesBlogType> {
    //     let skip = pageNumber * pageSize
    //     const blogs = await blogsRepository.findBlogs(skip, pageSize, sortBy, sortDirection, searchNameTerm)
    //
    //     const totalCount = await blogsRepository.countBlogs(sortBy, sortDirection,searchNameTerm)
    //     const outBlog: PagesBlogType = {
    //         pagesCount: (Math.ceil(totalCount/pageSize)),
    //         page: pageNumber,
    //         pageSize: pageSize,
    //         totalCount: totalCount,
    //         items: blogs.map(b => (
    //         {
    //             id: b._id,
    //             name: b.name,
    //             youtubeUrl: b.youtubeUrl,
    //             createdAt: b.createdAt
    //     }))}
    //         return outBlog
    // },
    async findBlogsById(id: string): Promise<OutputBlogsDbType | null> {
        const blog =  await blogsRepository.findBlogsById(id)
        if(blog){
            const outBlog : OutputBlogsDbType = {
                id: blog._id,
                name: blog.name,
                youtubeUrl: blog.youtubeUrl,
                createdAt: blog.createdAt
            }
            return outBlog
        }
        return blog

    },
    async createBlogs(name: string, youtubeUrl: string): Promise<OutputBlogsDbType> {
    const newBlogs : BlogsDbType = {
        _id : new ObjectId(),
        id: String(+new Date()),
        name: name,
        youtubeUrl: youtubeUrl,
        createdAt: new Date().toISOString()
    }
    const createdBlog = await blogsRepository.createBlogs(newBlogs)
    const  outCreateBlog : OutputBlogsDbType = {
            id: createdBlog._id,
            name: createdBlog.name,
            youtubeUrl: createdBlog.youtubeUrl,
            createdAt: createdBlog.createdAt
        }
    return outCreateBlog
    },
    async updateBlogs(id: string,name: string, youtubeUrl: string): Promise<boolean> {
    return await blogsRepository.updateBlogs(id,name,youtubeUrl)
    },
    async deleteBlogs(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogs(id)
    },
    async sortBlogsByName(PageNumber: number, PageSize: number): Promise<OutputBlogsDbType[]> {
        let skip = (Math.ceil(PageNumber/PageSize) - 1)*PageSize
        const sortBlogs =  await blogsRepository.sortBlogsByName(skip, PageSize)
        return sortBlogs.map(b => (
            {
                id: b._id,
                name: b.name,
                youtubeUrl: b.youtubeUrl,
                createdAt: b.createdAt

            }))
    },
    async deleteAllBlogs() {
    return blogsRepository.deleteAllBlogs()
}

}
