import {postsRepository} from "../repositories/postsRepository";
import {PostDbType} from "../types/postsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputPostDbType} from "../types/postsTypes";
import {BlogsDbType} from "../types/blogsTypes";

export const postsService = {
    async findPostById(id: string): Promise<OutputPostDbType | null> {
        const post = await postsRepository.findPostById(id)
        if (post) {
            const outPost: OutputPostDbType = {
                id: post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt

            }
            return outPost
        }
        return post
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string)
        : Promise<OutputPostDbType> {
        const blogName: BlogsDbType | null = await blogsRepository.findBlogsById(blogId)
        const newPost: PostDbType = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName!.name,
            createdAt: new Date().toISOString()

        }
        const createdPost = await postsRepository.createPost(newPost)
        const outNewPost: OutputPostDbType = {
            id: createdPost.id,
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt

        }
        return outNewPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    },
    async deletePost(id: string) {
        return await postsRepository.deletePost(id)
    },
    async deleteAllPost() {
        return await postsRepository.deleteAllPost()
    }

}