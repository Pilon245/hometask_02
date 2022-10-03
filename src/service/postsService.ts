// import {blogs} from "./blogsRepository";
// import { PostDbType, postsCollection} from "./db";
import {postRepository} from "../repositories/postRepository";
import {PagesPostDbType, PostDbType} from "../types/postsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputPostDbType} from "../types/postsTypes";
import {BlogsDbType, PagesBlogType} from "../types/blogsTypes";
import {ObjectId} from "mongodb";
import {getSkipNumber} from "../helpers/getSkipNumber";

export const postsService = {
    async findPost(pageNumber: number, pageSize: number, sortBy: string, sortDirection: string)
        : Promise<PagesPostDbType> {
        const skip = pageNumber * pageSize
        const posts = await postRepository.findPost(skip, pageSize, sortBy, sortDirection)
        const totalCount = await postRepository.countPosts(sortBy, sortDirection)
        const outPosts: PagesPostDbType = {
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
        return outPosts
    },
    async findPostById(id: string): Promise<OutputPostDbType | null> {
        const post = await postRepository.findPostById(id)
        if (post) {
            const outPost: OutputPostDbType = {
                id: post._id,
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
        : Promise<PagesPostDbType | null> {
        // ctrl + alt + l
        const skip = getSkipNumber(pageNumber, pageSize)
        const posts = await postRepository.findPostOnBlog(blogId, skip, pageSize, sortBy, sortDirection)
        console.log(posts)
        if (posts) {
            const totalCount = await postRepository.countPostsByBlogId(blogId, sortBy, sortDirection)
            const outPosts: PagesPostDbType = {
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
            _id: new ObjectId(),
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName!.name,
            createdAt: new Date().toISOString()

        }
        const createdPost = await postRepository.createPost(newPost)
        const outNewPost: OutputPostDbType = {
            id: createdPost._id,
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
        return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    },
    async deletePost(id: string) {
        return await postRepository.deletePost(id)
    },
    async deleteAllPost() {
        return await postRepository.deleteAllPost()
    }

}