import "reflect-metadata";
import {Request, Response} from "express";
// import {blogsService} from "../service/blogsService";
import {queryValidation} from "../middlewares/queryValidation";
import {blogsQueryRepository} from "../repositories/blogsQeuryRepository";
import {BlogsService} from "../service/blogsService";
import {ioc} from "../compositionRoot";
import {inject, injectable} from "inversify";


@injectable()
export class BlogsControllers  {
    constructor(@inject(BlogsService) protected blogsService: BlogsService) {
        // ioc.getInstance<BlogsService>(BlogsService)
    }

    async getBlogs( req: Request, res: Response) {
        const {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm} = queryValidation(req.query)
        const foundBlogs = await blogsQueryRepository.findBlogs({
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm
        })
        return res.status(200).send(foundBlogs)
    }
    async getBlogsById(req: Request, res: Response) {
        const blog = await this.blogsService.findBlogsById(req.params.id)
        if(blog) {
            res.status(200).send(blog)
        } else {
            res.send(404)
        }
    }
    async createBlogs( req: Request, res: Response) {
        const newBlog = await this.blogsService.createBlogs(req.body.name, req.body.youtubeUrl)
        console.log("newBlog", newBlog)
        if(newBlog){
            res.status(201).send(newBlog)
        }
    }
    async updateBlogs( req: Request, res: Response) {
        const isUpdate = await this.blogsService.updateBlogs(req.params.id, req.body.name, req.body.youtubeUrl)
        if(isUpdate) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
    async deleteBlogs( req: Request, res: Response) {
        const isDelete = await this.blogsService.deleteBlogs(req.params.id)
        if(isDelete) {
            res.send(204)
        } else{
            res.sendStatus(404)
        }
    }
}

