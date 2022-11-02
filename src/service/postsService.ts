import {postsRepository} from "../repositories/postsRepository";
import {extendedLikesInfoType, newestLikesType, PostDbType} from "../types/postsTypes";
import {blogsRepository} from "../repositories/blogsRepository";
import {OutputPostDbType} from "../types/postsTypes";
import {BlogsDbType} from "../types/blogsTypes";
import {LikeValue} from "../types/commentsTypes";
import {commentsRepository} from "../repositories/commentsRepository";
import {LikeCommentStatusDBType, LikePostStatusDBType} from "../types/likeTypes";
import {usersRepository} from "../repositories/usersRepository";

class PostsService {
    async createPost(title: string, shortDescription: string, content: string, blogId: string)
        : Promise<OutputPostDbType> {
        const blogName: BlogsDbType | null = await blogsRepository.findBlogsById(blogId)
        // const newPost: PostDbType = {
        //     id: String(+(new Date())),
        //     title: title,
        //     shortDescription: shortDescription,
        //     content: content,
        //     blogId: blogId,
        //     blogName: blogName!.name,
        //     createdAt: new Date().toISOString(),
        //     extendedLikesInfo: {
        //         likesCount: 0,
        //         dislikesCount: 0,
        //         myStatus: "None",
        //         newestLikes: []
        //     }
        // }
        const newPost = new PostDbType(
             String(+(new Date())),
            title,
             shortDescription,
           content,
             blogId,
            blogName!.name,
            new Date().toISOString(),
             {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
             }
            )
        const createdPost = await postsRepository.createPost(newPost)
        const outNewPost: OutputPostDbType = {
            id: createdPost.id,
            title: createdPost.title,
            shortDescription: createdPost.shortDescription,
            content: createdPost.content,
            blogId: createdPost.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                newestLikes: []
            }

        }
        return outNewPost
    }
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        return await postsRepository.updatePost(id, title, shortDescription, content, blogId)
    }
    async updateLike(userId: string, postId: string, value: LikeValue, login: string) {
    const user = await postsRepository.findLikeByIdAndPostId(userId, postId)
    if (!user) {
        if (value === "Like") {
            const newLike: LikePostStatusDBType = {
                likesStatus: 1,
                dislikesStatus: 0,
                myStatus: value,
                userId: userId,
                postId: postId,
                login: login,
                addedAt: new Date().toISOString()
            }
            return await postsRepository.createLike(newLike)
        }
        if (value === "Dislike") {
            const newLike: LikePostStatusDBType = {
                likesStatus: 0,
                dislikesStatus: 1,
                myStatus: value,
                userId: userId,
                postId: postId,
                login: login,
                addedAt: new Date().toISOString()
            }
            return await postsRepository.createLike(newLike)
        }
        if (value === "None") {
            const newLike: LikePostStatusDBType = {
                likesStatus: 0,
                dislikesStatus: 0,
                myStatus: value,
                userId: userId,
                postId: postId,
                login: login,
                addedAt: new Date().toISOString()
            }
            return await postsRepository.createLike(newLike)

        }
    }
    if (value === "Like" && user!.likesStatus === 0) {

        const likesStatus = 1
        const dislikesStatus = 0
        const myStatus = value
        const authUserId = userId
        const post = postId
        const loginUser = login
        const addedAt = new Date().toISOString()

        return await postsRepository.updateLike(
            authUserId, post, likesStatus, dislikesStatus, myStatus,loginUser,addedAt
        )
    }
    if (value === "Dislike" && user!.dislikesStatus === 0) {
        console.log("value22", value)
        const likesStatus = 0
        const dislikesStatus = 1
        const myStatus = value
        const authUserId = userId
        const post = postId
        const loginUser =  login
        const addedAt = new Date().toISOString()

        return await postsRepository.updateLike(
            authUserId, post, likesStatus, dislikesStatus, myStatus,loginUser,addedAt
        )
    }

    if (value === "None") {
        const likesStatus = 0
        const dislikesStatus = 0
        const myStatus = value
        const authUserId = userId
        const post = postId
        const loginUser =  login
        const addedAt = new Date().toISOString()

        return await postsRepository.updateLike(
            authUserId, post, likesStatus, dislikesStatus, myStatus,loginUser,addedAt
        )
    }
    return false
}
    async deletePost(id: string) {
        return await postsRepository.deletePost(id)
    }
    async deleteAllPost() {
        return await postsRepository.deleteAllPost()
    }

}

export const postsService = new PostsService