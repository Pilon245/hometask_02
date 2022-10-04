import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";


const nameValidation = body( "name")
        .isString().withMessage("Field 'name' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'name' cannot be empty.")
        .isLength({min: 1, max: 15}).withMessage("Min length of field 'name' 1 max 15.")
const youtubeUrlValition = body( "youtubeUrl")
        .isString().withMessage("Field 'youtubeUrl' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'youtubeUrl' cannot be empty.")
        .isLength({min: 1, max: 100}).withMessage("Min length of field 'youtubeUrl' 1 max 100.")
        .isURL().withMessage("Field 'youtubeUrl' is invalid.")
const blogIdValidation = body("blogId")
        .isString().withMessage("Field 'blogId' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'blogId' cannot be empty.")
        .custom(async (value) => {
            const blog: any = await blogsRepository.findBlogsById(value)
            if(!blog){
                throw new Error("Field 'blogId' is not in id.")
            }
            return true
        })
const titleValidation = body("title")
    .isString().withMessage("Field 'title' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
    .isLength({min: 1, max: 30}).withMessage("Min length of field 'title' 1 max 30.")
const shortDescriptionValidation = body("shortDescription")
    .isString().withMessage("Field 'shortDescription' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'shortDescription' cannot be empty.")
    .isLength({min: 1, max: 100}).withMessage("Min length of field 'shortDescription' 1 max 100.")
const contentValidation = body("content")
    .isString().withMessage("Field 'content' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
    .isLength({min: 1, max: 1000}).withMessage("Min length of field 'content' 1 max 1000.")
const loginValidation = body("login")
        .isString().withMessage("Field 'login' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
        .isLength({min: 3, max: 10}).withMessage("Min length of field 'content' 3 max 10.")
const passwordValidation= body("password")
        .isString().withMessage("Field 'login' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
        .isLength({min: 6, max: 20}).withMessage("Min length of field 'content' 6 max 20.")
const emailValidation = body("email")
        .isString().withMessage("Field 'email' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
        .isURL().withMessage("Field 'youtubeUrl' is invalid.")// патеран надо дабвить
export const blogsValidation = [nameValidation, youtubeUrlValition]
export const postsOnBlogValidation = [titleValidation, shortDescriptionValidation, contentValidation]

export const postsValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation]


export const usersValidation = [loginValidation, passwordValidation, emailValidation]

export const authValidation = [loginValidation, passwordValidation]
