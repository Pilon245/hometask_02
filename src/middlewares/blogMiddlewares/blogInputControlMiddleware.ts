// import {body, validationResult} from "express-validator";
// import {NextFunction, Request, Response} from "express";
//
// export const nameValidation  = body("name").isString().trim().isLength({max:15})
//     .withMessage('name is wrong')
//
// export const blogInputControlMiddleware = (req: Request, res: Response, next : NextFunction) =>  {
//     const errorValidations = validationResult(req)
//     const id = req.params.id
//     const name = req.body.name
//     const youtubeUrl = req.body.youtubeUrl
//     let valid = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(req.body.youtubeUrl);
//     const errors: { message: string, field: string} [] = []
//
//     // const nameValidation  = body("name").isString().trim().isLength({max:15})
//     //     .withMessage('name is wrong')
//     // const nameValidation  = body("name").trim(" ").isLength({max:15})
//
//
//     // if(!name || typeof name !== "string" || name.length > 15 || !name.trim()) {
//     //     errors.push({message: "name is wrong", field: "name" })
//     // }
//     if(!youtubeUrl || typeof youtubeUrl !== "string" || youtubeUrl.length > 100 || !valid) {
//         errors.push({message: "youtubeUrl is wrong", field: "youtubeUrl" })
//     }
//     if(errors.length){
//         return res.status(400).send({errorsMessages: errors})
//     }
//     next()
// }