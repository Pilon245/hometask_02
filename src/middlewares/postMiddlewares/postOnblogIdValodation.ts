import {param, validationResult} from "express-validator";
import {blogsRepository} from "../../repositories/blogsRepository";
import {NextFunction, Request, Response} from "express";




export const inputOnblogIdValidation = (req: Request, res: Response, next: NextFunction)  => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorsArray = errors.array({onlyFirstError: true}).map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        })
        return res.status(404).send({"errorsMessages": errorsArray})
    } else {
        next()
    }
}
export const postOnblogIdValodation = [
    param("blogId")
        .custom(async (value) => {
            const blog: any = await blogsRepository.findBlogsById(value)
            if(!blog){
                throw new Error("Field 'blogId' is not in id.")
            }
            return true
        }),
    inputOnblogIdValidation
]
