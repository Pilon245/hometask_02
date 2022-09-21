import {body} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const blogInputControlMiddleware = (req: Request, res: Response, next : NextFunction) =>  {
    const id = req.params.id
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl
    let valid = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(req.body.youtubeUrl);
    const errors: { message: string, field: string} [] = []

    if(!name || name.length > 15 || !name.trim()  || typeof name !== "string") {
        errors.push({message: "name is wrong", field: "name" })
    }
    if(!youtubeUrl || youtubeUrl.length > 100 || !valid || typeof youtubeUrl !== "string") {
        errors.push({message: "youtubeUrl is wrong", field: "youtubeUrl" })
    }
    if(errors.length){
        return res.status(400).send({errorsMessages: errors})
    }
    next()
}