import {Router, Request, Response} from "express";
import { blogsRepository} from "../repositories/blogsRepository";
import {blogsService} from "../service/blogsService";



export const blogsControllers = {
    async getBlogs( req: Request, res: Response) {
        const pageNumber = req.query.pageNumber ? +req.query.pageNumber : 1
        const pageSize = req.query.pageSize ? +req.query.pageSize : 10
        const sortBy = req.query.sortBy || "createdAt"
        const sortDirection = req.query.sortDirection === "asc" ? "asc" : "desc"
        const searchNameTerm = req.query.searchNameTerm?.toString() || ""
        const foundRepository = await blogsService.findBlogs(pageNumber,pageSize,sortBy,sortDirection,searchNameTerm)
        return res.status(200).send(foundRepository)
    },

    async getBlogsById(req: Request, res: Response) {
        const blog = await blogsService.findBlogsById(req.params.id)
        console.log(blog)
        if(blog) {
            res.status(200).send(blog)
        } else {
            res.send(404)
        }
    },
    async createBlogs( req: Request, res: Response) {
        const newBlog = await blogsService.createBlogs(req.body.name, req.body.youtubeUrl)
        if(newBlog){
            res.status(201).send(newBlog)
        }
    },
    async updateBlogs( req: Request, res: Response) {
        const isUpdate = await blogsService.updateBlogs(req.params.id, req.body.name, req.body.youtubeUrl)
        if(isUpdate) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    },
    async deleteBlogs( req: Request, res: Response) {
        const isDelete = await blogsService.deleteBlogs(req.params.id)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}

