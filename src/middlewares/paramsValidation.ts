import {param} from "express-validator";
// import {blogsRepository} from "../repositories/blogsRepository";
import {postsRepository} from "../repositories/postsRepository";
import {commentsRepository} from "../repositories/commentsRepository";
import {sessionRepository} from "../repositories/sessionRepository";
import {blogsRepository} from "../compositionRoot";

const blogIdValidation = param("blogId")
        .custom(async (value) => {
            const blog: any = await blogsRepository.findBlogsById(value)
            if(!blog){
                throw new Error("Field 'blogId' is not in id.")
            }
            return true
        })
const postsIdValidation = param("postId")
    .custom(async (value) => {
        const post: any = await postsRepository.findPostById(value)
        if(!post){
            throw new Error("Field 'postId' is not in id.")
        }
        return true
    })
const commentsIdValidation = param("commentId")
    .custom(async (value) => {
        const comment: any = await commentsRepository.findCommentById(value)
        if(!comment){
            throw new Error("Field 'commentsId' is not in id.")
        }
        return true
    })
const devicesIdValidation = param("deviceId")
    .custom(async (value) => {
        const device: any = await sessionRepository.findDevicesByDeviceId(value)
        if(!device){
            throw new Error("Field 'deviceId' is not in id.")
        }
        return true
    })

export const postOnblogIdValidation = [blogIdValidation]

export const commentOnPostIdValidation = [postsIdValidation]

export const commentIdValidation = [commentsIdValidation]

export const deviceIdValidation = [devicesIdValidation]