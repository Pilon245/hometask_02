import {postsRepository} from "../repositories/postsRepository";
import {PagesPostType, PostDbType} from "../types/postsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputPostDbType} from "../types/postsTypes";
import {BlogsDbType} from "../types/blogsTypes";
import {ObjectId} from "mongodb";
import {getSkipNumber} from "../helpers/getSkipNumber";

export const postsService = {
    async findPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string)
        : Promise<PagesPostType> {
        const skip = getSkipNumber(pageNumber, pageSize)
        const posts = await postsRepository.findPost(skip, pageSize, sortBy, sortDirection)
        const totalCount = await postsRepository.countPosts(sortBy, sortDirection)
        const outPosts: PagesPostType = {
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
        return outPosts
    },
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
    async findPostOnBlog(
        blogId: string,
        pageNumber: number,
        pageSize: number,
        sortBy: string,
        sortDirection: string)
        : Promise<PagesPostType | null> {
        // ctrl + alt + l
        const skip = getSkipNumber(pageNumber, pageSize)
        const posts = await postsRepository.findPostOnBlog(blogId, skip, pageSize, sortBy, sortDirection)
        if (posts) {
            const totalCount = await postsRepository.countPostsByBlogId(blogId, sortBy, sortDirection)
            const outPosts: PagesPostType = {
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
                    }
                ))
            }
            return outPosts
        }
        return posts
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