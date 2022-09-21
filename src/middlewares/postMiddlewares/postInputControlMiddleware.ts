import {NextFunction, Request, Response} from "express";
import {blogs} from "../../repositories/blogsRepository";

export const postInputControlMiddleware = (req: Request, res: Response, next : NextFunction) =>  {
    // const id = req.params.id
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blog = blogs.find(p => p.id === req.body.blogId)


    const errors: { message: string, field: string} [] = []


    if(!shortDescription || typeof shortDescription !== "string" || shortDescription.length > 100 || !shortDescription.trim()) {
        errors.push({message: "shortDescription is wrong", field: "shortDescription" })
    }
    if(!title || typeof title !== "string" || title.length > 30 || !title.trim()) {
        errors.push({message: "title is wrong", field: "title" })
    }
    if(!content || typeof content !== "string"|| !content.trim() || content.length > 1000) {
        errors.push({message: "content is wrong", field: "content" })
    }
    if(!blog /**|| typeof blog !== "string"*/) {
        errors.push({message: "blogId is wrong", field: "blogId" })
    }
    if(errors.length){
        return res.status(400).send({errorsMessages: errors})
    }
    console.log(("ffffff"))
    next()
}