import "reflect-metadata";
import {AdminBlogsRepository, BlogsRepository} from "../repositories/blogsRepository";
import {BlogsDbType, OutputBlogsDbType} from "../types/blogsTypes"
import {adminBlogsRepository} from "../compositionRoot";
import {inject, injectable} from "inversify";

@injectable()
export class BlogsService {
    // constructor(protected blogsRepository: BlogsRepository,
    //             protected adminBlogsRepository: AdminBlogsRepository
    // ) {
    // }
    constructor(@inject(BlogsRepository) protected blogsRepository: BlogsRepository,
        @inject(AdminBlogsRepository) protected adminBlogsRepository: AdminBlogsRepository
    ) {
    }

    async findBlogsById(id: string): Promise<OutputBlogsDbType | null> {
        const blog = await this.blogsRepository.findBlogsById(id)
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

    }
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

        const createdBlog = await this.blogsRepository.createBlogs(newBlogs)
        const outCreateBlog: OutputBlogsDbType = {
            id: createdBlog.id,
            name: createdBlog.name,
            youtubeUrl: createdBlog.youtubeUrl,
            createdAt: createdBlog.createdAt
        }
        return outCreateBlog
    }
    async updateBlogs(id: string, name: string, youtubeUrl: string): Promise<boolean> {
        return await this.blogsRepository.updateBlogs(id, name, youtubeUrl)
    }
    async deleteBlogs(id: string): Promise<boolean> {
        return await this.blogsRepository.deleteBlogs(id)
    }
    async deleteAllBlogs() {
        return this.blogsRepository.deleteAllBlogs()
    }
}

// export const blogsService = new BlogsService()
