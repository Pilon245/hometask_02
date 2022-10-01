import {blogsRepository} from "../repositories/blogsRepository";
import {BlogsDbType, OutputBlogsDbType} from "../types/blogsTypes"
import {ObjectId} from "mongodb";

export const blogsService = {
    async findBlogs(): Promise<OutputBlogsDbType[]> {
        const blogs = await blogsRepository.findBlogs()
        return blogs.map(b => (
            {
                id: b._id,
                name: b.name,
                youtubeUrl: b.youtubeUrl,
                createdAt: b.createdAt

        }))
    },
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
    async deleteAllBlogs() {
    return blogsRepository.deleteAllBlogs()
}

}
