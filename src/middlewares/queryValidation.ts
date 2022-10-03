import {Request, Response} from "express";


// export const blogsQueryValidation = {
//     pageNumber(req: Request, res: Response) {return req.query.pageNumber ? +req.query.pageNumber : 1},
//     pageSize(req: Request, res: Response) {return req.query.pageSize ? +req.query.pageSize : 10},
//     sortBy(req: Request, res: Response) {return req.query.sortBy || "createdAt"},
//     sortDirection(req: Request, res: Response) {return req.query.sortDirection === "asc" ? "asc" : "desc"},
//     searchNameTerm(req: Request, res: Response) {return req.query.searchNameTerm?.toString() || ""}
// }

export const queryValidation  = (query: any) => {
    const pageNumber = typeof query.pageNumber === "string" ? +query.pageNumber : 1
    const pageSize = typeof query.pageSize === "string" ? parseInt(query.pageSize) : 10
    const sortBy = typeof query.pageSize === "string" ? query.sortBy : "createdAt"
    const sortDirection = typeof query.pageSize === "string" ? query.sortDirection : "desc"
    const searchNameTerm  = typeof query.pageSize === "string" ? query.searchNameTerm?.toString() : ""
    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm}
}