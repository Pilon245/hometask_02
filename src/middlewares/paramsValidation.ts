import {param} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";

const blogIdValidation = param("blogId")
        .custom(async (value) => {
            const blog: any = await blogsRepository.findBlogsById(value)
            if(!blog){
                throw new Error("Field 'blogId' is not in id.")
            }
            return true
        })

export const postOnblogIdValodation = [blogIdValidation]