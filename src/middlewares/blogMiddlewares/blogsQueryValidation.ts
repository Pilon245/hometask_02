import {Request, Response} from "express";


export const blogsQueryValidation = {
    pageNumber(req: Request, res: Response) {return req.query.pageNumber ? +req.query.pageNumber : 1},
    pageSize(req: Request, res: Response) {return req.query.pageSize ? +req.query.pageSize : 10},
    sortBy(req: Request, res: Response) {return req.query.sortBy || "createdAt"},
    sortDirection(req: Request, res: Response) {return req.query.sortDirection === "asc" ? "asc" : "desc"},
    searchNameTerm(req: Request, res: Response) {return req.query.searchNameTerm?.toString() || ""}
}