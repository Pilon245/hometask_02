import {blogsRepository} from "../repositories/blogsRepository";
import {BlogsDbType} from "../repositories/db";

export const blogsService = {
    async findBlogs(title: string | null | undefined): Promise<BlogsDbType[]> {
        return blogsRepository.findBlogs(title)
    },
    async findBlogsById(id: string): Promise<BlogsDbType | null> {
        console.log(id)
        return blogsRepository.findBlogsById(id)
    },
    async createBlogs(name: string, youtubeUrl: string): Promise<BlogsDbType> {
    const newBlogs: BlogsDbType = {
        // id: String(+(new Date())) ,
        name: name,
        youtubeUrl: youtubeUrl
    }
    const createdBlog = await blogsRepository.createBlogs(newBlogs)
    return createdBlog
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
