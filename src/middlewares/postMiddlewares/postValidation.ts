// import {body, CustomValidator, param, validationResult} from "express-validator";
// import {NextFunction, Request, Response} from "express";
// import {authMiddleware} from "../authMiddleware";
// import {blogsRepository} from "../../repositories/blogsRepository";
//
// // const isblogId: CustomValidator = value => {
// //     const blog = blogsRepository.findBlogsById(value)
// //     console.log(blog)
// //     if(!blog) {
// //         return console.log(Promise.reject("Invalid BlogId"))
// //     }
// //     return Promise.resolve()
// // }
//
// export const blogIdValodation = [
//     body("blogId")
//         .isString().withMessage("Field 'blogId' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'blogId' cannot be empty.")
//         .custom(async (value) => {
//             const blog: any = await blogsRepository.findBlogsById(value)
//             if(!blog){
//                 throw new Error("Field 'blogId' is not in id.")
//             }
//             return true
//         }),
// ]
//
//
// export const postValidation = [
//     body("title")
//         .isString().withMessage("Field 'title' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
//         .isLength({min: 1, max: 30}).withMessage("Min length of field 'title' 1 max 30."),
//     body("shortDescription")
//         .isString().withMessage("Field 'shortDescription' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'shortDescription' cannot be empty.")
//         .isLength({min: 1, max: 100}).withMessage("Min length of field 'shortDescription' 1 max 100."),
//     body("content")
//         .isString().withMessage("Field 'content' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
//         .isLength({min: 1, max: 1000}).withMessage("Min length of field 'content' 1 max 1000."),
// ]
//
// export const authValidation = [
//     body("login")
//     .isString().withMessage("Field 'login' is not a string.")
//     .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty."),
//     body("password")
//         .isString().withMessage("Field 'login' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
// ]
// export const createUsersValidation = [
//     body("login")
//         .isString().withMessage("Field 'login' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty."),
//     body("password")
//         .isString().withMessage("Field 'login' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty."),
//     body("email")
//         .isString().withMessage("Field 'email' is not a string.")
//         .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
// ]

// const blogIdValidation = body("blogId")
//     .isString().withMessage("Field 'blogId' is not a string.")
//     .notEmpty({ignore_whitespace: true}).withMessage("Field 'blogId' cannot be empty.")
//     .custom(async (value) => {
//         const blog: any = await blogsRepository.findBlogsById(value)
//         if(!blog){
//             throw new Error("Field 'blogId' is not in id.")
//         }
//         return true
//     })
//
// const titleValidation = body("title")
//     .isString().withMessage("Field 'title' is not a string.")
//     .notEmpty({ignore_whitespace: true}).withMessage("Field 'title' cannot be empty.")
//     .isLength({min: 1, max: 30}).withMessage("Min length of field 'title' 1 max 30.")
//
// const createNewPostValidation = [titleValidation,'shortDescription', inputValidation]
// const updatePostValidation = [titleValidation,'shortDescription','...', '...', '....', inputValidation]