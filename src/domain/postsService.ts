// import {blogs} from "./blogsRepository";
// import { PostDbType, postsCollection} from "./db";
import {postRepository} from "../repositories/postRepository";
import {PostDbType} from "../repositories/db";
import {blogsRepository} from "../repositories/blogsRepository";

export const postsService = {
    async findPost(title: string | null | undefined): Promise<PostDbType []>{
        return postRepository.findPost(title)
    },
    async findPostById(id: string): Promise<PostDbType | null> {
        return postRepository.findPostById(id)
    },
    async createPost(title: string, shortDescription: string, content: string, blogId: string)
        :Promise<PostDbType>{
        const blogName: any =  await blogsRepository.findBlogsById(blogId)
        const newPost: PostDbType = {
            // id: String(+(new Date())) ,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName.name

        }
        const createdPost = await postRepository.createPost(newPost)
        return newPost
    },
    async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        return await postRepository.updatePost(id,title,shortDescription,content,blogId)
    },
    async deletePost(id: string) {
        return await postRepository.deletePost(id)
    },
    async deleteAllPost() {
        return await postRepository.deleteAllPost()
    }

}