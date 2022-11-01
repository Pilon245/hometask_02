import {blogsRepository} from "../repositories/blogsRepository";
import {BlogsDbType, OutputBlogsDbType} from "../types/blogsTypes"

export const blogsService = {
    async findBlogsById(id: string): Promise<OutputBlogsDbType | null> {
        const blog = await blogsRepository.findBlogsById(id)
        if (blog) {
            const outBlog: OutputBlogsDbType = {
                id: blog.id,
                name: blog.name,
                youtubeUrl: blog.youtubeUrl,
                createdAt: blog.createdAt
            }
            return outBlog
        }
        return blog

    },
    async createBlogs(name: string, youtubeUrl: string): Promise<OutputBlogsDbType> {
        // const newBlogs : BlogsDbType = {
        //     id: String(+new Date()),
        //     name,
        //     youtubeUrl,
        //     createdAt: new Date().toISOString()
        // }
        let newBlogs = new BlogsDbType(
            String(+new Date()),
            name,
            youtubeUrl,
            new Date().toISOString()
        )

        const createdBlog = await blogsRepository.createBlogs(newBlogs)
        const outCreateBlog: OutputBlogsDbType = {
            id: createdBlog.id,
            name: createdBlog.name,
            youtubeUrl: createdBlog.youtubeUrl,
            createdAt: createdBlog.createdAt
        }
        return outCreateBlog
    },
    async updateBlogs(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await blogsRepository.updateBlogs(id, name, youtubeUrl)
    },
    async deleteBlogs(id: string): Promise<boolean> {
        return await blogsRepository.deleteBlogs(id)
    },
    async deleteAllBlogs() {
        return blogsRepository.deleteAllBlogs()
    }

}
