import {param} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepository} from "../repositories/postsRepository";

const blogIdValidation = param("blogId")
        .custom(async (value) => {
            const blog: any = await blogsRepository.findBlogsById(value)
            if(!blog){
                throw new Error("Field 'blogId' is not in id.")
            }
            return true
        })
const postsIdValidation = param("postsId")
    .custom(async (value) => {
        const post: any = await postsRepository.findPostById(value)
        if(!post){
            throw new Error("Field 'postId' is not in id.")
        }
        return true
    })

export const postOnblogIdValidation = [blogIdValidation]

export const commentOnPostIdValidation = [postsIdValidation]