import {body} from "express-validator";
import {blogsRepository} from "../repositories/blogsRepository";
import {usersRepository} from "../repositories/usersRepository";
import {LikeValue} from "../types/commentsTypes";


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
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
        .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10.")
const passwordValidation = body("password")
        .isString().withMessage("Field 'password' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'password' cannot be empty.")
        .isLength({min: 6, max: 20}).withMessage("Min length of field 'password' 6 max 20.")
const emailValidation = body("email")
        .isString().withMessage("Field 'email' is not a string.")
        .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Field 'email' is invalid.")
const loginAuthValidation = body("login")
    .isString().withMessage("Field 'login' is not a string.")
const passwordAuthValidation = body("password")
    .isString().withMessage("Field 'password' is not a string.")
const contentCommentValidation = body("content")
    .isString().withMessage("Field 'content' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'content' cannot be empty.")
    .isLength({min: 20, max: 300}).withMessage("Min length of field 'content' 20 max 300.")
const code = body("code")
    .isString().withMessage("Field 'code' is not a string.")
    .custom( async (value) => {
        const user = await usersRepository.findUserByConfirmationEmailCode(value);
        if (!user || user.emailConfirmation.isConfirmed || user.emailConfirmation.confirmationCode !== value || user.emailConfirmation.expirationDate < new Date()) {
            throw new Error("Field 'code' is not correct.");
        }
        return true;
    })
const emailResendingValidation = body("email")
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Field 'email' is invalid.")
    .custom(async (value) => {
        const user = await usersRepository.findLoginOrEmail(value);
        if (!user || user.emailConfirmation.isConfirmed || user.emailConfirmation.expirationDate < new Date()) {
            throw new Error("Field 'email' is not correct.");
        }
        return true;
    })
const emailRegistrationValidation = body('email')
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .isEmail().withMessage("Field 'email' is invalid.")
    .custom( async (value) => {
        const user = await usersRepository.findLoginOrEmail(value);
        if (user) {
            throw new Error("Field 'email' is not correct.");
        }
        return true;
    })
export const loginRegistrationValidation = body('login')
    .isString().withMessage("Field 'login' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'login' cannot be empty.")
    .isLength({min: 3, max: 10}).withMessage("Min length of field 'login' 3 max 10.")
    .custom( async (value) => {
        const user = await usersRepository.findLoginOrEmail(value);
        if (user) {
            throw new Error("Field 'login' is not correct.");
        }
        return true;
    })
const passwordCode = body("recoveryCode")
    .isString().withMessage("Field 'recoveryCode' is not a string.")
    .custom( async (value) => {
        const user = await usersRepository.findUserByConfirmationPasswordCode(value);
        if (!user || user.passwordConfirmation.isConfirmed || user.passwordConfirmation.confirmationCode !== value || user.passwordConfirmation.expirationDate < new Date()) {
            throw new Error("Field 'recoveryCode' is not correct.");
        }
        return true;
    })
const newPasswordValidation = body("newPassword")
    .isString().withMessage("Field 'newPassword' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'newPassword' cannot be empty.")
    .isLength({min: 6, max: 20}).withMessage("Min length of field 'newPassword' 6 max 20.")
const emailPasswordValidation = body("email")
    .isString().withMessage("Field 'email' is not a string.")
    .notEmpty({ignore_whitespace: true}).withMessage("Field 'email' cannot be empty.")
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("Field 'email' is invalid.")
    .custom(async (value) => {
        const user = await usersRepository.findLoginOrEmail(value);
        if (!user || user.passwordConfirmation.isConfirmed || user.passwordConfirmation.expirationDate < new Date()) {
            throw new Error("Field 'email' is not correct.");
        }
        return true;
    })
const likeStatusValidation = body("likeStatus")
    .isString().withMessage("Field 'likeStatus' is not a string")
    .custom(async (value) => {
        const arrayValue = Object.values(LikeValue)
        const result = arrayValue.filter((element) => element === value)
        const likeStatus = result[0]

        if (!likeStatus){
            throw new Error("Field 'likeStatus' is not a string")
        }
        return true
    })




export const blogsValidation = [nameValidation, youtubeUrlValition]
export const postsOnBlogValidation = [titleValidation, shortDescriptionValidation, contentValidation]

export const postsValidation = [titleValidation, shortDescriptionValidation, contentValidation, blogIdValidation]
export const commentOnPostValidation = [contentCommentValidation]

export const usersValidation = [loginValidation, passwordValidation, emailValidation]

export const likeValidation = [likeStatusValidation]

export const authValidation = [loginAuthValidation, passwordAuthValidation]

export const confirmationValidation = [code]

export const registrationValidation = [emailRegistrationValidation, loginRegistrationValidation, passwordValidation]
export const resendingValidation = [emailResendingValidation]
export const recoveryPassValidation = [emailValidation]
export const newPassValidation = [passwordCode, newPasswordValidation]


