import {Response, Request, NextFunction} from 'express';
import {validationResult} from "express-validator";

export const inputBodyValidation = (req: Request, res: Response, next: NextFunction)  => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map( (error)  => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(400).send({"errorsMessages": errorsArray})
    } else {
       next()
}
}
export const inputQueryValidation = (req: Request, res: Response, next: NextFunction)  => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.sendStatus(404)
    } else {
        next()
    }
}


// export const inputAuthValidation = (req: Request, res: Response, next: NextFunction) => {
//     export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//         const creds = 'admin:qwerty'
//         const authHeader = req.headers.authorization
//         const base64Data = new Buffer(creds);
//         let base64String = base64Data.toString('base64');
//         const validAuthHeader = `Basic ${base64String}`
//
//         if (!authHeader || typeof authHeader !== "string" || authHeader !== validAuthHeader) {
//             res.sendStatus(401);
//         } else {
//             next()
//         }
//     }
